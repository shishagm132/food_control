<script lang="ts">
  import Convert from "../../core/Convert";
  import { kjNormMax, kjNormMin } from "../../core/settings/settings";

  export let kjAmount: number;

  $: kjAmount = kjAmount >> 0;

  let kcalAmount = Convert.fromKjToKCalories(kjAmount).toFixed(2);

  console.log(
    `$kjNormMin(${$kjNormMin}) >= kjAmoun(${kjAmount}) && kjNormMax(${$kjNormMax}) <= kjAmount(${kjAmount})`
  );

  let isNorm = $kjNormMin <= kjAmount && $kjNormMax >= kjAmount;
</script>

<div class="flex items-center bg-gray-200 rounded-lg p-4">
  <div class="flex-1">
    <h3 class="text-lg font-semibold mb-2">Калорийность за сегодня</h3>
    <div class="flex items-center">
      <div class="mr-4">
        <span class="text-3xl font-bold">{kcalAmount}</span>
        <span class="text-sm font-medium">ккал</span>
      </div>
      <div>
        <span class="text-3xl font-bold">{kjAmount}</span>
        <span class="text-sm font-medium">кДж</span>
      </div>
    </div>
  </div>
  <div
    class="text-white rounded-full px-4 py-2 {isNorm
      ? 'bg-green-500'
      : 'bg-red-500'}"
  >
    <span class="font-semibold">{isNorm ? "Норма" : "Отклонение"}</span>
  </div>
</div>
