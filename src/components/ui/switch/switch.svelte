<script lang="ts">
  import { Switch as SwitchPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

  type $$Props = SwitchPrimitive.Props;
  type $$Events = SwitchPrimitive.Events;

  let className: $$Props["class"] = undefined;
  export let checked: $$Props["checked"] = undefined;
  export { className as class };
</script>

<SwitchPrimitive.Root
  bind:checked
  class={cn(
    "peer inline-flex md:h-[20px] md:w-[36px] h-[36px] w-[64px] shrink-0 cursor-pointer items-center rounded-full md:border-2 border-8 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-8 focus-visible:ring-ring focus-visible:ring-offset-8 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
    className
  )}
  {...$$restProps}
  on:click
  on:keydown
>
  <SwitchPrimitive.Thumb
    class={cn(
      "pointer-events-none block md:h-4 md:w-4 h-6 w-6 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-6 md:data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
    )}
  />
</SwitchPrimitive.Root>
