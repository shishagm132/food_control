<script lang="ts">
  import Combobox, {
    type ComboboxBindAble,
  } from "$components/ui/combobox/Combobox.svelte";
  import Input from "$components/ui/input/input.svelte";
  import { Label } from "$components/ui/label";
  import { onMount } from "svelte";

  import db from "../core/context/Context";
  import getImageBlob from "../core/getImageBlob";
  import { Food } from "../core/models";
  import { Button } from "$components/ui/button";
  import AlertIcon from "../assets/AlertIcon.svg?component";
  import * as Alert from "$components/ui/alert";
  import Convert from "../core/Convert";

  let averageWeight = -1;
  let kilojoules = 0;
  let kilocalories = 0;
  let name = "";

  type InputEventNumbers = InputEvent & { target: { value: number } };
  const toFixedNumber = (num: number, fixValue: number) =>
    Number(num.toFixed(fixValue));

  function handleKilojouleChange(event: InputEvent) {
    kilojoules = (event as InputEventNumbers).target.value;
    kilocalories = Convert.fromKjToKCalories(kilojoules);
  }

  function handleKilocalorieChange(event: InputEvent) {
    kilocalories = (event as InputEventNumbers).target.value;
    kilojoules = Convert.fromKCaloriesToKj(kilocalories);
  }

  let fat = 0;
  let carbohydrates = 0;
  let protein = 0;

  async function addImage() {
    imageSelected = false;
    imageBlob = undefined;

    const image = await getImageBlob().catch(alert);
    imageSelected = image instanceof Blob;

    console.log(imageSelected);

    if (imageSelected) {
      imageBlob = image!;
      imageBox.src = URL.createObjectURL(imageBlob!);
    }
  }

  let imageSelected = false;
  let imageBox: HTMLImageElement;
  let imageBlob: Blob | undefined;

  function onSaveProduct() {
    db.transaction("rw", db.foods, () => {
      db.foods.add(
        new Food(
          name,
          fat,
          protein,
          carbohydrates,
          kilojoules,
          averageWeight,
          imageBlob
        )
      );
    });
  }
</script>

<h1 class="pl-5 pt-3 font-medium text-2xl">Добавление продукта</h1>
<main class="flex flex-col space-y-2 p-5 pt-3 pb-40">
  <img
    style={imageSelected ? "" : "display: none"}
    aria-hidden="true"
    bind:this={imageBox}
    alt="image preview"
    class="object-cover max-h-64"
  />
  <span
    style={imageSelected ? "display: none" : ""}
    class="flex justify-center items-center text-center w-full h-24"
  >
    Предпросмотр изображения (опционально)
  </span>
  <div class="grid w-full max-w-sm items-center gap-1.5">
    <Button on:click={addImage}>Добавить картинку (опционально)</Button>
  </div>
  <label for="name">Название продукта</label>
  <Input id="name" bind:value={name} />
  <p>Введите кДж или ккал продукта</p>
  <div class="flex justify-between gap-x-6">
    <div class="flex-1">
      кДж:
      <Input bind:value={kilojoules} on:input={handleKilojouleChange} />
    </div>
    <div class="flex-1">
      ккал:
      <Input bind:value={kilocalories} on:input={handleKilocalorieChange} />
    </div>
  </div>
  <label for="protein">Белки на 100 грамм</label>
  <Input type="number" id="protein" bind:value={protein} />
  <label for="fat">Жиры на 100 грамм</label>
  <Input type="number" id="fat" bind:value={fat} />
  <label for="carbohydrates">Углеводы на 100 грамм</label>
  <Input type="number" id="carbohydrates" bind:value={carbohydrates} />
  <Alert.Root class="space-x-2">
    <AlertIcon width="26px" height="26px" />
    <Alert.Title>Ваш продукт перечисляемый?</Alert.Title>
    <Alert.Description>
      Оставьте поле ниже отрицательным, если продукт не перечисляемый.
      <b>Например: манная каша.</b>
      <br />Если ваш продукт перечисляемый то вы можете указать средний вес
      продукта. <b>Например: яблоко.</b>
    </Alert.Description>
  </Alert.Root>
  <label for="avg_weight">Вес продукта</label>
  <Input type="number" id="avg_weight" bind:value={averageWeight} />
  <Button on:click={onSaveProduct}>Добавить продукт</Button>
</main>
