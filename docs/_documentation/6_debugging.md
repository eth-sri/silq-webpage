---
title: Debugging
layout: entry
---

The following functions are useful for debugging:

- `dump();` dumps the current program state when running the program
- `exit();` aborts the program with an error, most useful directly after `dump`
- `__show(__query("dep", var));` prints the dependencies for variable `var`
  (these dependencies are used for uncomputation)
- `print(e)` prints the value of the (classical) expression `e`

Further, in the `vscode` plugin, pressing `F6` prints statements as they are
executed as well as intermediate program states between consecutive statements.

### Entry Point

The entry point for running programs is function `main`.
