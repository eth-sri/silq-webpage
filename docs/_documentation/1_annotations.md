---
title: Annotations
layout: entry
---

Silq supports annotations `!`, `qfree`, `mfree`, `const`, and `lifted`.

### Classical types: `!`

To indicate that a type `τ` may only hold classical values (and not
superpositions), we annotate it as $!\tau$. This ensures we can freely duplicate
and drop values of that type. For example, $1+2$ has type `!int[n]`. In
contrast, `H(0)` holds $\facs \big(\ket{0}+\ket{1} \big)$ and is thus not
classical: It has type `𝔹` and not `!𝔹`.

**Example**: The function `classicalExample` (below) takes two arguments `x` (a
classical Boolean) and `f`. The latter takes a classical Boolean and returns a
classical Boolean. Moreover, `f` itself is classical, meaning that it is
classically known.

```javascript
def classicalExample(x:!𝔹,f:!𝔹!→!𝔹){
  return f(x);             //  ^ f is classical
}
```

**Example (not classical)**: The function `captureQuantum` (below) illustrates a
non-classical function. It returns a function `captured` which captures the
quantum variable `x`. Thus, the state of `captured` is in superposition, meaning
we cannot refer to `captured` as being classical.

```javascript
def captureQuantum(x:𝔹){
  captured := λ(). { // function `captured` takes no arguments
    return H(x); // the body of function `captured` applies `H` to `x`
  };
  return captured:𝟙→𝔹;
                // ^ the returned function is not classical
}
```

In the following, we summarize some useful properties of classical types:

- We can ignore duplicate classical annotations: `!!τ ≡ !τ`
- Classical commutes with tuples: `!(τ × τ) ≡ !τ × !τ` (analogously for n-tuples
  with n>2). As a consequence, we also have `!(τ × τ) ≡ !(τ × !τ) ≡ !(!τ × τ) ≡
  !(!τ × !τ)`
- Classical commutes with arrays: `!τ[] ≡ (!τ)[] ≡ !(τ[])`
- Classical commutes with fixed-length arrays: `!τ^n ≡ (!τ)^n ≡ !(τ^n)`
- Classical values can be re-interpreted as quantum values: `!τ <: τ`

### `qfree`

We use the annotation `qfree` to indicate that evaluating functions or
expressions neither introduces nor destroys superpositions. Annotation `qfree`
(i) ensures that evaluating `qfree` functions on classical arguments yields
classical results and (ii) enables automatic uncomputation.

**Example 1** (not `qfree`): `H` is not `qfree` as it introduces superpositions: It
maps $\ket{0}$ to $\facs \Big(\ket{0}+\ket{1}\Big)$.

**Example 2**: `X` is `qfree`as it neither introduces nor destroys superpositions:
It maps $\sum_{b=0}^1 \gamma_b \ket{b}$ to $\sum_{b=0}^1 \gamma_b \ket{1-b}$.

**Example 3**: Logical disjunction (as in `x||y`) is of type `const 𝔹×const
𝔹→qfree 𝔹`, since ORing two values neither introduces nor destroys
superpositions.

**Example 4**: Function `myEval` (below) takes a `qfree` function `f` and evaluates
it on `false`. Thus, `myEval` itself is also `qfree`.

```javascript
def myEval(f:𝔹→qfree 𝔹)qfree{
  return f(false); //   ^ myEval is qfree
}
```

### `mfree`

Annotation `mfree` indicates that a function can be evaluated without applying
any measurements.

**Example**: Function `myEval` (below) takes a `mfree` function as argument and
evaluates it on `false`. Thus, `evaluate` itself is also `mfree`.

```javascript
def myEval(f:𝔹→mfree 𝔹)mfree{
  return f(false); //   ^ myEval is mfree
}
```

### `const`

Annotation `const` indicates that a variable will not be changed in the given
context. Concretely, each parameter of a function and each variable in the
context may be annotated as `const`. We can use constant parameters and
variables more liberally, since they are guaranteed to persist in the given
context.

**Example**: Function `myEval` (below) takes a constant `x` and a function `f` that
leaves its first argument `const`:

```javascript
def myEval(const x:𝔹,f:const 𝔹!→𝔹){
  return f(x);
}
```

### `lifted`

Annotation `lifted` is a shorthand to indicate `qfree` functions with only
constant arguments (classical arguments are implicitly treated as constants).

**Example**: Function `MyOr` is lifted:

```javascript
def MyOr(x:𝔹, y:!𝔹)lifted{ // x and y are implicitly const
  return x||y;  //  ^ MyOr is lifted 
}
```
