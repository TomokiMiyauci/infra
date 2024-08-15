import { expect } from "@std/expect";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { List, Queue, range, Set, Stack } from "./list.ts";

interface Context {
  list: List<unknown>;
  set: Set<unknown>;
  stack: Stack<unknown>;
  queue: Queue<unknown>;
}

describe("List", () => {
  beforeEach<Context>(function () {
    this.list = new List();
  });

  describe("construct", () => {
    it("should define initial value", () => {
      const list = new List([1, 2, 3]);

      expect([...list]).toEqual([1, 2, 3]);
    });
  });

  describe("append", () => {
    it<Context>("should add 1 item", function () {
      this.list.append("a");

      expect(this.list.size).toBe(1);
      expect(this.list[0]).toBe("a");
    });

    it<Context>("should add 2 items", function () {
      this.list.append("a"), this.list.append("b");

      expect(this.list.size).toBe(2);
      expect(this.list[0]).toBe("a");
      expect(this.list[1]).toBe("b");
    });

    it<Context>("should add multiple items", function () {
      const items = new Array(100).fill(0).map((_, index) => index);

      for (const [index, item] of items.entries()) {
        this.list.append(item);

        expect(this.list[index]).toBe(item);
      }

      expect(this.list.size).toBe(items.length);
    });

    it<Context>("can add same item", function () {
      this.list.append("a"), this.list.append("a"), this.list.append("a");

      expect(this.list.size).toBe(3);
      expect(this.list[0]).toBe("a");
      expect(this.list[1]).toBe("a");
      expect(this.list[2]).toBe("a");
    });
  });

  describe("size", () => {
    it<Context>("should return 0 if initialized", function () {
      expect(this.list.size).toBe(0);
    });

    it<Context>("should return the number of items", function () {
      this.list.append(0), this.list.append(1), this.list.append(2);

      expect(this.list.size).toBe(3);
    });

    it<Context>("should return 0 if empty", function () {
      this.list.append(0), this.list.append(1), this.list.append(2);

      this.list.empty();

      expect(this.list.size).toBe(0);
    });
  });

  describe("isEmpty", () => {
    it<Context>("should return true if initialized", function () {
      expect(this.list.isEmpty).toBeTruthy();
    });

    it<Context>("should return false if any items exist", function () {
      this.list.append(0);
      expect(this.list.isEmpty).toBeFalsy();
    });
  });

  describe("extend", () => {
    it<Context>("should append other's all items", function () {
      this.list.append(0), this.list.append(1), this.list.append(2);

      this.list.extend([3, 4]);

      expect([...this.list]).toEqual([0, 1, 2, 3, 4]);
    });
  });

  describe("prepend", () => {
    it<Context>("should add 1 item", function () {
      this.list.prepend("a");

      expect(this.list.size).toBe(1);
      expect(this.list[0]).toBe("a");
    });

    it<Context>("should add 2 items", function () {
      this.list.prepend("a"), this.list.prepend("b");

      expect(this.list.size).toBe(2);
      expect(this.list[0]).toBe("b");
      expect(this.list[1]).toBe("a");
    });

    it<Context>("should add multiple items", function () {
      const items = new Array(100).fill(0).map((_, index) => index);

      for (const item of items) this.list.prepend(item);

      expect(this.list.size).toBe(items.length);
      expect([...this.list]).toEqual([...items.reverse()]);
    });

    it<Context>("can add same item", function () {
      this.list.prepend("a"), this.list.prepend("a"), this.list.prepend("a");

      expect(this.list.size).toBe(3);
      expect(this.list[0]).toBe("a");
      expect(this.list[1]).toBe("a");
      expect(this.list[2]).toBe("a");
    });
  });

  describe("empty", () => {
    it<Context>("should do nothing if list is empty", function () {
      this.list.empty();
    });

    it<Context>("should remove all items", function () {
      this.list.append(0), this.list.append(1);

      expect([...this.list]).toEqual([0, 1]);
      expect(this.list.size).toBe(2);

      this.list.empty();

      expect([...this.list]).toEqual([]);
      expect(this.list.size).toBe(0);
    });
  });

  describe("insert", () => {
    it<Context>("should just add if empty", function () {
      this.list.insert(0, "a");

      expect([...this.list]).toEqual(["a"]);
      expect(this.list[0]).toBe("a");
    });

    it<Context>("should prepend if index is 0", function () {
      this.list.append(0), this.list.append(1), this.list.append(2);

      expect([...this.list]).toEqual([0, 1, 2]);

      this.list.insert(0, "a");

      expect([...this.list]).toEqual(["a", 0, 1, 2]);
      expect(this.list[0]).toBe("a");
    });

    it<Context>("should insert item to the position", function () {
      this.list.append(0), this.list.append(1), this.list.append(2);

      expect([...this.list]).toEqual([0, 1, 2]);

      this.list.insert(1, "a");

      expect([...this.list]).toEqual([0, "a", 1, 2]);
      expect(this.list[1]).toBe("a");
    });

    it<Context>("should insert item to the position 2", function () {
      this.list.append(0), this.list.append(1), this.list.append(2);

      expect([...this.list]).toEqual([0, 1, 2]);

      this.list.insert(2, "a");

      expect([...this.list]).toEqual([0, 1, "a", 2]);
      expect(this.list[2]).toBe("a");
    });

    it<Context>("should insert item to the position 3", function () {
      this.list.append(0), this.list.append(1), this.list.append(2);

      expect([...this.list]).toEqual([0, 1, 2]);

      this.list.insert(3, "a");

      expect([...this.list]).toEqual([0, 1, 2, "a"]);
      expect(this.list[3]).toBe("a");
    });

    it<Context>(
      "should append if the index is greater than item size",
      function () {
        this.list.append(0), this.list.append(1), this.list.append(2);

        expect([...this.list]).toEqual([0, 1, 2]);

        this.list.insert(Infinity, "a");

        expect([...this.list]).toEqual([0, 1, 2, "a"]);
        expect(this.list[3]).toBe("a");
      },
    );
  });

  describe("clone", () => {
    it<Context>("should not equal", function () {
      expect(this.list).not.toBe(this.list.clone());
    });

    it<Context>("should copy items", function () {
      this.list.append(0), this.list.append(1);
      this.list.append(2);

      expect([...this.list.clone()]).toEqual([0, 1, 2]);
      expect(this.list).not.toBe(this.list.clone());
      expect(this.list.clone()).not.toBe(this.list.clone());
    });
  });

  describe("remove", () => {
    it<Context>("should remove all items", function () {
      this.list.append(0), this.list.append(0);
      this.list.append(0);

      expect([...this.list]).toEqual([0, 0, 0]);

      this.list.remove(0);

      expect([...this.list]).toEqual([]);
    });

    it<Context>("should remove matched items", function () {
      this.list.append(0), this.list.append(1);
      this.list.append(2);
      this.list.append(3);

      expect([...this.list]).toEqual([0, 1, 2, 3]);

      this.list.remove(2);

      expect([...this.list]).toEqual([0, 1, 3]);
    });
  });

  describe("removeIf", () => {
    it<Context>("should remove all items", function () {
      this.list.append(0), this.list.append(1);
      this.list.append(2);

      expect([...this.list]).toEqual([0, 1, 2]);

      this.list.removeIf(() => true);

      expect([...this.list]).toEqual([]);
    });

    it<Context>("should remove matched items", function () {
      this.list.append(0), this.list.append(1);
      this.list.append(2);
      this.list.append(3);

      expect([...this.list]).toEqual([0, 1, 2, 3]);

      this.list.removeIf((item) => item === 2);

      expect([...this.list]).toEqual([0, 1, 3]);
    });
  });

  describe("indices", () => {
    it<Context>(
      "should return empty ordered set if list is empty",
      function () {
        const indices = this.list.indices();

        expect([...indices]).toEqual([]);
        expect(indices.size).toBe(0);
      },
    );

    it<Context>(
      "should return ordered set",
      function () {
        this.list.append("a"), this.list.append("b"), this.list.append("c");

        const indices = this.list.indices();

        expect([...indices]).toEqual([0, 1, 2]);
      },
    );
  });

  describe("sort", () => {
    describe("ASC", () => {
      it<Context>("should sort by asc", function () {
        this.list.append(2);
        this.list.append(0);
        this.list.append(1);

        expect([...this.list]).toEqual([2, 0, 1]);

        expect([...this.list.sort("asc")]).toEqual([0, 1, 2]);
        expect([...this.list]).toEqual([2, 0, 1]);
      });

      it<Context>("should sort by asc with custom compare", function () {
        const list = new List([2, 0, 1]);

        expect([...list.sort("asc", (a: number, b: number) => {
          return a < b;
        })]).toEqual([0, 1, 2]);
      });

      it<Context>("should sort by asc with custom compare 2", function () {
        const list = new List([2, 0, 1, 0, 2, 1, 1, 2, 0]);

        expect([...list.sort("asc", (a: number, b: number) => {
          return a < b;
        })]).toEqual([0, 0, 0, 1, 1, 1, 2, 2, 2]);
      });
    });

    describe("DESC", () => {
      it<Context>("should sort by desc", function () {
        this.list.append(2);
        this.list.append(0);
        this.list.append(1);

        expect([...this.list]).toEqual([2, 0, 1]);

        expect([...this.list.sort("desc")]).toEqual([2, 1, 0]);
        expect([...this.list]).toEqual([2, 0, 1]);
      });

      it<Context>("should sort by desc with custom compare", function () {
        const list = new List([2, 0, 1]);

        expect([...list.sort("desc", (a: number, b: number) => {
          return a < b;
        })]).toEqual([2, 1, 0]);
      });

      it<Context>("should sort by desc with custom compare 2", function () {
        const list = new List([2, 0, 1, 0, 2, 1, 1, 2, 0]);

        expect([...list.sort("desc", (a: number, b: number) => {
          return a < b;
        })]).toEqual([2, 2, 2, 1, 1, 1, 0, 0, 0]);
      });
    });
  });
});

