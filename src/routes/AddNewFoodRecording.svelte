<script lang="ts">
  import Combobox, {
    type ComboboxBindAble,
  } from "$components/ui/combobox/Combobox.svelte";
  import db from "../core/context/Context";

  const mealsSchedulesComboboxBindable: ComboboxBindAble[] =
    db.mealSchedules.map((ms) => ({ value: ms.name, label: ms.name }));

  const selectedMealSchedule = db.mealSchedules.filter((ms) => {
    const date = new Date();
    const startTime = ms.startHours * 3600 + ms.startMinutes * 60;
    const endTime = ms.endHours * 3600 + ms.endMinutes * 60;
    const currentTime = date.getHours() * 3600 + date.getMinutes() * 60;

    return currentTime >= startTime && currentTime < endTime;
  })[0];

  function addFood() {}
</script>

<h1 class="pl-5 pt-3 font-medium text-2xl">Добавление новой записи</h1>
<main class="flex flex-col space-y-2 p-5 pt-3 pb-40">
  <p>Выберите приём пищи:</p>
  <Combobox
    comboboxValues={mealsSchedulesComboboxBindable}
    value={selectedMealSchedule?.name}
    name="Приём пищи"
    notFoundMessage="Данный приём пищи не найден."
  />
</main>
