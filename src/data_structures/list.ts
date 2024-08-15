import { assertInteger } from "./util.ts";

const { push, length, unshift, pop, includes, splice, entries } =
  Array.prototype;
const iterator = Array.prototype[Symbol.iterator];

class BaseList<T> {
  #includes = includes;
  #pop = pop;
  #push = push;
  #iterator = iterator;

  declare private ["constructor"]: new () => this;

  readonly [index: number]: T;

  private length: number = length;

  protected append(item: T): void {
    this.#push(item);
  }

  protected [Symbol.iterator](): IterableIterator<T> {
    return this.#iterator();
  }

  /** The number of items.
   *
   * [Infra Living Standard](https://infra.spec.whatwg.org/#list-size)
   */
  get size(): number {
    return this.length;
  }

  /** Whether this {@link size} is zero or not. */
  get isEmpty(): boolean {
    return !this.size;
  }

  /** Remove all items.
   *
   * `O(n)`
   *
   * [Infra Living Standard](https://infra.spec.whatwg.org/#list-size)
   */
  empty(): void {
    while (!this.isEmpty) this.#pop();
  }

  /** Whether the {@link item} appears in the list or not.
   *
   * `O(n)`
   *
   * [Infra Living Standard](https://infra.spec.whatwg.org/#list-contain)
   */
  contains(item: T): boolean {
    return this.#includes(item);
  }

  /** Create a new list clone, of the same designation.
   *
   * `O(n)`
   *
   * [Infra Living Standard](https://infra.spec.whatwg.org/#list-clone)
   */
  clone(): this {
    const instance = new this.constructor();

    for (const item of this) instance.append(item);

    return instance;
  }

  /** Return list with sort by {@link order}.
   *
   * `O(n log n)`
   *
   * [Infra Living Standard](https://infra.spec.whatwg.org/#list-sort-in-ascending-order)
   */
  sort(order: Order, lessThanAlgo?: (a: T, b: T) => boolean): this {
    const compareFn = (a: T, b: T) => {
      const result = lessThanAlgo ? lessThanAlgo(a, b) : a < b;

      switch (order) {
        case "asc":
          return result ? -1 : 1;

        case "desc":
          return result ? 1 : -1;
      }
    };

    const sorted = [...this].toSorted(compareFn);

    const ctor = new this.constructor();

    for (const item of sorted) ctor.append(item);

    return ctor;
  }

  /** Return the range from 0 to this {@link size}, exclusive.
   *
   * [Infra Living Standard](https://infra.spec.whatwg.org/#list-get-the-indices)
   */
  indices(): Set<number> {
    return range(0, this.size, "exclusive");
  }
}

abstract class OrderedList<T> extends BaseList<T> {
  public override [Symbol.iterator](): IterableIterator<T> {
    return super[Symbol.iterator]();
  }

  #entries = entries;
  #splice = splice;

  abstract prepend(item: T): void;

  insert(index: number, item: T): void {
    if (index === 0) this.prepend(item);
    else this.#splice(index, 0, item);
  }

