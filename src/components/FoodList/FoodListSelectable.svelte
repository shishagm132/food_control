<script lang="ts">
  import FoodSmallItem from "./FoodSmallItem.svelte";
  import db from "../../core/context/Context";
  import { liveQuery } from "dexie";
  import type { Food } from "../../core/models";
  import * as Dialog from "$components/ui/dialog";
  import SelectableList from "$components/ui/selectable-list/selectable-list.svelte";
  import { buttonVariants } from "$components/ui/button";
  import { onDestroy } from "svelte";
  import InputNumbers from "$components/ui/input-numbers/input-numbers.svelte";
  import { FoodHolder } from "../../core/FoodHolder";

  export let foodHolders: FoodHolder[] = [];

  let foods = liveQuery(() => db.foods.toArray());

  let foodSelectables: {
    label: string;
    value: Food;
    checked: boolean;
  }[] = [];

  $: foodHolders = foodSelectables
    .filter((it) => it.checked)
    .map(({ value: food }) =>
      food.isEnumerable
        ? FoodHolder.fromEnumerableFood(food)
        : FoodHolder.fromWeightFood(food, 0)
    );

  const subscription = foods.subscribe({
    next: (value) =>
      (foodSelectables = (value || []).map((food) => ({
        label: food.name,
        value: food,
        checked: false,
        countOrWeight: 0,
      }))),
  });

  onDestroy(() => {
    subscription.unsubscribe();
  });
</script>

{#each foodHolders || [] as foodHolder}
  <FoodSmallItem class="flex-1" food={foodHolder.food}></FoodSmallItem>
{/each}

<Dialog.Root
  onOpenChange={(paramas) => (paramas ? false : (foodHolders = foodHolders))}
>
  <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
    Выбрать продукты
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Выбор продуктов</Dialog.Title>
      <Dialog.Description>
        Выберите продукты. Далее вы можете изменить их количество или вес.
      </Dialog.Description>
    </Dialog.Header>
    <SelectableList list={foodSelectables} />
  </Dialog.Content>
</Dialog.Root>
