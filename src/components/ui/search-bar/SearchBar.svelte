<script lang="ts">
  import Button from "../button/button.svelte";
  import { Input } from "$components/ui/input";

  export let value: string;
</script>

<form class="flex gap-x-2">
  <Input type="search" placeholder="Поиск" bind:value />
  <Button>Поиск</Button>
</form>
