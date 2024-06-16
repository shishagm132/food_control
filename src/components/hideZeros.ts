type InputEventExtended = InputEvent & { target: { value: string } };

export function hideZeros(node: HTMLInputElement) {
  const handleInput = (event: Event) => {
    const value = (event as InputEventExtended).target.value;
    const cleanedValue = value.replace(/^0+(\d+)/, "$1");

    (event as InputEventExtended).target.value = cleanedValue
      ? cleanedValue
      : "";
  };

  node.addEventListener("input", handleInput);

  return {
    destroy() {
      node.removeEventListener("input", handleInput);
    },
  };
}
