export function onlyNumbers(
  node: HTMLInputElement,
  onlyPositive: boolean = false
) {
  const beforeKeyPress = (event: KeyboardEvent) => {
    if (
      (event.key === "-" && onlyPositive) ||
      (event.key === "-" && node.value.length > 1) ||
      event.key === "+"
    ) {
      event.preventDefault();
    }
  };

  const handleInput = () => {
    if (node.value !== "") {
      node.value = String(onlyPositive ? Math.abs(+node.value) : +node.value);
    }
  };

  node.addEventListener("input", handleInput);
  node.addEventListener("keypress", beforeKeyPress);

  return {
    destroy() {
      node.removeEventListener("input", handleInput, true);
      node.removeEventListener("keypress", beforeKeyPress, true);
    },
  };
}
