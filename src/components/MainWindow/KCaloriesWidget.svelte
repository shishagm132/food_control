<script lang="ts">
  import Convert from "../../core/Convert";
  export let kiloCaloriesAmount: number;

  $: kJAmount = Convert.fromKCaloriesToKj(kiloCaloriesAmount);
</script>

<div class="flex items-center bg-gray-200 rounded-lg p-4">
  <div class="flex-1">
    <h3 class="text-lg font-semibold mb-2">Калорийность за сегодня</h3>
    <div class="flex items-center">
      <div class="mr-4">
        <span class="text-3xl font-bold">{Math.round(kiloCaloriesAmount)}</span>
        <span class="text-sm font-medium">ккал</span>
      </div>
      <div>
        <span class="text-3xl font-bold">{kJAmount}</span>
        <span class="text-sm font-medium">кДж</span>
      </div>
    </div>
  </div>
  <div class="bg-green-500 text-white rounded-full px-4 py-2">
    <span class="font-semibold">Норма</span>
  </div>
</div>
