# Cells Client Extended

A simple helper to use Pydio Cells in better terms.

## Table of Contents

- [Why](#why)
- [Features](#features)
- [Usage](#usage)
  - [Proxy](#proxy)

----

## Why?

Pydio Cells already has its client called CEC(Cells Client).
However, it often crashes and misbehaviors when we transfer many or large files.
To mitigate the problem, I had to split up the transfer amount and call cec many times instead of one.
This library helps you to use cec on Node.JS when it's in path.

## Features

This utility targets two feature.
One is easily using cec binary, and the another is directly communicating with Pydio Cells server.
I call first one **proxy** and the second one **api**.
I wouldn't publish the package to NPM to minimize the responsibility since I am not willing to develop this actively.

## Usage

Install the package and import via `import * as cce from 'cells-client-extended'`.

### Proxy

To proxy the original cec client, make sure you installed the cec and added to path correctly.
In this case, we compose two function, first one is the command you want to use, and another is `parseTable`.

Cec does print its result to cli table, and `parseTable` function will help you to parse it.
Also, when `stderr` available while executing the command, `stderr` will have priority compared to `stdout`.

#### `cce.proxy.utils`

**cce.proxy.utils.run: (cmd: string, args: string[]) => Promise<string>**

Runs a command.

```typescript
const out = await run('cec', [])
```

**cce.proxy.utils.parseTable: (table: string, fallbackKey?: string = 'unknown') => Record<string, string>[]**

Parses output from command.
`fallbackKey` is used to fill the key of record missing its key.
Note that all keys are lowered for ease control.

```typescript
const out = await run('cec', ['ls', 'workspace'])
const rows = parseTable(out)

console.log(rows)
```

#### `cce.proxy.commands`

**cce.proxy.commands.ls: (args: string[]) => Promise<string>**

Runs `cec ls`.

```typescript
// const ls = (args: string[]) => run('cec', ['ls', args.join('/')]);

const out = await ls(['workspace-name', 'dir-name']);
const rows = parseTable(out, 'File') as { type: 'File' | 'Folder', name: string }[];

console.log(rows);
```

**cce.proxy.commands.scp: (from: string[], to: string[]) => Promise<string>**

Runs `cec scp`.
You can put `cells:` to mark the file is on the server.

```typescript
// export const scp = (from: string[], to: string[]) => run('cec', ['scp', from.join('/'), to.join('/')]);

const out = await scp(['cells:', 'workspace-name', 'dir-name'], ['./downloads'])

console.log(out);
```
