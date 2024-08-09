const { push, length, unshift, pop, includes, splice, entries } =
  Array.prototype;
const iterator = Array.prototype[Symbol.iterator];

/** An ordered sequence consisting of a finite number of items.
 *
 * [Infra Standard](https://infra.spec.whatwg.org/#list)
 */
export class List<T> {
  #pop = pop;
  #unshift = unshift;
  #push = push;
  #includes = includes;
  #splice = splice;
  #entries = entries as () => IterableIterator<[number, T]>;

  /**
   * [Infra Standard](https://infra.spec.whatwg.org/#list-iterate)
   */
  [Symbol.iterator] = iterator as () => IterableIterator<T>;

  /** The number of items.
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#list-size)
   */
  get size(): number {
    return this.length;
  }

  /** Whether this {@link size} is zero or not.
   */
  get isEmpty(): boolean {
    return !this.size;
  }

  readonly [index: number]: T;

  /** Add a {@link item} to the end.
   *
   * `O(1)`
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#list-append)
   */
  append(item: T): void {
    this.#push(item);
  }

  /** Extend with {@link iter}.
   *
   * `O(n)`
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#list-extend)
   */
  extend(iter: Iterable<T>): void {
    for (const item of iter) this.append(item);
  }

  /** Add a {@link item} to the start.
   *
   * `O(1)`
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#list-prepend)
   */
  prepend(item: T): void {
    this.#unshift(item);
  }

  /** Remove all items.
   *
   * `O(n)`
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#list-size)
   */
  empty(): void {
    while (!this.isEmpty) this.#pop();
  }

  /** Insert {@link item} before {@link index}.
   *
   * `O(1)`
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#list-insert)
   */
  insert(index: number, item: T): void {
    if (index === 0) this.prepend(item);
    else this.#splice(index, 0, item);
  }

  /** Replace all items from the list that match a given {@link condition} with the given {@link newItem}.
   *
   * `O(n)`
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#list-replace)
   */
  replace(condition: (item: T) => boolean, newItem: T): void {
    for (const [index, item] of this.#entries()) {
      if (condition(item)) this.#splice(index, 1, newItem);
    }
  }

  /** Whether the {@link item} appears in the list or not.
   *
   * `O(n)`
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#list-contain)
   */
  contains(item: T): boolean {
    return this.#includes(item);
  }

  /** Create a new list clone, of the same designation.
   *
   * `O(n)`
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#list-clone)
   */
  clone(): List<T> {
    const list = new List<T>();

    for (const item of this) list.append(item);

    return list;
  }

  /** Remove all items from the list that match a given {@link condition}.
   *
   * `O(n)`
   *
   * [Infra Standard](https://infra.spec.whatwg.org/#list-remove)
   */
  remove(condition: (item: T) => boolean): void {
    for (const [index, item] of [...this.#entries()].toReversed()) {
      if (condition(item)) this.#splice(index, 1);
    }
  }

  private length = length;
}