describe("Stack", () => {
  beforeEach<Context>(function () {
    this.stack = new Stack();
  });

  describe("push", () => {
    it<Context>("should add item", function () {
      this.stack.push(0);

      expect(this.stack.size).toBe(1);
      expect(this.stack.peek()).toBe(0);
      expect(this.stack[0]).toBe(0);
    });

    it<Context>("should add items", function () {
      this.stack.push(0);
      this.stack.push(0);
      this.stack.push(1);

      expect(this.stack.size).toBe(3);
      expect(this.stack.peek()).toBe(1);
      expect(this.stack[0]).toBe(0);
      expect(this.stack[1]).toBe(0);
      expect(this.stack[2]).toBe(1);
    });
  });

  describe("pop", () => {
    it<Context>("should return undefined if empty", function () {
      expect(this.stack.size).toBe(0);
      expect(this.stack.pop()).toBe(undefined);
      expect(this.stack.size).toBe(0);
    });

    it<Context>("should return value and then to be empty", function () {
      this.stack.push(0);

      expect(this.stack.size).toBe(1);
      expect(this.stack.pop()).toBe(0);
      expect(this.stack.size).toBe(0);
    });
  });

  describe("peek", () => {
    it<Context>("should return undefined if empty", function () {
      expect(this.stack.peek()).toBe(undefined);
    });

    it<Context>("should return last value", function () {
      this.stack.push(0);

      expect(this.stack.peek()).toBe(0);

      this.stack.push(1);

      expect(this.stack.peek()).toBe(1);

      this.stack.pop();

      expect(this.stack.peek()).toBe(0);
    });
  });
});

