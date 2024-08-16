import { expect } from "@std/expect";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { Map } from "./map.ts";

interface Context {
  map: Map<unknown, unknown>;
}

describe("Map", () => {
  beforeEach<Context>(function () {
    this.map = new Map();
  });
  describe("size", () => {
    it<Context>("should return 0 when initialize", function () {
      expect(this.map.size).toBe(0);
    });

    it<Context>("should number of entires", function () {
      this.map.set("key", "value");
      this.map.set("key2", "value");

      expect(this.map.size).toBe(2);
    });
  });

  describe("isEmpty", () => {
    it<Context>("should return true when initialize", function () {
      expect(this.map.isEmpty).toBeTruthy();
    });

    it<Context>("should return false if any entries exist", function () {
      this.map.set("key", "value");
      this.map.set("key2", "value");

      expect(this.map.isEmpty).toBeFalsy();
    });
  });

  describe("get", () => {
    it<Context>(
      "should return undefined when the key does not exist",
      function () {
        expect(this.map.get("not-found")).toBe(undefined);
      },
    );

    it<Context>("should return entry value", function () {
      this.map.set("key", "value");

      expect(this.map.get("key")).toBe("value");

      this.map.set("key", "value2");

      expect(this.map.get("key")).toBe("value2");
    });
  });

  describe("set", () => {
    it<Context>(
      "should set new entry",
      function () {
        this.map.set("key", "value");

        expect(this.map.size).toBe(1);
      },
    );

    it<Context>("should update value", function () {
      this.map.set("key", "value");

      expect(this.map.get("key")).toBe("value");

      this.map.set("key", "value2");

      expect(this.map.get("key")).toBe("value2");
      expect(this.map.size).toBe(1);
    });

    it<Context>("should not change order of entry when update", function () {
      this.map.set("key", "value");
      this.map.set("key2", "value");

      expect([...this.map]).toEqual([["key", "value"], ["key2", "value"]]);

      this.map.set("key3", "value");

      expect([...this.map]).toEqual([["key", "value"], ["key2", "value"], [
        "key3",
        "value",
      ]]);

      this.map.set("key", "value2");

      expect([...this.map]).toEqual([["key", "value2"], ["key2", "value"], [
        "key3",
        "value",
      ]]);
    });
  });

  describe("remove", () => {
    it<Context>(
      "should do nothing if the key does not exist",
      function () {
        this.map.remove("key");
      },
    );

    it<Context>(
      "should remove key",
      function () {
        this.map.set("key", "value");

        expect([...this.map]).toEqual([["key", "value"]]);

        this.map.remove("key");

        expect([...this.map]).toEqual([]);
      },
    );

    it<Context>(
      "should keep order if remove entry",
      function () {
        this.map.set("key", "value");
        this.map.set("key2", "value");
        this.map.set("key3", "value");

        expect([...this.map]).toEqual([["key", "value"], ["key2", "value"], [
          "key3",
          "value",
        ]]);

        this.map.remove("key2");

        expect([...this.map]).toEqual([["key", "value"], [
          "key3",
          "value",
        ]]);
      },
    );
  });

  describe("clear", () => {
    it<Context>(
      "should do nothing if entries does not exist",
      function () {
        this.map.clear();
      },
    );

    it<Context>(
      "should clear all entries",
      function () {
        this.map.set("key", "value");

        expect(this.map.size).toBe(1);

        this.map.clear();

        expect(this.map.size).toBe(0);
      },
    );

    it<Context>(
      "should clear all entries 2",
      function () {
        this.map.set("key", "value");
        this.map.set("key2", "value");
        this.map.set("key3", "value");

        expect(this.map.size).toBe(3);

        this.map.clear();

        expect(this.map.size).toBe(0);
      },
    );
  });

  describe("exists", () => {
    it<Context>(
      "should return false if the key does not exist",
      function () {
        expect(this.map.exists("not-found")).toBeFalsy();
      },
    );

    it<Context>(
      "should return true if the key exists",
      function () {
        this.map.set("key", "value");
        expect(this.map.exists("key")).toBeTruthy();
      },
    );
  });

  describe("keys", () => {
    it<Context>(
      "should return empty set when initialize",
      function () {
        expect(this.map.keys().isEmpty).toBeTruthy();
      },
    );

    it<Context>(
      "should return set of keys",
      function () {
        this.map.set("key", "value");
        this.map.set("key2", "value");
        this.map.set("key3", "value");

        const keys = this.map.keys();

        expect(keys.size).toBe(3);
        expect([...keys]).toEqual(["key", "key2", "key3"]);
      },
    );
  });

  describe("values", () => {
    it<Context>(
      "should return empty set when initialize",
      function () {
        expect(this.map.values().isEmpty).toBeTruthy();
      },
    );

    it<Context>(
      "should return set of values",
      function () {
        this.map.set("key", "value");
        this.map.set("key2", "value2");
        this.map.set("key3", "value3");

        const values = this.map.values();

        expect(values.size).toBe(3);
        expect([...values]).toEqual(["value", "value2", "value3"]);
      },
    );
  });

  describe("values", () => {
    it<Context>(
      "should return cloned map",
      function () {
        expect(this.map.clone()).not.toBe(this.map);
      },
    );

    it<Context>(
      "should have same entries",
      function () {
        this.map.set("key", "value");
        this.map.set("key2", "value2");
        this.map.set("key3", "value3");

        expect(this.map.size).toBe(3);

        const cloned = this.map.clone();

        expect(cloned.size).toBe(3);
        expect([...cloned]).toEqual([["key", "value"], ["key2", "value2"], [
          "key3",
          "value3",
        ]]);
      },
    );
  });

  describe("sort", () => {
    it<Context>(
      "should sort by asc with key",
      function () {
        const map = new Map<number, string>();

        map.set(0, "a"), map.set(2, "b");
        map.set(1, "c");

        expect([...map]).toEqual([[0, "a"], [2, "b"], [1, "c"]]);

        const sorted = map.sort("asc", ([key], [key2]) => key < key2);

        expect([...sorted]).toEqual([[0, "a"], [1, "c"], [2, "b"]]);
        expect([...map]).toEqual([[0, "a"], [2, "b"], [1, "c"]]);
      },
    );

    it<Context>(
      "should sort by desc with value",
      function () {
        const map = new Map<number, string>();

        map.set(0, "a"), map.set(2, "b");
        map.set(1, "c");

        expect([...map]).toEqual([[0, "a"], [2, "b"], [1, "c"]]);

        const sorted = map.sort(
          "desc",
          ([_, value], [__, value2]) => value < value2,
        );

        expect([...sorted]).toEqual([[1, "c"], [2, "b"], [0, "a"]]);
        expect([...map]).toEqual([[0, "a"], [2, "b"], [1, "c"]]);
      },
    );
  });
});
