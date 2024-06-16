<script lang="ts">
  import FoodItem from "$components/FoodList/FoodItem.svelte";
  import SearchBar from "$components/ui/search-bar/SearchBar.svelte";
  import db from "../../core/context/Context";
  import { liveQuery } from "dexie";
  import type { Food } from "../../core/models";
  import FoodList from "./FoodList.svelte";

  let foodsObservable = liveQuery(() => db.foods.toArray());

  function onSearch(value: string) {
    foodsObservable = liveQuery(() =>
      db.foods.where("name").startsWithIgnoreCase(value).toArray()
    );
  }
</script>

<h1 class="pl-5 pt-3 font-medium text-2xl">Список продуктов</h1>
<main class="flex flex-col space-y-2 p-5 pt-3 pb-40">
  <SearchBar {onSearch} />
  <FoodList foods={$foodsObservable || []} />
</main>
