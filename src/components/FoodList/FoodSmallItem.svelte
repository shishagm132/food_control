<script lang="ts">
  import FoodsIcon from "../../assets/FoodsIcon.svg?url";
  import type { Food } from "../../core/models";

  export let food: Food;

  let className = "";
  export { className as class };

  const imageURL = food.image ? URL.createObjectURL(food.image) : FoodsIcon;
</script>

<div class="flex items-center justify-between {className}">
  <img
    aria-hidden="true"
    src={imageURL}
    alt={food.name}
    class="relative inline-block h-9 w-9 rounded-md object-cover object-center"
  />
  <div class="flex flex-col items-center">
    <p
      class="block font-sans overflow-ellipsis w-48 sm:w-80 line-clamp-1 text-nowrap text-sm font-semibold text-blue-gray-900"
    >
      {food.name}
    </p>
    <p
      class="block font-sans text-sm font-light leading-normal text-gray-700 antialiased"
    >
      Б. {food.protein} | У. {food.carbohydrates} | Ж. {food.fat}
    </p>
  </div>
  <h6
    class="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased"
  >
    {food.kj} кДж
  </h6>
</div>
