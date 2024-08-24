import { List, type Order, Set } from "./list.ts";

/** A finite ordered sequence of key value tuple with no key appearing twice.
 *
 * [Infra Standard](https://infra.spec.whatwg.org/#maps)
 */
export class Map<K, V> {
  #map: globalThis.Map<K, V> = new globalThis.Map();

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.#map.entries();
  }

  /** The number of entries.
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#map-size)
   */
  get size(): number {
    return this.#map.size;
  }

  /** Whether this {@link size} is zero or not.
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#map-is-empty)
   */
  get isEmpty(): boolean {
    return !this.size;
  }

  /** Return the value of the entry given {@link key}.
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#map-get)
   */
  get(key: K): V | undefined {
    return this.#map.get(key);
  }

  /** Update the value of any existing entry if the map exists an entry with the given {@link key}, or if none such exists, to add a new entry with the given {@link key}/{@link value} to the end of the map.
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#map-set)
   */
  set(key: K, value: V): void {
    this.#map.set(key, value);
  }

  /** Remove the entry with the given {@link key}.
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#map-remove)
   */
  remove(key: K): void {
    this.#map.delete(key);
  }

  /** Remove all entries.
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#map-clear)
   */
  clear(): void {
    this.#map.clear();
  }

  /** Whether entry with the given {@link key} exists or not.
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#map-exists)
   */
  exists(key: K): boolean {
    return this.#map.has(key);
  }

  /** Returns {@link Set} whose items are each of the keys in the entries.
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#map-getting-the-keys)
   */
  keys(): Set<K> {
    return new Set<K>(this.#map.keys());
  }

  /** Returns {@link List} whose items are each of the values in the entries.
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#map-getting-the-values)
   */
  values(): List<V> {
    const list = new List<V>(this.#map.values());

    return list;
  }

  /** Return shallow cloned map.
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#map-clone)
   */
  clone(): Map<K, V> {
    const cloned = new Map<K, V>();

    for (const [key, value] of this.#map.entries()) cloned.set(key, value);

    return cloned;
  }

  /** Return map with sort by {@link order}.
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#map-sort-in-ascending-order)
   */
  sort(
    order: Order,
    lessThanAlgo: (a: [K, V], b: [K, V]) => boolean,
  ): Map<K, V> {
    const compareFn = (a: [K, V], b: [K, V]) => {
      const result = lessThanAlgo(a, b);

      switch (order) {
        case "asc":
          return result ? -1 : 1;

        case "desc":
          return result ? 1 : -1;
      }
    };

    const sorted = [...this].toSorted(compareFn);
    const map = new Map<K, V>();

    for (const [key, value] of sorted) map.set(key, value);

    return map;
  }
}
