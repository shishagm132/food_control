<script context="module" lang="ts">
  export type nutritionalValueAmount = {
    proteinAmount: number;
    fatAmount: number;
    carbohydratesAmount: number;
    sucroseAmount: number;
  };

  export type energyValueAmount = {
    kiloCaloriesAmount: number;
  };
</script>

<script lang="ts">
  import Progress from "$components/ui/progress/progress.svelte";
  import Convert from "../core/Converters";

  const NVA: nutritionalValueAmount = {
    proteinAmount: 16.8,
    fatAmount: 29.1,
    carbohydratesAmount: 54.1,
    sucroseAmount: 9.23,
  };

  const ENA: energyValueAmount = {
    kiloCaloriesAmount: 279.6367,
  };

  let kJAmount = Convert.fromKCaloriesToKj(ENA.kiloCaloriesAmount);
</script>

<h1 class="pl-5 pt-3 font-medium text-2xl">Главная</h1>
<main class="flex flex-col space-y-2 p-5 pt-3 pb-40">
  <h2 class="font-medium">Соотношение основных питательных веществ:</h2>
  <span>Белков ({NVA.proteinAmount}%):</span>
  <Progress value={NVA.proteinAmount} max={100} class="w-full" />
  <span>Жиров ({NVA.fatAmount}%):</span>
  <Progress value={NVA.fatAmount} max={100} class="w-full" />
  <span>Углеводы ({NVA.carbohydratesAmount}%):</span>
  <Progress value={NVA.carbohydratesAmount} max={100} class="w-full" />
  <span>Сахарозы ({NVA.sucroseAmount}%):</span>
  <Progress value={NVA.sucroseAmount} max={100} class="w-full" />

  <h2 class="font-medium pt-3">Энергетическая ценность за сегодня:</h2>
  <math
    xmlns="http://www.w3.org/1998/Math/MathML"
    class="flex font-medium text-2xl pb-2"
  >
    <mfrac>
      <mrow class="mb-2">
        <mn>{kJAmount}</mn>
        <mtext>&nbsp;кДж</mtext>
      </mrow>
      <mrow class="mt-2">
        <mn>{Math.floor(ENA.kiloCaloriesAmount)}</mn>
        <mtext>&nbsp;ккал</mtext>
      </mrow>
    </mfrac>
  </math>
  <h2 class="font-medium">
    {kJAmount} кДж / 3750 кДж = {Math.floor((kJAmount / 3750) * 100)}%
  </h2>
  <Progress value={kJAmount} max={3750} class="w-full" />
</main>
