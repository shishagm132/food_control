<script lang="ts">
  import Button from "../button/button.svelte";
  import { Input } from "$components/ui/input";

  let value = "";
  export let onSearch: (value: string) => void;
</script>

<form class="flex gap-x-2">
  <Input type="search" placeholder="Поиск" bind:value />
  <Button on:click={() => onSearch(value)}>Поиск</Button>
</form>
