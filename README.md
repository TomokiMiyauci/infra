# infra

[![JSR](https://jsr.io/badges/@miyauci/infra)](https://jsr.io/@miyauci/infra)
[![codecov](https://codecov.io/gh/TomokiMiyauci/infra/graph/badge.svg?token=y08xVJ1mvm)](https://codecov.io/gh/TomokiMiyauci/infra)
[![GitHub](https://img.shields.io/github/license/TomokiMiyauci/infra)](https://github.com/TomokiMiyauci/infra/blob/main/LICENSE)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)

[Infra Standard](https://infra.spec.whatwg.org/), based on WHATWG spec reference
implementation.

## Table of Contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
  - [Data Structures](#data-structures)
    - [List](#list)
    - [Stack](#stack)
    - [Queue](#queue)
    - [Set](#set)
    - [Map](#map)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Install

deno:

```bash
deno add @miyauci/infra
```

node:

```bash
npx jsr add @miyauci/infra
```

## Usage

### Data Structures

This section is is an implementation corresponding to
[5. Data structures](https://infra.spec.whatwg.org/#data-structures).

#### List

[List](https://infra.spec.whatwg.org/#list) is an ordered sequence consisting of
a finite number of items.

```ts
import { List } from "@miyauci/infra";

const list = new List<number>();

list.size;
list.isEmpty;
list[0];

list.append(0);
list.prepend(1);
list.empty();
list.extend([2, 3, 4]);
list.insert(3, Infinity);
list.replace(3, 6);
list.remove(2);
list.removeIf((item) => item % 3 === 1);

for (const item of list) {}

const has = list.contains(3);
const other = list.clone();
const indices = list.indices();
```

#### Stack

[Queue](https://infra.spec.whatwg.org/#queues) is a [list](#list). It is
available `push`, `pop` and `peek` instead of list operations.

```ts
import { Stack } from "@miyauci/infra";

const stack = new Stack();

stack.push(0);

const item = stack.pop();
const lastItem = stack.peek();
```

#### Queue

[Queue](https://infra.spec.whatwg.org/#queues) is a [list](#list). It is
available `enqueue` and `dequeue` instead of list operations.

```ts
import { Queue } from "@miyauci/infra";

const queue = new Queue();

queue.enqueue("value");

while (!queue.isEmpty) queue.dequeue();
```

#### Set

[Set](https://infra.spec.whatwg.org/#ordered-set) is a [list](#list) and has the
semantics that items do not overlap.

```ts
import { type List, Set } from "@miyauci/infra";

declare const listLike: List<number>;
const set = new Set<number>();

const intersection = set.intersection(listLike);
const union = set.union(listLike);
const isSubsetOf = set.isSubsetOf(listLike);
const isSupersetOf = set.isSupersetOf(listLike);
```

#### Map

[Map](https://infra.spec.whatwg.org/#ordered-map) is a finite ordered sequence
of tuples, each consisting of a key and a value, with no key appearing twice.

```ts
import { Map } from "@miyauci/infra";

const map = new Map<string, string>();

const size = map.size;
const isEmpty = map.isEmpty;

map.set("key", "value");
map.get("key");
map.remove("key");
map.clear();

const has = map.exists("key");
const keys = map.keys();
const values = map.values();
const cloned = map.clone();
const sorted = map.sort("asc", (left, right) => left[0] < right[0]);
```

## API

See [jsr doc](https://jsr.io/@miyauci/infra) for all APIs.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE) © 2024 Tomoki Miyauchi
