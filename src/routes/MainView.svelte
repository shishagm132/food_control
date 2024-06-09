<script context="module" lang="ts">
  export type nutritionalValueAmount = {
    proteinAmount: number;
    fatAmount: number;
    carbohydratesAmount: number;
  };

  export type energyValueAmount = {
    kiloCaloriesAmount: number;
  };
</script>

<script lang="ts">
  import { Pie } from "svelte-chartjs";

  import KCaloriesWidget from "$components/MainWindow/KCaloriesWidget.svelte";

  const NVA: nutritionalValueAmount = {
    proteinAmount: 16.8,
    fatAmount: 29.1,
    carbohydratesAmount: 54.1,
  };

  let kiloCaloriesAmount = 279.6367;

  const data = {
    labels: [
      `Белки ${NVA.proteinAmount}%`,
      `Жиры ${NVA.fatAmount}%`,
      `Углеводы ${NVA.carbohydratesAmount}%`,
    ],
    datasets: [
      {
        data: [NVA.proteinAmount, NVA.fatAmount, NVA.carbohydratesAmount],
        backgroundColor: ["#4dc9f6", "#f67019", "#84cc16"],
        hoverBackgroundColor: ["#2c7a7b", "#b54009", "#5b8c10"],
      },
    ],
  };

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
  <KCaloriesWidget {kiloCaloriesAmount} />
  <Pie {data} {options} />
</main>
