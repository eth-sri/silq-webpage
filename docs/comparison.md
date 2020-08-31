---
title: Comparison
title_long: Comparison to Q#
description: Compared to Q#, Silq requires significantly less code and uses less built-in functions, annotations, and gates.
layout: default
---

![Comparison to Q#](./assets/images/comparison.svg)

To compare Silq to Q#, we solved all 28 tasks of Microsoft's Q# [Summer
2018](https://codeforces.com/contest/1002/) and [Winter
2019](https://codeforces.com/contest/1116/) coding contest in Silq. We compared
the Silq solutions to the Q# reference solutions provided by the language
designers from
[2018](https://assets.codeforces.com/rounds/997-998/main-contest-editorial.pdf)
and [2019](https://assets.codeforces.com/rounds/1116/contest-editorial.pdf).

## Examples

Based on manual investigation of the contestants' code, we believe they could
encode their intended solutions better in Silq. In the following, we show two
frequently occurring patterns.

### Flip Before Control

```C#
// Q# code snippet
X(qs[0]); X(qs[1]);
(Controlled X)(qs, a[0]);
X(qs[0]); X(qs[1]);
```

In the above Q# code snippet, the programmer wants to flip the bit of `a[0]` if
both `qs[0]` and `qs[1]` are `0`. In Q#, this requires (i) flipping `qs[0]` and
`qs[1]`, (ii) applying `X` conditioned on `qs`, and (iii) reversing step (i).

In contrast, Silq leverages automatic uncomputation to express this snippet as:

```javascript
// Silq code snippet corresponding to the above Q# code snippet
if !qs[0] && !qs[1] {
  a[0] := X(a[0]);
}
```

### Initializing Qubits

```C#
// Q# code snippet (some parts omitted)
operation Set(des:Result,q:Qubit):(){
  ... // omitted
}
operation Solve(qs:Qubit[]):(){ body{
  for (i in 0..Length(qs)-1){
    Set(Zero,qs[i]);
  }
  ... // omitted
}}
```

In the above Q# code snippet, the programmer wants to initialize the k-bit
integer `qs` to zero, operate on it, and return the result. However, since Q#
does not allow to allocate and return qubits, the code must take a pre-allocated
`qs` and explicitly set it to zero.

In contrast, Silq simply initializes `qs` to zero:

```javascript
// Silq code snippet corresponding to the above Q# code snippet
def solve(k:!ℕ){
  qs:=0:int[k];
  ... // omitted
}
```

## Other Languages

For a more thorough comparison of Silq to other languages, we refer to our
[publication](https://files.sri.inf.ethz.ch/website/papers/pldi20-silq.pdf).