  /** Remove {@link item} from the list.
   *
   * `O(n)`
   *
   * [Infra Living Standard](https://infra.spec.whatwg.org/#list-remove)
   */
  remove(item: T): void {
    for (const [index, listedItem] of [...this.#entries()].toReversed()) {
      if (item === listedItem) this.#splice(index, 1);
    }
  }

  /** Remove all items from the list that match a given {@link condition}.
   *
   * `O(n)`
   *
   * [Infra Living Standard](https://infra.spec.whatwg.org/#list-remove)
   */
  removeIf(condition: (item: T) => boolean): void {
    for (const [index, item] of [...this.#entries()].toReversed()) {
      if (condition(item)) this.#splice(index, 1);
    }
  }
}

/** An ordered sequence consisting of a finite number of items.
 *
 * [Infra Living Standard](https://infra.spec.whatwg.org/#list)
 */
export class List<T> extends OrderedList<T> {
  #unshift = unshift;
  #entries = entries;
  #splice = splice;

  constructor(iterable?: Iterable<T> | null) {
    super();

    if (iterable) { for (const item of iterable) super.append(item); }
  }

  public override append(item: T): void {
    super.append(item);
  }

  /** Extend with {@link iter}.
   *
   * `O(n)`
   *
   * [Infra Living Standard](https://infra.spec.whatwg.org/#list-extend)
   */
  extend(iter: Iterable<T>): void {
    for (const item of iter) this.append(item);
  }

  override prepend(item: T): void {
    this.#unshift(item);
  }

  /** Replace {@link oldItem} to {@link newItem}.
   *
   * `O(n)`
   *
   * [Infra Living Standard](https://infra.spec.whatwg.org/#list-replace)
   */
  replace(oldItem: T, newItem: T): void {
    for (const [index, item] of this.#entries()) {
      if (oldItem === item) this.#splice(index, 1, newItem);
    }
  }

  /** Replace all items from the list that match a given {@link condition} with the given {@link newItem}.
   *
   * `O(n)`
   *
   * [Infra Living Standard](https://infra.spec.whatwg.org/#list-replace)
   */
  replaceIf(condition: (item: T) => boolean, newItem: T): void {
    for (const [index, item] of this.#entries()) {
      if (condition(item)) this.#splice(index, 1, newItem);
    }
  }
}

/** A {@link List}, but conventionally, the following operations are used to operate on it, instead of using {@link List.append append}, {@link List.prepend prepend}, or {@link List.remove remove}.
 *
 * [Infra Living Standard](https://infra.spec.whatwg.org/#stacks)
 */
export class Stack<T> extends BaseList<T> {
  #pop = pop as () => T | undefined;

  /**
   * [Infra Living Standard](https://infra.spec.whatwg.org/#stack-push)
   */
  push(item: T): void {
    super.append(item);
  }

  /**
   * [Infra Living Standard](https://infra.spec.whatwg.org/#stack-pop)
   */
  pop(): T | undefined {
    return this.#pop();
  }

  /**
   * [Infra Living Standard](https://infra.spec.whatwg.org/#stack-peek)
   */
  peek(): T | undefined {
    return this[this.size - 1];
  }
}

/**
 * [Infra Living Standard](https://infra.spec.whatwg.org/#queues)
 */
export class Queue<T> extends BaseList<T> {
  #pop = pop as () => T | undefined;
  #push = push;

  /**
   * `O(1)`
   *
   * [Infra Living Standard](https://infra.spec.whatwg.org/#queue-enqueue)
   */
  enqueue(item: T): void {
    this.#push(item);
  }

  /**
   * [Infra Living Standard](https://infra.spec.whatwg.org/#queue-dequeue)
   */
  dequeue(): T | undefined {
    return this.#pop();
  }
}

/** A {@link List list} with the additional semantic that it must not contain the same item twice.
 *
 * [Infra Living Standard](https://infra.spec.whatwg.org/#sets)
 */
export class Set<T> extends OrderedList<T> {
  #unshift = unshift;
  #splice = splice;

  constructor(iterable?: Iterable<T> | null) {
    super();

    if (iterable) {
      for (const item of iterable) {
        if (!super.contains(item)) super.append(item);
      }
    }
  }

  /** Append {@link item} if this does not {@link contains} the given {@link item}.
   *
   * `O(n)`
   *
   * [Infra Living Standard](https://infra.spec.whatwg.org/#set-append)
   */
  override append(item: T): void {
    if (!super.contains(item)) super.append(item);
  }

  /** Prepend {@link item} if this does not {@link contains} the given {@link item}.
   *
   * `O(n)`
   *
   * [Infra Living Standard](https://infra.spec.whatwg.org/#set-prepend)
   */
  override prepend(item: T): void {
    if (!this.contains(item)) this.#unshift(item);
  }

  /** If set {@link contains} {@link oldItem} or {@link newItem}, then replace the first instance of either with {@link newItem} and {@link remove} all other instances.
   *
   * `O(n)`
   *
   * [Infra Living Standard](https://infra.spec.whatwg.org/#set-replace)
   */
  replace(oldItem: T, newItem: T): void {
    let replaced = false;

    for (let index = 0; index < this.size; index++) {
      const item = this[index]!;

      if (oldItem === item || item === newItem) {
        if (replaced) {
          this.#splice(index, 1);
          index--;
        } else {
          replaced = true;
          this.#splice(index, 1, newItem);
        }
      }
    }
  }

  /** Replace the first matched {@link condition} and {@link remove} all other instances.
   *
   * `O(n)`
   *
   * [Infra Living Standard](https://infra.spec.whatwg.org/#set-replace)
   */
  replaceIf(condition: (item: T) => boolean, newItem: T): void {
    let replaced = false;

    for (let index = 0; index < this.size; index++) {
      const item = this[index]!;

      if (condition(item) || item === newItem) {
        if (replaced) {
          this.#splice(index, 1);
          index--;
        } else {
          replaced = true;
          this.#splice(index, 1, newItem);
        }
      }
    }
  }

  /**
   * [Infra Living Standard](https://infra.spec.whatwg.org/#set-subset)
   */
  isSubsetOf(other: ListLike<T>): boolean {
    for (const item of this) if (!other.contains(item)) return false;

    return true;
  }

  /**
   * [Infra Living Standard](https://infra.spec.whatwg.org/#set-superset)
   */
  isSupersetOf(other: ListLike<T>): boolean {
    for (const item of other) if (!this.contains(item)) return false;

    return true;
  }

  /**
   * [Infra Living Standard](https://infra.spec.whatwg.org/#set-intersection)
   */
  intersection(iter: ListLike<T>): Set<T> {
    const set = new Set<T>();

    for (const item of this) if (iter.contains(item)) set.append(item);

    return set;
  }

  /**
   * [Infra Living Standard](https://infra.spec.whatwg.org/#set-union)
   */
  union(iter: Iterable<T>): Set<T> {
    const set = this.clone();

    for (const item of iter) set.append(item);

    return set;
  }
}

export type Order = "asc" | "desc";

export interface ListLike<T> {
  /** Whether the {@link item} appears in the list-like or not. */
  contains(item: T): boolean;

  [Symbol.iterator](): IterableIterator<T>;
}

export type RangeType = "exclusive" | "inclusive";

/** Creates a new ordered set containing all of the integers from {@link n} up to and including {@link m} or {@link m} - 1 in consecutively increasing order.
 *
 * [Infra Living Standard](https://infra.spec.whatwg.org/#the-range)
 *
 * @throws {RangeError} If {@link n} or {@link m} is not integer.
 */
export function range(
  n: number,
  m: number,
  type: RangeType,
): Set<number> {
  assertInteger(n, RangeError), assertInteger(m, RangeError);

  const set = new Set<number>();

  if (type === "inclusive") {
    for (let index = n; index <= m; index++) set.append(index);
  } else {
    for (let index = n; index < m; index++) set.append(index);
  }

  return set;
}
