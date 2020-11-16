---
title: Types
layout: entry
---

Silq supports the following types. In this list, `n` stands for an arbitrary
expression of type `!ℕ`.

- `𝟙` (or `1`): The singleton type that only contains element `()`
- `𝔹` (or `B`): Booleans
- `ℕ` (or `N`): Natural numbers 0, 1, ... (must be classical)
- `ℤ` (or `Z`): Integers ..., -1, 0, 1, ... (must be classical)
- `ℚ` (or `Q`): Rational numbers (must be classical)
- `ℝ` (or `R`): Reals (must be classical). Simulation semantics are implementation-defined (typically floating point)
- `int[n]`: n-bit integers encoded in [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement)
- `uint[n]`: n-bit unsigned integers
- `τ×...×τ` (or `τ x ... x τ`): tuple types, e.g., `𝔹×int[n]`
- `τ[]`: dynamic-length arrays
- `τ^n`: vectors of length `n`
- `!τ`: type `τ`, but restricted to classical values
- `[const] τ×...× [const] τ → [mfree|qfree] τ`: functions, optionally annotated
  as `mfree` or `qfree`, whose input types are optionally annotated as `const`
