<script context="module" lang="ts">
  export type nutritionalValueAmount = {
    proteinAmount: number;
    fatAmount: number;
    carbohydratesAmount: number;
  };

  export type energyValueAmount = {
    kiloCaloriesAmount: number;
  };

  async function getRecords(date: Date) {
    const data = await db.foodsRecords
      .where("date")
      .equals(date.toLocaleDateString())
      .toArray();

    return await Promise.all(
      data.map(async (foodRecord) => ({
        mealSchedule: db.mealSchedules.at(foodRecord.mealScheduleId)!,
        foods: (await db.foods.bulkGet(foodRecord.foodId)).filter(
          (it) => it !== undefined
        ) as Food[],
      }))
    );
  }

  const getNVA = async () => {
    const records = (await getRecords(new Date())).map(
      (record) => record.foods
    );

    return records.flat(1).reduce(
      (acc, food) => {
        acc.proteinAmount += food.protein;
        acc.carbohydratesAmount += food.carbohydrates;
        acc.fatAmount += food.protein;

        return acc;
      },
      { proteinAmount: 0, fatAmount: 0, carbohydratesAmount: 0 }
    );
  };

  const getKjAmount = async () => {
    return Math.abs(
      (await getRecords(new Date()))
        .map((it) => it.foods)
        .flat(1)
        .reduce((acc, food) => acc + (food.kj / 100) * food.weight, 0)
    );
  };
</script>

<script lang="ts">
  import { Pie } from "svelte-chartjs";

  import KCaloriesWidget from "$components/MainWindow/KCaloriesWidget.svelte";
  import db from "../core/context/Context";
  import type { Food } from "../core/models";

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Питательные вещества:",
      },
    },
    responsive: true,
  };
</script>

<h1 class="pl-5 pt-3 font-medium text-2xl">Главная</h1>
<main class="flex flex-col max-h-screen space-y-2 p-5 pt-3 pb-[168px]">
  {#await getKjAmount() then kjAmount}
    <KCaloriesWidget {kjAmount} />
  {/await}

  {#await getNVA() then NVA}
    <Pie
      data={{
        labels: [
          `Белки: ${NVA.proteinAmount}`,
          `Жиры: ${NVA.fatAmount}`,
          `Углеводы: ${NVA.carbohydratesAmount}`,
        ],
        datasets: [
          {
            data: [NVA.proteinAmount, NVA.fatAmount, NVA.carbohydratesAmount],
            backgroundColor: ["#4dc9f6", "#f67019", "#84cc16"],
            hoverBackgroundColor: ["#2c7a7b", "#b54009", "#5b8c10"],
          },
        ],
      }}
      {options}
    />
  {/await}
</main>
