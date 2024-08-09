import { expect } from "@std/expect";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { List } from "./list.ts";

interface Context {
  list: List<unknown>;
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
