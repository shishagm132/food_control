<script lang="ts">
  import * as Select from "$components/ui/select";

  import { Label } from "$components/ui/label";
  import db from "../core/context/Context";
  import { FoodRecord, type Food, type MealSchedule } from "../core/models";
  import SelectTrigger from "$components/ui/select/select-trigger.svelte";
  import type { Selected } from "bits-ui";
  import FoodListSelectable from "$components/FoodList/FoodListSelectable.svelte";
  import { Button } from "$components/ui/button";
  import type { FoodHolder } from "../core/FoodHolder";

  const mealsSchedules: ReadonlyArray<MealSchedule> = db.mealSchedules;

  const currentMealSchedule = getCurrentMealSchedule();

  let selectedMealSchedule: Selected<MealSchedule> = {
    value: currentMealSchedule,
    label: currentMealSchedule?.name,
  };

  function getCurrentMealSchedule() {
    return db.mealSchedules.filter((ms) => {
      const date = new Date();
      const startTime = ms.startHours * 3600 + ms.startMinutes * 60;
      const endTime = ms.endHours * 3600 + ms.endMinutes * 60;
      const currentTime = date.getHours() * 3600 + date.getMinutes() * 60;

      return currentTime >= startTime && currentTime < endTime;
    })[0];
  }

  const foods: Food[] = [];
  let foodHolders: FoodHolder[] | undefined = undefined;

  $: console.log(foodHolders);

  function addFoodRecording() {
    if (foodHolders?.length === 0) {
      alert("Вы не выбрали пищу!");
      return;
    }

    if (selectedMealSchedule.value === undefined) {
      alert("Выберите приём пищи!");
      return;
    }

    if (foodHolders === undefined) return;

    const record = new FoodRecord(
      new Date().toLocaleDateString(),
      foodHolders.map((foodHolder) => foodHolder.food.id),
      selectedMealSchedule.value.id
    );

    db.foodsRecords.put(record);

    selectedMealSchedule = { value: undefined!, label: undefined };
    foodHolders = [];

    alert("Запись добавлена!");
  }
</script>

<h1 class="pl-5 pt-3 font-medium text-2xl">Добавление новой записи</h1>
<main class="flex flex-col gap-4 p-5 pt-3 pb-40">
  <Label>Выберите приём пищи:</Label>
  <Select.Root bind:selected={selectedMealSchedule}>
    <SelectTrigger class="w-full">
      <Select.Value
        placeholder={selectedMealSchedule.label ?? "Выберите приём пищи"}
      />
    </SelectTrigger>
    <Select.Content>
      {#each mealsSchedules as mealsSchedule}
        <Select.Item value={mealsSchedule}>{mealsSchedule.name}</Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>
  <Label>Выберите пищу</Label>
  <FoodListSelectable bind:foodHolders />
  <Button on:click={addFoodRecording}>Сохранить запись</Button>
</main>