describe("Queue", () => {
  beforeEach<Context>(function () {
    this.queue = new Queue();
  });

  describe("enqueue", () => {
    it<Context>("should add item", function () {
      this.queue.enqueue(0);

      expect(this.queue.size).toBe(1);
      expect(this.queue[0]).toBe(0);
    });

    it<Context>("should add items", function () {
      this.queue.enqueue(0);
      this.queue.enqueue(0);
      this.queue.enqueue(1);

      expect(this.queue.size).toBe(3);
      expect(this.queue[0]).toBe(0);
      expect(this.queue[1]).toBe(0);
      expect(this.queue[2]).toBe(1);
    });
  });

  describe("dequeue", () => {
    it<Context>("should return undefined if empty", function () {
      expect(this.queue.size).toBe(0);
      expect(this.queue.dequeue()).toBe(undefined);
      expect(this.queue.size).toBe(0);
    });

    it<Context>("should return value and then to be empty", function () {
      this.queue.enqueue(0);
      this.queue.enqueue(1);
      this.queue.enqueue(2);

      expect(this.queue.size).toBe(3);
      expect(this.queue.dequeue()).toBe(0);
      expect(this.queue.size).toBe(2);
      expect(this.queue.dequeue()).toBe(1);
      expect(this.queue.size).toBe(1);
      expect(this.queue.dequeue()).toBe(2);
      expect(this.queue.size).toBe(0);
    });
  });
});

