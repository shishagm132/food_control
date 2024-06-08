<script lang="ts">
  import Combobox, {
    type ComboboxBindAble,
  } from "$components/ui/combobox/Combobox.svelte";

  const comboboxValues: ComboboxBindAble[] = [
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];
</script>

<h1 class="pl-5 pt-3 font-medium text-2xl">История</h1>
<main class="flex flex-col space-y-2 p-5 pt-3 pb-40">
  <div>здесь будет находиться история</div>
  <Combobox
    {comboboxValues}
    value="Да."
    name="Введите какое-то значение"
    notFoundMessage="Какое-то значение не найдено."
  />
</main>
