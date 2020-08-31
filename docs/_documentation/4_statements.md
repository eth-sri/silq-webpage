---
title: Statements and Expressions
layout: entry
---

In the following, we discuss statements and expressions in Silq.

### Control Flow

- Syntax: `if e {...} else {...}`

Silq supports both classical and quantum control flow. Classical control flow
poses no restrictions on the two branches:

```javascript
def measureInBasis(b:!𝔹,x:𝔹):!𝔹{
  // measure in |±>-basis (if b=1) or in computational basis (if b=0)
  if b{
    x := H(x);
    return measure(x);
  }else{
    return measure(x);
  }
}
```

Silq also supports quantum control flow. For example, the procedure `cnot`
(below) modifies `y` conditioned on `x`:

```javascript
def cnot(const x:𝔹,y:𝔹):𝔹{
  if x{
    y := X(y);
  }
  return y;
}
```

For quantum control flow, Silq enforces some restrictions. For example, it would
disallow `conditionalMeasure` (below). This procedure attempts to measure `x` in
a quantum conditional. Because this is not physically realizable, Silq rejects
`conditionalMeasure`.

```javascript
def conditionalMeasure[n:!ℕ](const b:𝔹, x:uint[n]):𝟙{
  if b{
    x := measure(x);
  }
} // error: cannot call function 'measure[uint[n]]' in 'mfree' context
```

Overall, Silq enforces the following properties for quantum control flow:

- Both branches are `mfree`.
- The condition can be implicitly uncomputed at the end of the two branches: the
  condition is `lifted` and all variables occurring in it are left `const` by
  both branches.
- Both branches cannot (i) write to variables of classical type, or (ii) create
  arrays or (iii) create functions. The reason for this restriction is that
  allowing these writes would induce unexpected superpositions of (i) classical
  values, (ii) arrays of different lengths, or (iii) functions.

### Loops

- `while e {...}`: While loops; `e` must be classical.
- `for i in [e1..e2) {...}`: For-loop from `e1` (inclusive) to `e2` (exclusive).
  Both `e1` and `e2` must be classical.
- `for i in [e1..e2] {...}`: For-loop from `e1` (inclusive) to `e2` (inclusive).
  Both `e1` and `e2` must be classical.

For example, `geometric` samples from the `geometric(0.5)` distribution by
counting the number of trials until measuring `H(false)` returns `0`:

```javascript
def geometric():!ℕ{
    count := 0;
    ok := true;
    while ok{
        count += 1;
        ok = measure(H(false));
    }
    return count;
}
```

As an example of an invalid program, the procedure `quantumWhile` (below)
attempts to control a while-loop by a quantum condition. Silq disallows this,
since the number of loop iterations is unbounded, meaning we cannot build a
quantum gate that implements this loop.

```javascript
def quantumWhile(const x:𝔹)mfree:𝟙{
  while x==0{
    // do work
  }
} // error: type of condition should be !𝔹, not 𝔹
```

### Assignments

For assignments, Silq also supports modifying individual vector/array elements,
as in the following code snippet:

```javascript
def uniformSuperposition[n:!ℕ]():𝔹^n{
  vec := vector(n,0:𝔹); // vector of length n filled with zeros
  for i in [0..n){
    vec[i] := H(vec[i]);
  }
  return vec;
}
```

In general, vector/array elements can be modified according to this pattern:

<img src="./assets/images/inplace.svg" alt="Inplace modification of vector/array"
width="400px" />

Of course, Silq prevents implicitly overwriting vector entries:

```javascript
def overwrite[n:!ℕ]():𝔹^n{
  vec := uniformSuperposition[n]();
  vec[0] := H(vec[1]);
  return vec;
} // error: indices for component replacement must be identical
```

### Expressions

- Constants: `π`, `-10`, `0`, `10`, `10.5`, ...
- Lambda abstraction (Option 1): `λ([const] x1:τ1,...,[const] xn:τn). {...}`
- Lambda abstraction (Option 2): `lambda([const] x1:τ1,...,[const] xn:τn). {...}`

### Indexing

Indexing arrays works as usual:

```javascript
def main(){
  x := [0,1,2,3];
  return x[3]; // returns 3
}
```

Analogously, Silq also supports indexing into the bit representation of
(unsigned) integers.

```javascript
def main(){
  x := 5: uint[4];
  return (x[3], x[2], x[1], x[0]); // returns the bit representation of 5: 0101
}
```

Silq also supports quantum indexing `e1[e2]` for non-classical `e2`, if `e1` does
not contain any classical components (i.e., no classical types, function types,
or array types).
