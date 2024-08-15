# infra

> 🚧 WIP at [beta branch](https://github.com/TomokiMiyauci/infra/tree/beta)

[Infra](https://infra.spec.whatwg.org/), based on WHATWG spec reference
implementation.

This project can be used for reference implementations of other living
standards.

## Table of Contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
  - [Primitive Data Types](#primitive-data-types)
  - [Data Structures](#data-structures)
    - [List](#list)
    - [Stack](#stack)
    - [Queue](#queue)
    - [Set](#set)
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

### Primitive Data Types

This section is is an implementation corresponding to
[4. Primitive data types](https://infra.spec.whatwg.org/#primitive-data-types).

// TODO

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

## API

See [jsr doc](https://jsr.io/@miyauci/infra) for all APIs.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE) © 2024 Tomoki Miyauchi
