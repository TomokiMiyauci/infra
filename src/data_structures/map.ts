import { List, type Order, Set } from "./list.ts";

/** A finite ordered sequence of key value tuple with no key appearing twice.
 * [Infra Living Standard](https://infra.spec.whatwg.org/#maps)
 */
export class Map<K, V> {
  #map: globalThis.Map<K, V> = new globalThis.Map();

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.#map.entries();
  }

  /** The number of entries.
   *
   * [Infra Living Standard](https://infra.spec.whatwg.org/#map-size)
   */
  get size(): number {
    return this.#map.size;
  }

  /** Whether this {@link size} is zero or not.
   *
   * [Infra Living Standard](https://infra.spec.whatwg.org/#map-is-empty)
   */
  get isEmpty(): boolean {
    return !this.size;
  }

  /**
   * [Infra Living Standard](https://infra.spec.whatwg.org/#map-get)
   */
  get(key: K): V | undefined {
    return this.#map.get(key);
  }

  /**
   * [Infra Living Standard](https://infra.spec.whatwg.org/#map-set)
   */
  set(key: K, value: V): void {
    this.#map.set(key, value);
  }

  /**
   * [Infra Living Standard](https://infra.spec.whatwg.org/#map-remove)
   */
  remove(key: K): void {
    this.#map.delete(key);
  }

  /**
   * [Infra Living Standard](https://infra.spec.whatwg.org/#map-clear)
   */
  clear(): void {
    this.#map.clear();
  }

  /**
   * [Infra Living Standard](https://infra.spec.whatwg.org/#map-exists)
   */
  exists(key: K): boolean {
    return this.#map.has(key);
  }

  /**
   * [Infra Living Standard](https://infra.spec.whatwg.org/#map-getting-the-keys)
   */
  keys(): Set<K> {
    return new Set<K>(this.#map.keys());
  }

  /**
   * [Infra Living Standard](https://infra.spec.whatwg.org/#map-getting-the-values)
   */
  values(): List<V> {
    const list = new List<V>(this.#map.values());

    return list;
  }

  /**
   * [Infra Living Standard](https://infra.spec.whatwg.org/#map-clone)
   */
  clone(): Map<K, V> {
    const cloned = new Map<K, V>();

    for (const [key, value] of this.#map.entries()) cloned.set(key, value);

    return cloned;
  }

  /**
   * [Infra Living Standard](https://infra.spec.whatwg.org/#map-sort-in-ascending-order)
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
