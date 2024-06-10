<script lang="ts">
  import Badge from "$components/ui/badge/badge.svelte";
  import * as Collapsible from "$components/ui/collapsible/";
  import FoodsIcon from "../../assets/FoodsIcon.svg?url";
  import Convert from "../../core/Convert";
  import getImageBlob from "../../core/getImageBlob";
  import { Food } from "../../core/models";

  export let FoodItem: Food;

  const imageURL = FoodItem.image
    ? URL.createObjectURL(FoodItem.image)
    : FoodsIcon;
</script>

<Collapsible.Root>
  <Collapsible.Trigger class="flex w-full justify-between pb-3 pt-3 last:pb-0">
    <div class="flex items-center w-full justify-between">
      <img
        aria-hidden="true"
        src={imageURL}
        alt={FoodItem.name}
        class="relative inline-block h-9 w-9 rounded-md object-cover object-center"
      />
      <div class="flex flex-col items-center">
        <p
          class="block font-sans overflow-ellipsis w-48 sm:w-80 line-clamp-1 text-nowrap text-sm font-semibold text-blue-gray-900"
        >
          {FoodItem.name}
        </p>
        <p
          class="block font-sans text-sm font-light leading-normal text-gray-700 antialiased"
        >
          Б. {FoodItem.protein} | У. {FoodItem.carbohydrates} | Ж. {FoodItem.fat}
        </p>
      </div>
      <h6
        class="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased"
      >
        {FoodItem.kilojoules} кДж
      </h6>
    </div>
  </Collapsible.Trigger>
  <Collapsible.Content>
    <div class="max-w-sm rounded-lg overflow-hidden border bg-white">
      <img
        class="w-full h-28 object-cover"
        src={imageURL}
        alt={FoodItem.name}
      />
      <div class="px-4 pt-4">
        <div class="font-bold text-xl mb-2">{FoodItem.name}</div>
      </div>
      <div class="px-4 pb-4">
        <div class="flex flex-wrap gap-2">
          <Badge variant="outline">
            Белки
            <span class="pl-2 font-bold">{FoodItem.protein}г</span>
          </Badge>
          <Badge variant="outline">
            Углеводы
            <span class="pl-2 font-bold">{FoodItem.carbohydrates}г</span>
          </Badge>
          <Badge variant="outline">
            Жиры
            <span class="pl-2 font-bold">{FoodItem.fat}г</span>
          </Badge>
          <Badge variant="outline">
            <span class="pr-2 font-bold">{FoodItem.kilojoules}</span>
            кДж
          </Badge>
          <Badge variant="outline">
            <span class="pr-2 font-bold">
              {Convert.fromKjToKCalories(FoodItem.kilojoules)}
            </span>
            Ккал
          </Badge>
          {#if FoodItem.isEnumerable}
            <Badge variant="outline">
              Размер одной порции
              <span class="pl-2 font-bold">{FoodItem.weightGram}г</span>
            </Badge>
          {/if}
        </div>
      </div>
    </div>
  </Collapsible.Content>
</Collapsible.Root>
