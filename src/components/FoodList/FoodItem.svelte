<script lang="ts">
  import Badge from "$components/ui/badge/badge.svelte";
  import Button from "$components/ui/button/button.svelte";
  import * as Collapsible from "$components/ui/collapsible/";
  import * as Dialog from "$components/ui/dialog";
  import FoodsIcon from "../../assets/FoodsIcon.svg?url";
  import Convert from "../../core/Convert";
  import db from "../../core/context/Context";
  import { Food } from "../../core/models";
  import FoodSmallItem from "./FoodSmallItem.svelte";

  export let food: Food;

  const imageURL = food.image ? URL.createObjectURL(food.image) : FoodsIcon;
</script>

<Collapsible.Root>
  <Collapsible.Trigger class="flex w-full justify-between pb-3 pt-3 last:pb-0">
    <FoodSmallItem {food} />
  </Collapsible.Trigger>
  <Collapsible.Content>
    <div class="max-w-sm rounded-lg overflow-hidden border bg-white">
      <img class="w-full h-28 object-cover" src={imageURL} alt={food.name} />
      <div class="px-4 pt-4">
        <div class="font-bold text-xl mb-2">{food.name}</div>
      </div>
      <div class="px-4 pb-4">
        <div class="flex flex-wrap gap-2">
          <Badge variant="outline">
            Белки
            <span class="pl-2 font-bold">{food.protein}г</span>
          </Badge>
          <Badge variant="outline">
            Углеводы
            <span class="pl-2 font-bold">{food.carbohydrates}г</span>
          </Badge>
          <Badge variant="outline">
            Жиры
            <span class="pl-2 font-bold">{food.fat}г</span>
          </Badge>
          <Badge variant="outline">
            <span class="pr-2 font-bold">{food.kj}</span>
            кДж
          </Badge>
          <Badge variant="outline">
            <span class="pr-2 font-bold">
              {Convert.fromKjToKCalories(food.kj)}
            </span>
            Ккал
          </Badge>
          {#if food.isEnumerable}
            <Badge variant="outline">
              Размер одной порции
              <span class="pl-2 font-bold">{food.weight}г</span>
            </Badge>
          {/if}
        </div>
        <div class="space-x-2 pt-2">
          <Dialog.Root>
            <Dialog.Trigger class="w-full">
              <Button class="w-full" variant="destructive">Удалить</Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Вы уверены?</Dialog.Title>
                <Dialog.Description>
                  Это действие невозможно будет отменить.
                  <Dialog.Footer class="flex pt-4 gap-4 w-full">
                    <Dialog.Close>Отмена</Dialog.Close>
                    <Button
                      variant="destructive"
                      on:click={() =>
                        db.foods.where("id").equals(food.id).delete()}
                      >ОК</Button
                    >
                  </Dialog.Footer>
                </Dialog.Description>
              </Dialog.Header>
            </Dialog.Content>
          </Dialog.Root>
        </div>
      </div>
    </div>
  </Collapsible.Content>
</Collapsible.Root>
