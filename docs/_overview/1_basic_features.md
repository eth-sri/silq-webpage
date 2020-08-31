---
title: Basic Features
layout: entry
---

We first introduce some basic features of Silq.

### Basic Feature: Variable Assignment

The following snippet applies the Hadamard transform `H` to a qubit `x`, and
assigns the name `y` to the result.

```javascript
y:=H(x);
```

Compiling this snippet to a circuit yields:

<img width="15%" src="./assets/images/basic-assignment.svg" alt="Variable
assignment" />

Here, we have named the wire into `H` as `x`, and the resulting wire as `y`. A
possible state before applying `H` is $$\ket{0}_\texttt{x}$$, where subscript
`x` indicates that variable `x` stores `0`. Line `y:=H(x)` would then result in
state $$\facs \Big(\ket{0}_\texttt{y}+\ket{1}_\texttt{y} \Big)$$.

To emphasize that the outcome of `H` still refers to the same qubit `x`, we may
write:

```javascript
x:=H(x);
```

This line consumes the original `x`, but names the output `x` again.

### Basic Feature: Conditionals

The following snippet performs a controlled application of the Hadamard
transform.

```javascript
if x {     // controlled on x,
  y:=H(y); // apply H to y
}
```

Compiling this snippet to a circuit yields

<img width="15%" src="./assets/images/basic-ite.svg" alt="Simple conditional" />
