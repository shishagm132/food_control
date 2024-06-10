<script context="module" lang="ts">
  export type ComboboxBindAble = {
    value?: string;
    label: string;
  };
</script>

<script lang="ts">
  import * as Command from "$components/ui/command";
  import * as Popover from "$components/ui/popover";
  import { Button } from "$components/ui/button";
  import ArrowsUpDown from "../../../assets/ArrowsUpDownIcon.svg?component";
  import { tick } from "svelte";

  export let comboboxValues: ComboboxBindAble[];
  export let open = false;
  export let value: string;
  export let name: string;
  export let notFoundMessage: string;

  $: selectedValue =
    comboboxValues.find((f) => f.value === value)?.label ?? name;

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }
</script>

<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="outline"
      role="combobox"
      aria-expanded={open}
      class="w-[200px] justify-between"
    >
      {selectedValue}
      <ArrowsUpDown class="mr-2 h-4 w-4" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class="p-0">
    <Command.Root>
      <Command.Input placeholder={name} />
      <Command.Empty>{notFoundMessage}</Command.Empty>
      <Command.Group>
        {#each comboboxValues as framework}
          <Command.Item
            value={framework.value}
            onSelect={(currentValue) => {
              value = currentValue;
              closeAndFocusTrigger(ids.trigger);
            }}
          >
            <!-- <Check
              class={cn(
                "mr-2 h-4 w-4",
                value !== framework.value && "text-transparent"
              )}
            /> галочка ;) -->
            {framework.label}
          </Command.Item>
        {/each}
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
