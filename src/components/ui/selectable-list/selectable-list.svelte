<script context="module">
  let ids = 923;
</script>

<script lang="ts" generics="T">
  import { Checkbox } from "../checkbox";
  import Label from "../label/label.svelte";
  import ScrollArea from "../scroll-area/scroll-area.svelte";

  export let list: {
    label: string;
    value: T;
    checked: boolean;
  }[] = [];
</script>

<ScrollArea>
  {#each list as listItem}
    {@const id = String(++ids)}
    <div>
      <Checkbox {id} bind:checked={listItem.checked} />
      <Label for={id}>
        {listItem.label}
      </Label>
    </div>
  {/each}
</ScrollArea>
