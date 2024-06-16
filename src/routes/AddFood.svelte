<script lang="ts">
  import Input from "$components/ui/input/input.svelte";
  import InputNumbers from "$components/ui/input-numbers/input-numbers.svelte";
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

  function handleKilojouleChange(event: InputEvent) {
    kilojoules = Number((event as InputEventNumbers).target.value);
    kilocalories = Convert.fromKjToKCalories(kilojoules);
  }

  function handleKilocalorieChange(event: InputEvent) {
    kilocalories = Number((event as InputEventNumbers).target.value);
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

    if (imageSelected) {
      imageBlob = image!;
      imageBox.src = URL.createObjectURL(imageBlob!);
    }
  }

  let imageSelected = false;
  let imageBox: HTMLImageElement;
  let imageBlob: Blob | undefined;

  async function onSaveProduct() {
    try {
      await db.transaction("rw", db.foods, async () => {
        await db.foods.add(
          new Food(
            name,
            +fat,
            +protein,
            +carbohydrates,
            +kilojoules,
            +averageWeight,
            imageBlob
          )
        );
      });
      alert("Пища добавлена!");
    } catch (err) {
      alert(`Ошибка! Имя данное имя "${name}" уже занято!\n\n`);
      return;
    }
    averageWeight = 0;
    kilojoules = 0;
    kilocalories = 0;
    protein = 0;
    carbohydrates = 0;
    fat = 0;
    name = "";
    imageSelected = false;
    imageBlob = undefined;
  }
</script>

<h1 class="pl-5 pt-3 font-medium text-2xl">Добавление продукта</h1>
<main class="flex flex-col space-y-2 p-5 pt-3 pb-40">
  <img
    style={imageSelected ? "" : "display: none"}
    aria-hidden="true"
    bind:this={imageBox}
    alt="image preview"
    class="object-cover max-h-64 rounded"
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
  <p>Введите кДж или ккал (на 100 грамм продукта)</p>
  <div class="flex justify-between gap-x-6">
    <div class="flex-1">
      кДж:
      <InputNumbers
        bind:value={kilojoules}
        on:input={handleKilojouleChange}
        onlyPositive={true}
      />
    </div>
    <div class="flex-1">
      ккал:
      <InputNumbers
        bind:value={kilocalories}
        on:input={handleKilocalorieChange}
        onlyPositive={true}
      />
    </div>
  </div>
  <label for="protein">Белки на 100 грамм</label>
  <InputNumbers id="protein" bind:value={protein} onlyPositive={true} />
  <label for="fat">Жиры на 100 грамм</label>
  <InputNumbers id="fat" bind:value={fat} onlyPositive={false} />
  <label for="carbohydrates">Углеводы на 100 грамм</label>
  <InputNumbers
    id="carbohydrates"
    bind:value={carbohydrates}
    onlyPositive={true}
  />
  <label for="avg_weight">Вес продукта</label>
  <InputNumbers
    onlyPositive={true}
    type="number"
    id="avg_weight"
    bind:value={averageWeight}
  />
  <Button on:click={onSaveProduct}>Добавить продукт</Button>
</main>
