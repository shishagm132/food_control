<script lang="ts">
  import FoodItem from "$components/FoodList/FoodItem.svelte";
  import SearchBar from "$components/ui/search-bar/SearchBar.svelte";
  import { Food } from "../core/models";

  const food = new Food(
    0,
    "Морковь свежезажаренная морская капустная",
    12,
    12,
    12,
    12,
    new Blob(),
    23
  );
</script>

<h1 class="pl-5 pt-3 font-medium text-2xl">Список продуктов</h1>
<main class="flex flex-col space-y-2 p-5 pt-3 pb-40">
  <SearchBar value="is fine." />
  <FoodItem FoodItem={food} />
</main>
