/**
 *
 * @returns Define navigation property. Making them non-enumerable will prevent them from being handled by indexedDB.
 */
export default function toMany() {
  return { value: [], enumerable: false, writable: true };
}
