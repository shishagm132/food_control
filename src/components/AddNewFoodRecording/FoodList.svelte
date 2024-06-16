<script lang="ts">
  import type { Food } from "../../core/models";
  import FoodItem from "$components/FoodList/FoodItem.svelte";

  export let foods: Food[];
</script>

{#each foods as food}
  <FoodItem {food} />
{/each}
