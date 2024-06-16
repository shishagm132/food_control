<script lang="ts">
  import {
    type DateValue,
    DateFormatter,
    getLocalTimeZone,
    CalendarDate,
    toCalendarDate,
    toLocalTimeZone,
  } from "@internationalized/date";

  import CalendarIcon from "../assets/CalendarIcon.svg?component";
  import { cn } from "$lib/utils.js";
  import { Button } from "$components/ui/button";
  import { Calendar } from "$components/ui/calendar";
  import * as Popover from "$components/ui/popover";
  import { liveQuery, type Observable } from "dexie";
  import db from "../core/context/Context";
  import CalendarDay from "$components/ui/calendar/calendar-day.svelte";
  import { onMount } from "svelte";
  import { FoodRecord, MealSchedule, type Food } from "../core/models";

  const df = new DateFormatter("ru-RU", {
    dateStyle: "long",
  });

  let selectedDate!: DateValue;

  onMount(() => {
    const date = new Date();
    selectedDate = new CalendarDate(
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      date.getUTCDate()
    );

    console.log(selectedDate);
  });

  type Record = {
    mealSchedule: MealSchedule;
    foods: Food[];
  };

  let records: Record[];

  async function onDateChanged(date: Date) {
    const data = await db.foodsRecords
      .where("date")
      .equals(date.toLocaleDateString())
      .toArray();

    records = (
      await Promise.all(
        data.map(async (foodRecord) => ({
          mealSchedule: db.mealSchedules.at(foodRecord.mealScheduleId)!,
          foods: (await db.foods.bulkGet(foodRecord.foodId)).filter(
            (it) => it !== undefined
          ) as Food[],
        }))
      )
    ).filter((fr) => fr.foods.length !== 0);
  }

  async function removeFood(record: MealSchedule, food: Food) {
    const date = selectedDate.toDate("UTC");

    db.foodsRecords
      .where({ date: date.toLocaleDateString(), mealScheduleId: record.id })
      .modify((foodRecord) => {
        foodRecord.foodId = foodRecord.foodId.filter((id) => id !== food.id);
      });

    onDateChanged(date);
  }

  $: {
    if (selectedDate) onDateChanged(selectedDate.toDate("UTC"));
  }
</script>

<h1 class="pl-5 pt-3 font-medium text-2xl">История</h1>
<main class="flex flex-col space-y-2 p-5 pt-3 pb-40">
  <Popover.Root openFocus>
    <Popover.Trigger asChild let:builder>
      <Button
        variant="outline"
        class={cn(
          "w-[280px] justify-start text-left font-normal",
          !selectedDate && "text-muted-foreground"
        )}
        builders={[builder]}
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {selectedDate
          ? df.format(selectedDate.toDate(getLocalTimeZone()))
          : "Select a date"}
      </Button>
    </Popover.Trigger>
    <Popover.Content class="w-auto p-0">
      <Calendar bind:value={selectedDate} initialFocus />
    </Popover.Content>
  </Popover.Root>
  {#if selectedDate === undefined}
    Выберите дату.
  {:else}
    {#each records || [] as record}
      <p class="font-semibold text-2xl">{record.mealSchedule}:</p>
      {#each record.foods as food}
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between">
            <h2 class="text-2xl font-semibold mb-4">{food.name}</h2>
            <Button on:click={() => removeFood(record.mealSchedule, food)}
              >Удалить</Button
            >
          </div>
          <div class="flex flex-row md:items-center md:justify-between">
            <div>
              <p class="text-gray-600">
                Жиры: <span class="font-semibold">{food.fat} г</span>
              </p>
              <p class="text-gray-600">
                Белки: <span class="font-semibold">{food.protein} г</span>
              </p>
              <p class="text-gray-600">
                Углеводы: <span class="font-semibold"
                  >{food.carbohydrates} г.</span
                >
              </p>
              <p class="text-gray-600">
                Энергетическая ценность: <span class="font-semibold">
                  {food.kj} кДж
                </span>
              </p>
            </div>
            {#if food.image instanceof Blob}
              <div class="mt-4 md:mt-0">
                <img
                  src={URL.createObjectURL(food.image)}
                  aria-hidden="true"
                  alt="none"
                />
              </div>
            {/if}
          </div>
        </div>
      {/each}
    {/each}
  {/if}
</main>
