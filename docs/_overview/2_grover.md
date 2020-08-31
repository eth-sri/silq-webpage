---
title: Grover's Algorithm in Silq
layout: entry
---

We illustrate Silq and its benefits on Grover's algorithm, a widely known quantum
search algorithm. For a given function $$f \colon \{-2^{n-1},...,2^{n-1}-1\}
\to \{0,1\}$$ from n-bit integers to booleans, it finds the input $w^\star$ for
which $f(w^\star)=1$. For simplicity, we only discuss the case where $w^\star$
is unique, i.e., where $f(v)=0$ for all $v \neq w^\star$.

We first show the implementation, and then walk through its key features.

<img src="./assets/images/grover-intro.svg" alt="Grover's algorithm in Silq"
width="100%" id="grover-code" />

### Comparison to Circuits

For readers familiar with quantum circuits, we next show a possible
implementation of `grover` in terms of circuits. While it does not follow the
standard presentation of Grover's algorithm, it implements the same behavior. To
avoid notational clutter, the circuit's wires are unnamed.

<img src="./assets/images/grover-circuit.svg" alt="Grover's algorithm as a circuit"
width="70%" />

### Generic Parameter and Classical Types

The first argument of `grover` is a *generic parameter* `n`, used to parametrize
the input length of `f`. It has type `!ℕ`, which indicates classical natural
numbers of arbitrary size. Here, annotation `!` indicates `n` is classically
known, i.e., it is in a basis state (not in superposition), and we can
manipulate it classically.

Silq requires generic parameters to be classical, allowing their use in
parameterizing types. While Silq supports quantum values of the fixed-size
quantum integer types `int[n]` (containing n-bit integers) and `uint[n]`
(containing n-bit unsigned integers), it disallows quantum values of type `ℤ`
(containing all integers) or `ℕ` (containing all natural numbers), as the latter
require a dynamic-length representation.

Note the function body also requires `n` to be classical. Otherwise, we could
not determine the number of loop iterations without measuring `nIterations`,
which would collapse the state. Further, the parameter `f` is also annotated as
classical. This enables us to use `f` liberally, i.e., like a normal variable on
a classical computer. Concretely, we can call `f` multiple times as well as
silently drop it from the context at the end of `grover`.

### Qfree Functions

The type of `f` is annotated as `qfree` which indicates `f` neither introduces
nor destroys superpositions. In particular, if `f` takes as input a basis state,
then it will return a basis state. A good example of a `qfree` function is the
bit-flip gate `X`, which maps $\sum_{v=0}^1 \gamma_v \ket{v}$ to $\sum_{v=0}^1
\gamma_v \ket{1-v}$.

### Constant Parameters for Qfree Functions

Note that while `X` is `qfree`, it does not preserve its argument, i.e., it
consumes its input. In contrast, the argument of `f` is annotated as `const`,
indicating that `f` preserves it.

Concretely, consider state $$\sum_v \gamma_v \varphi_v \ket{v}_\texttt{x}$$
where $\varphi_v$ captures the (possibly entangled) remainder of the state.
Then, running `y := f(x)` on this state, where `f` is `qfree`, yields $$\sum_v
\gamma_v \varphi_v \otimes \ket{v}_\texttt{x} \otimes \ket{f(v)}_\texttt{y}$$.
The resulting state preserves the original summand expressions and augments them
with an additional value $\ket{f(v)}_\texttt{y}$.

Function parameters not annotated as `const` are not accessible after calling
the function, that is, the function *consumes* them. For example, `groverDiff`
consumes its argument (see top-right box in the [above
code](#grover-code)). Hence, the call in Line 8 consumes `cand`,
transforms it, and writes the result into a new variable with the same name
`cand`. Similarly, `measure` in Line 10 consumes `cand` by measuring it.

### Input State

The state of the system after Line 1 is $\psi_1$, where $f$ and $n$ denote the
value of the variables. Next, Line 2 initializes variable `nIterations`,
yielding state $\psi_2$.

### Superpositions

Lines 3-4 result in state $\psi_4$, where `cand` holds the equal superposition
of all n-bit integers in $$\{-2^{n-1},...,2^{n-1}-1\}$$. To this end, Line 4
updates the i-th bit of `cand` by applying the Hadamard transform `H` to it.

### Loops

The loop in Line 6 runs `nIterations` times, which is only possible as the
latter is classical. Each loop iteration increases the coefficient of
$\ket{w^\star}$, thus increasing the probability of measuring $w^\star$ in the
end (Line 10). We now discuss the first loop iteration ($k=0$). It starts from
state $\psi_{6,0}$ which introduces variable `k`. For convenience, it also
splits the superposition into $w^\star$ and all other values.

### Conditionals

Line 7 runs `phase(π)` if `f(cand)` returns true. As `phase(π)` flips the sign
of coefficients, Line 7 changes the coefficient of $\ket{w^\star}$ from
$\frac{1}{\sqrt{2^n}}$ to $-\frac{1}{\sqrt{2^n}}$.

In the [circuit shown previously](#grover-code), we physically realize this by
(i) evaluating `f(cand)` using $U_f$, (ii) applying `phase(π)` using a $Z$ gate,
and (iii) uncomputing `f(cand)` using $U_f^\dagger$. Uncomputing `f(cand)` is
critical, as we will discuss [shortly](#/overview/3_uncomputation).

### Grover's Diffusion Operator

Completing the explanations of our example, Line 8 applies Grover's diffusion
operator to `cand`. `groverDiff` increases the coefficient of solution
$w^\star$, obtaining $$\norm{\gamma_{w^\star}^+}>\norm{\frac{1}{\sqrt{2^n}}}$$
and decreases the coefficient of non-solutions $v \neq w^\star$, obtaining
$$\norm{\gamma_v^-}<\norm{\frac{1}{\sqrt{2^n}}}$$. After one loop iteration,
this results in state $\psi_{8,0}$. Repeated iterations of the loop, Lines 6-9,
further increase the coefficient of $w^\star$, until it is approximately $1$.
Thus, measuring `cand` in Line 10 returns $w^\star$ with high probability.
