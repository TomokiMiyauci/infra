import { expect } from "@std/expect";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { List, OrderedSet } from "./list.ts";

interface Context {
  list: List<unknown>;
  set: OrderedSet<unknown>;
}

describe("List", () => {
  beforeEach<Context>(function () {
    this.list = new List();
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
      this.list.append(0), this.list.append(1);
      this.list.append(2);

      expect([...this.list]).toEqual([0, 1, 2]);

      this.list.remove(() => true);

      expect([...this.list]).toEqual([]);
    });

    it<Context>("should remove matched items", function () {
      this.list.append(0), this.list.append(1);
      this.list.append(2);
      this.list.append(3);

      expect([...this.list]).toEqual([0, 1, 2, 3]);

      this.list.remove((item) => item === 2);

      expect([...this.list]).toEqual([0, 1, 3]);
    });
  });
});

describe("OrderedSet", () => {
  beforeEach<Context>(function () {
    this.set = new OrderedSet();
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

      const other = new OrderedSet();
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
});
