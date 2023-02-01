---
title: Functions
layout: entry
---

In the following, we discuss functions in Silq.

### Lifted Operations

Silq supports various standard operations `lifted` to the quantum setting,
including:

- `+`, `-`, `*`, `/`
- `xorb` or `⊕` (bitwise-xor)
- `div` (integer division, rounded down)
- `^` (exponentiation)
- `sin`, `asin` (arcsin), `cos`, `acos` (arccos), `tan`, `atan` (arctan)
- `ceil` (round up), `floor` (round down), `round` (round to closest)
- comparators: `<`, `<=` or `≤`, `!=` or `≠`, `==` or `=`, `>`, `>=` or `≥`
- Boolean operators: `&&`, `||`
- `sqrt`, `exp`, `log` (for $\log_b(x)$, write `log(x)/log(b)`)
- `abs`
- `min`, `max`

### Reverse

The primitive `reverse` allows to reverse a procedure, assuming this procedure
is `mfree`. For example, the following line is a crucial ingredient to quantum
phase estimation. It reverses `QFT` (the Quantum Fourier transform with the
specified `precision`) and applies the resulting procedure to `ancilla`.

```javascript
ancilla := reverse(QFT[precision])(ancilla);
```

### Other Functions

The following table lists other functions supported by Silq.

<div class="table-container" markdown="1">

| Function: Type                 | Explanation                                                                                                                                    |
|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `measure: τ→!τ`                | `measure(e)` returns measured `e`                                                                                                              |
| `H:𝔹→mfree 𝔹`                | `H(x)` returns Hadamard transformed `x`                                                                                                        |
| `phase:!ℝ→mfree 𝟙`            | `phase(r)` multiplies the phase of the current state by $e^{i r}=\cos(r)+i\sin(r)$. `phase` only has an observable effect if it is executed in a quantum conditional.|         |
| `rotX:!ℝ×𝔹→mfree 𝔹`          | `rotX(r,b)` returns `b:𝔹` rotated around X-axis by `r:!ℝ`: $\ket{r}\ket{b} \mapsto \cos\frac{r}{2}\ket{b}-i \sin \frac{r}{2} \ket{1-b}$       |
| `rotY:!ℝ×𝔹→mfree 𝔹`          | `rotY(r,b)` returns `b:𝔹` rotated around Y-axis by `r:!ℝ`: $\ket{r}\ket{b} \mapsto \cos\frac{r}{2}\ket{b}+ \sin \frac{r}{2} (-1)^b \ket{1-b}$ |
| `rotZ:!ℝ×𝔹→mfree 𝔹`          | `rotZ(r,b)` returns `b:𝔹` rotated around Z-axis by `r:!ℝ`: $\ket{r}\ket{b} \mapsto \cos\frac{r}{2}\ket{b}-i \sin \frac{r}{2} (-1)^b \ket{b}$  |
| `X:𝔹→qfree 𝔹`                | `X(b)` returns bit-flipped `b` : $\ket{b} \mapsto \ket{1-b}$                                                                                                                |
| `Y:𝔹→mfree 𝔹`                | `Y(b)` returns `b` after applying `Y`-gate: $\ket{b} \mapsto i (-1)^b \ket{1-b}$                                                               |
| `Z:𝔹→mfree 𝔹`                | `Z(b)` returns `b` after applying `Z`-gate: $\ket{b} \mapsto (-1)^b \ket{b}$                                                                   |
| `dup:const τ→qfree τ`          | `dup(v)` returns a duplicate of `v`: $\ket{v} \mapsto \ket{v}\ket{v}$. Note that `dup` does not violate the no cloning theorem.                 |
| `array:!ℕ×const τ×→qfree τ[]`  | `array(m,v)` returns an array filled with `m` duplicates of `v` (analogous to `dup`)                                                       |
| `vector:!ℕ×const τ×→qfree τ^n` | `vector(m,v)` returns a vector filled with `m` duplicates of `v` (analogous to `dup`)                                                      |
| `forget(⋅=⋅):τ×const τ→qfree 𝟙` | `forget(x,y)` forgets `x` if it equals `y` (and is undefined otherwise). This allows for (unsafe) uncomputation according to a specific function.                                                                        |
| `forget(⋅):τ→qfree 𝟙` | `forget(x)` forgets `x`, assuming Silq can figure out how to uncompute it.                                                                        |
| `⋅[⋅]:const τ×!uint !→qfree τ` | `e1[e2]` returns the `e2`-th element of `e1`                                                                                                   |

</div>
