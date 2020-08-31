---
title: Preventing Errors
layout: entry
---

In the following, we demonstrate how the type system of Silq rejects programs
with unintuitive semantics, or which are physically unrealizable.

### Invalid Measurements

Silq prevents implicit measurements, as illustrated in the following examples.

#### Implicit Measurement

```javascript
def implicitMeas[n:!ℕ](x:uint[n]){
  y := x % 2;
  return y;
} // parameter 'x' is not consumed
```

The above function tries to forget variable `x`, which cannot be uncomputed.
As this would induce an implicit measurement, Silq rejects this code.

We note that if parameter `x` is constant, it need not be consumed:

```javascript
def unconsumedConst[n:!ℕ](const x:uint[n]){
  y := x % 2;
  return y;
} // no error
```

This is because Silq's type system ensures that callers of `unconsumedConst`
either use `const` arguments, or arguments that can be uncomputed.

#### Conditioned Measurement

```javascript
def condMeas(const c:𝔹,x:𝔹){
  if c{
    x:= measure(x);
  }
  return x;
} // cannot call function 'measure[𝔹]' in 'mfree' context
```

Function `condMeas` (above) tries to apply a measurement, conditioned on quantum
variable `c`. Silq rejects this program, as the then-branch requires a physical
action and we cannot determine whether or not we need to carry out the physical
action without measuring the condition. However, changing the type of `c` to
`!𝔹` would fix this error, as conditional measurement *is* possible if `c` is
classical:

```javascript
def classCondMeas(const c:!𝔹,x:𝔹){
  if c{
    // `:𝔹` interprets the measurement result as a quantum value
    x:= measure(x):𝔹;
  }
  return x;
} // no error
```

We note that Silq would also detect this error if measurement was
hidden in a passed function, as this function would not be `mfree`, i.e., free
of measurements:

```javascript
def hiddenCondMeas(f:𝔹!→𝔹,const c:𝔹,x:𝔹){
  if c{
    x:= f(x);
    // error: cannot call function 'f' in 'mfree' context
  }
  return x;
}
```

#### Reverse Measurement

```javascript
def revMeas(){
  return reverse(measure);
} // reversed function must be mfree
```

The expression `reverse(f)` returns the inverse of function `f`. As we cannot
invert a measurement (this would violate quantum mechanics), `reverse` only
operates on `mfree` functions. Thus, Silq rejects function `revMeas` (above).

We note that while `reverse` is guaranteed to return the inverse of `f`, using
the latter is unsafe if `f` is not surjective. For example, calling the function
returned by `reverse(dup)` is only safe when both its arguments are equal:

```javascript
def useReverseSafe():𝔹{
  x:=H(0:𝔹);
  y:=dup(x); // 1/√̅2 (|00⟩+|11⟩)
  reverse(dup[𝔹])(x,y); // uncomputes y
  return x; // 1/√̅2 (|0⟩+|1⟩)
}

def useReverseUnsafe():𝔹{
  x:=H(0:𝔹);
  y:=H(0:𝔹); // 1/2 (|00⟩+|01⟩+|10⟩+|11⟩)
  reverse(dup[𝔹])(x,y); // UNDEFINED behavior, since dup cannot produce the above state
  return x;
}
```

As `reverse(dup)` is generally useful to provide unsafe uncomputation, we
introduce the (unsafe) shorthand `forget(e1=e2)`, which works analogously.

### Using Consumed Variable

```javascript
def useConsumed(x:𝔹){
  y := H(x);
  return (x,y); // undefined identifier x
}
```

Function `useConsumed` tries to access `x` after it was consumed by `H`. As `x`
is no longer available after it was consumed, Silq rejects this code.

We note that if `x` is constant, Silq allows us to use it even after it was
consumed:

```javascript
def duplicateConst(const x:𝔹){
  y := H(x);
  return (x,y); // no error
}
```

The interpretation in terms of circuits is as follows, where we do not consume
`x` directly, but explicitly duplicate it first.

<img width="40%" src="./assets/images/duplicate-const.svg" alt="Duplicate Constant" />

Thus, Silq allows silent duplication of `const` variables, but not of
non-`const`, non-classical variables. This is reasonable because all duplicates
of constant variables are either consumed (as above), or can be uncomputed.

### Impossible Uncomputation

In the following, we show two functions rejected by Silq as automatic
uncomputation of subexpressions is impossible or unintuitive.

#### Not Constant

```javascript
def nonConst(y:𝔹){
  if X(y) { // X consumes y
    phase(π);
  } 
} // non-'lifted' quantum expression must be consumed
```

While function `nonConst` consumes `y` in `X(y)`, automatic uncomputation
(implemented by reversing `X`) would re-introduce `y`. Thus, while we could
allow `nonConst` in principle, Silq disallows it to prevent this confusing
re-introduction of `y`.

However, marking `y` as `const` would clarify that `y` should remain in the
context, meaning the resulting program would be accepted. As discussed, if `y`
is `const`, `X` consumes a duplicate of `y`, thus leaving the original `y`
unchanged.

```javascript
def signFlipOf0(const y:𝔹){
  if X(y) { // X consumes a copy of y
    phase(π);
  }
} // no error
```

#### Not Qfree

```javascript
def nonQfree(const y:𝔹,z:𝔹){
  if H(y) {
    z := X(z);
  }
  return z;
} // non-'lifted' quantum expression must be consumed
```

While function `nonQfree` uses a constant input `y`, automatic uncomputation
does not work in this case, intuitively because `H` may introduce additional
states into the superposition that cannot be uncomputed in the end (this can be
seen by a straight-forward computation). To prevent this case, Silq only supports
uncomputing `qfree` expressions.

Of course, umcomputation can always be made explicit by `reverse` or `forget`,
at the cost of losing safety.
