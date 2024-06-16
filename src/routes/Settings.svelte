<script>
  import { Switch } from "$components/ui/switch";
  import { Label } from "$components/ui/label";
  import { Input } from "$components/ui/input";
  import * as Alert from "$components/ui/alert";
  import AlertIcon from "../assets/AlertIcon.svg?component";
  import {
    useKj,
    kjNormMax,
    kjNormMin,
    updateKjNormMax,
    updateKjNormMin,
  } from "../core/settings/settings";
  import { InputNumbers } from "$components/ui/input-numbers";
  import Convert from "../core/Convert";

  $: min = $useKj ? $kjNormMin : Convert.fromKjToKCalories($kjNormMin);
  $: max = $useKj ? $kjNormMax : Convert.fromKjToKCalories($kjNormMax);

  $: $updateKjNormMax(max);
  $: $updateKjNormMin(min);
</script>

<h1 class="pl-5 pt-3 font-medium text-2xl">Настройки</h1>
<main class="flex flex-col space-y-4 p-5 pt-3 pb-40">
  <div class="flex items-center justify-between">
    <Label for="kJtoKcalSwitch">Использовать кДж</Label>
    <Switch
      id="kJtoKcalSwitch"
      bind:checked={$useKj}
      on:click={() => ($useKj = !$useKj)}
    />
  </div>

  <Alert.Root class="space-x-2">
    <AlertIcon width="26px" height="26px" />
    <Alert.Title>Укажите вашу норму</Alert.Title>
    <Alert.Description>
      Эта норма зависит от возраста, пола, роста, веса и уровня физической
      активности. Укажите значения, соответствующие вашим индивидуальным
      потребностям.
      <a
        href="https://www.7ya.ru/article/Skolko-kalorij-nuzhno-v-den-chtoby-pohudet-Kalkulyator-kalorij-onlajn/"
        class="underline"
      >
        Подробнее...
      </a>
    </Alert.Description>
  </Alert.Root>

  <Label for="minValue">Минимальное кол-во {$useKj ? "кДж" : "ккал"}</Label>
  <InputNumbers
    type="number"
    bind:value={min}
    id="minValue"
    onlyPositive={true}
  />

  <Label for="maxValue">Максимальное кол-во {$useKj ? "кДж" : "ккал"}</Label>
  <InputNumbers
    type="number"
    bind:value={max}
    id="maxValue"
    onlyPositive={true}
  />
</main>