describe("Set", () => {
  beforeEach<Context>(function () {
    this.set = new Set();
  });

  describe("construct", () => {
    it("should add initial value", () => {
      const set = new Set([1, 2, 3]);

      expect([...set]).toEqual([1, 2, 3]);
    });

    it("should add initial value except duplication", () => {
      const set = new Set([1, 1, 1, 2, 2, 2]);

      expect([...set]).toEqual([1, 2]);
    });
  });

  describe("append", () => {
    it<Context>("should add 1 item", function () {
      this.set.append("a");

      expect(this.set.size).toBe(1);
      expect(this.set[0]).toBe("a");
    });

    it<Context>("should add 2 items", function () {
      this.set.append("a"), this.set.append("b");

      expect(this.set.size).toBe(2);
      expect(this.set[0]).toBe("a");
      expect(this.set[1]).toBe("b");
    });

    it<Context>("should add multiple items", function () {
      const items = new Array(100).fill(0).map((_, index) => index);

      for (const [index, item] of items.entries()) {
        this.set.append(item);

        expect(this.set[index]).toBe(item);
      }

      expect(this.set.size).toBe(items.length);
    });

    it<Context>("should not add duplicate items", function () {
      this.set.append("a"), this.set.append("a"), this.set.append("a");

      expect(this.set.size).toBe(1);
      expect(this.set[0]).toBe("a");
      expect([...this.set]).toEqual(["a"]);
    });

    it<Context>("should add different object", function () {
      const a = {},
        b = {};
      this.set.append(a), this.set.append(b);

      expect(this.set.size).toBe(2);
      expect(this.set[0]).toBe(a);
      expect(this.set[1]).toBe(b);
      expect([...this.set]).toEqual([a, b]);
    });
  });

  describe("prepend", () => {
    it<Context>("should add 1 item", function () {
      this.set.prepend("a");

      expect(this.set.size).toBe(1);
      expect(this.set[0]).toBe("a");
    });

    it<Context>("should add 2 items", function () {
      this.set.prepend("a"), this.set.prepend("b");

      expect(this.set.size).toBe(2);
      expect(this.set[0]).toBe("b");
      expect(this.set[1]).toBe("a");
    });

    it<Context>("should add multiple items", function () {
      const items = new Array(100).fill(0).map((_, index) => index);

      for (const item of items) {
        this.set.prepend(item);
      }

      expect(this.set.size).toBe(items.length);
      expect(this.set[0]).toBe(99);
      expect(this.set[1]).toBe(98);
      expect(this.set[99]).toBe(0);
    });

    it<Context>("should not add duplicate items", function () {
      this.set.prepend("a"), this.set.prepend("a"), this.set.prepend("a");

      expect(this.set.size).toBe(1);
      expect(this.set[0]).toBe("a");
      expect([...this.set]).toEqual(["a"]);
    });

    it<Context>("should add different object", function () {
      const a = {},
        b = {};
      this.set.prepend(a), this.set.prepend(b);

      expect(this.set.size).toBe(2);
      expect(this.set[0]).toBe(b);
      expect(this.set[1]).toBe(a);
      expect([...this.set]).toEqual([b, a]);
    });
  });

  describe("replace", () => {
    it<Context>("should replace first item", function () {
      this.set.append("a"), this.set.append("b"), this.set.append("c");
      this.set.replace("a", "c");

      expect([...this.set]).toEqual(["c", "b"]);
    });

    it<Context>("should remove matched item", function () {
      this.set.append("c"), this.set.append("b"), this.set.append("a");
      this.set.replace("a", "c");

      expect([...this.set]).toEqual(["c", "b"]);
    });

    it<Context>(
      "should replace the first element and delete all the rest if condition is true",
      function () {
        this.set.append("a"), this.set.append("b"), this.set.append("c");

        this.set.replace("b", "d");

        expect([...this.set]).toEqual(["a", "d", "c"]);
      },
    );

    it<Context>(
      "should replace the first element and delete all the rest if condition is true",
      function () {
        this.set.append("b"), this.set.append("c"), this.set.append("d");

        this.set.replace("b", "c");

        expect([...this.set]).toEqual(["c", "d"]);
      },
    );

    it<Context>("should pass all matrix", function () {
      // init [1, 2, 3]
      const table: [from: number, to: number, result: number[]][] = [
        [0, 1, [1, 2, 3]],
        [0, 2, [1, 2, 3]],
        [0, 3, [1, 2, 3]],
        [0, 4, [1, 2, 3]],
        [1, 1, [1, 2, 3]],
        [1, 2, [2, 3]],
        [1, 3, [3, 2]],
        [1, 4, [4, 2, 3]],
        [2, 1, [1, 3]],
        [2, 2, [1, 2, 3]],
        [2, 3, [1, 3]],
        [2, 4, [1, 4, 3]],
        [3, 1, [1, 2]],
        [3, 2, [1, 2]],
        [3, 3, [1, 2, 3]],
        [3, 4, [1, 2, 4]],
      ];

      for (const [from, to, result] of table) {
        this.set.append(1);
        this.set.append(2);
        this.set.append(3);
        this.set.replace(from, to);

        expect([...this.set]).toEqual(result);

        this.set.empty();
      }
    });

    it<Context>(
      "should do nothing if condition is false",
      function () {
        this.set.append("a"), this.set.append("b"), this.set.append("c");

        this.set.replace("e", "d");

        expect([...this.set]).toEqual(["a", "b", "c"]);
      },
    );

    it<Context>(
      "should do nothing if condition is false 2",
      function () {
        this.set.append("b"), this.set.append("c"), this.set.append("d");

        this.set.replace("a", "d");

        expect([...this.set]).toEqual(["b", "c", "d"]);
      },
    );
  });

  describe("replaceIf", () => {
    it<Context>("should pass all matrix", function () {
      // init [1, 2, 3]
      const table: [
        condition: (item: unknown) => boolean,
        to: number,
        result: number[],
      ][] = [
        [() => true, 1, [1]],
        [() => true, 2, [2]],
        [() => true, 3, [3]],
        [() => true, 4, [4]],
        [() => false, 1, [1, 2, 3]],
        [() => false, 2, [1, 2, 3]],
        [() => false, 3, [1, 2, 3]],
        [() => false, 4, [1, 2, 3]],
        [(item) => item === 1, 1, [1, 2, 3]],
        [(item) => item === 1, 2, [2, 3]],
        [(item) => item === 1, 3, [3, 2]],
        [(item) => item === 1, 4, [4, 2, 3]],
        [(item) => item === 2, 1, [1, 3]],
        [(item) => item === 2, 2, [1, 2, 3]],
        [(item) => item === 2, 3, [1, 3]],
        [(item) => item === 2, 4, [1, 4, 3]],
        [(item) => item === 3, 1, [1, 2]],
        [(item) => item === 3, 2, [1, 2]],
        [(item) => item === 3, 3, [1, 2, 3]],
        [(item) => item === 3, 4, [1, 2, 4]],
      ];

      for (const [from, to, result] of table) {
        this.set.append(1);
        this.set.append(2);
        this.set.append(3);
        this.set.replaceIf(from, to);

        expect([...this.set]).toEqual(result);

        this.set.empty();
      }
    });

    it<Context>(
      "should do nothing if condition is false",
      function () {
        this.set.append("a"), this.set.append("b"), this.set.append("c");

        this.set.replace("e", "d");

        expect([...this.set]).toEqual(["a", "b", "c"]);
      },
    );

    it<Context>(
      "should do nothing if condition is false 2",
      function () {
        this.set.append("b"), this.set.append("c"), this.set.append("d");

        this.set.replace("a", "d");

        expect([...this.set]).toEqual(["b", "c", "d"]);
      },
    );
  });

  describe("intersection", () => {
    it<Context>("should cloned empty set", function () {
      const cloned = this.set.intersection(new List());

      expect(cloned).not.toBe(this.set);
      expect([...cloned]).toEqual([]);
      expect(cloned.size).toBe(0);
    });

    it<Context>("should empty set if there are no product set", function () {
      this.set.append(0), this.set.append(1);
      const cloned = this.set.intersection(new List());

      expect(cloned.size).toBe(0);
    });

    it<Context>("should empty set if there are no product set 2", function () {
      const other = new List();
      other.append(0), other.append(1);
      const cloned = this.set.intersection(other);

      expect(cloned.size).toBe(0);
    });

    it<Context>("should empty set if there are no product set 3", function () {
      this.set.append(0);
      const other = new List();
      other.append(0), other.append(1);
      const cloned = this.set.intersection(other);

      expect([...cloned]).toEqual([0]);
      expect(cloned.size).toBe(1);
    });

    it<Context>("should empty set if there are no product set 4", function () {
      this.set.append(0), this.set.append(1);
      const other = new List();
      other.append(1), other.append(0);
      const cloned = this.set.intersection(other);

      expect([...cloned]).toEqual([0, 1]);
      expect(cloned.size).toBe(2);
    });
  });

  describe("union", () => {
    it<Context>("should return empty set", function () {
      const set = this.set.union([]);

      expect([...set]).toEqual([]);
      expect(set.size).toBe(0);
    });

    it<Context>("should return cloned set", function () {
      this.set.append(0), this.set.append(1);
      const set = this.set.union([]);

      expect([...set]).toEqual([0, 1]);
      expect(set.size).toBe(2);
    });

    it<Context>("should return cloned union set", function () {
      this.set.append(0), this.set.append(1);

      const set = this.set.union([0, 1]);

      expect([...set]).toEqual([0, 1]);
      expect(set.size).toBe(2);
      expect(set).not.toBe(this.set);
    });

    it<Context>("should return cloned union set 2", function () {
      this.set.append(0), this.set.append(1);

      const other = new Set();
      other.append(-1), other.append(3);
      const set = this.set.union(other);

      expect([...set]).toEqual([0, 1, -1, 3]);
      expect(set.size).toBe(4);

      expect(set[0]).toBe(0);
      expect(set[1]).toBe(1);
      expect(set[2]).toBe(-1);
      expect(set[3]).toBe(3);
    });
  });

  describe("isSubsetOf", () => {
    it<Context>("should return empty if each set is empty", function () {
      expect(this.set.isSubsetOf(new Set())).toBeTruthy();
    });

    it<Context>(
      "should return true because the set of multiple 4(< 20) is subset of even numbers",
      function () {
        this.set.append(4),
          this.set.append(8),
          this.set.append(12),
          this.set.append(16);

        const other = new Set();

        other.append(2),
          other.append(4),
          other.append(6),
          other.append(8),
          other.append(10),
          other.append(12),
          other.append(14),
          other.append(16);

        expect(this.set.isSubsetOf(other)).toBeTruthy();
      },
    );

    it<Context>(
      "should return false because prime numbers (<20) is not a subset of all odd numbers (<20)",
      function () {
        this.set.append(2),
          this.set.append(3),
          this.set.append(5),
          this.set.append(7);
        this.set.append(9);
        this.set.append(11);
        this.set.append(13);

        const other = new Set();

        other.append(3),
          other.append(5),
          other.append(7),
          other.append(9),
          other.append(11),
          other.append(13),
          expect(this.set.isSubsetOf(other)).toBeFalsy();
      },
    );

    it<Context>(
      "should return false because sets are subsets of each other",
      function () {
        this.set.append(1), this.set.append(2), this.set.append(3);

        const other = new Set();

        other.append(1),
          other.append(2),
          other.append(3),
          expect(this.set.isSubsetOf(other)).toBeTruthy();
      },
    );
  });

  describe("isSupersetOf", () => {
    it<Context>("should return empty if each set is empty", function () {
      expect(this.set.isSupersetOf(new Set())).toBeTruthy();
    });

    it<Context>(
      "should return true because set of even numbers (<20) is a superset of multiples of 4 (<20)",
      function () {
        this.set.append(2),
          this.set.append(4),
          this.set.append(6),
          this.set.append(8),
          this.set.append(10),
          this.set.append(12),
          this.set.append(14),
          this.set.append(16);

        const other = new Set();

        other.append(4), other.append(8), other.append(12), other.append(16);

        expect(this.set.isSupersetOf(other)).toBeTruthy();
      },
    );

    it<Context>(
      "should return false because set of all odd numbers (<20) is not a superset of prime numbers (<20)",
      function () {
        this.set.append(3),
          this.set.append(5),
          this.set.append(7),
          this.set.append(9),
          this.set.append(11),
          this.set.append(13);

        const other = new Set();

        other.append(2), other.append(3), other.append(5), other.append(7);
        other.append(9);
        other.append(11);
        other.append(13);

        expect(this.set.isSupersetOf(other)).toBeFalsy();
      },
    );

    it<Context>(
      "should return false because sets are supersets of each other",
      function () {
        this.set.append(1), this.set.append(2), this.set.append(3);

        const other = new Set();

        other.append(1),
          other.append(2),
          other.append(3),
          expect(this.set.isSupersetOf(other)).toBeTruthy();
      },
    );
  });
});

describe("range", () => {
  it("should be inclusive", () => {
    const table: [n: number, m: number, number[]][] = [
      [0, 3, [0, 1, 2, 3]],
      [0, 0, [0]],
      [0, -1, []],
      [1, -1, []],
      [1, 1, [1]],
    ];

    for (const [n, m, result] of table) {
      expect([...range(n, m, "inclusive")]).toEqual(result);
    }
  });

  it("should be exclusive", () => {
    const table: [n: number, m: number, number[]][] = [
      [0, 3, [0, 1, 2]],
      [0, 0, []],
      [0, -1, []],
      [1, -1, []],
      [1, 1, []],
    ];

    for (const [n, m, result] of table) {
      expect([...range(n, m, "exclusive")]).toEqual(result);
    }
  });

  it("should throw error", () => {
    const table: [n: number, m: number][] = [
      [0.1, 1],
      [0, 1.1],
      [0.1, 1.1],
    ];

    for (const [n, m] of table) {
      expect(() => range(n, m, "exclusive")).toThrow(RangeError);
    }
  });
});
