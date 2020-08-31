---
title: Uncomputation
layout: entry
---

While the behavior of Silq's conditionals and the resulting state $\psi_{7,0}$ is
intuitive, achieving it physically requires uncomputation of `f(cand)` at the
end of Line 7. Concretely, before this uncomputation, the state contains the
value of `f(cand)`, stored in a temporary variable
$\scriptsize\underline{\texttt{f(cand)}}$:

$$
\psi'_{7,0} = \psi_2 \otimes \Big(
    \sum_{v \neq w^\star} \facs \ket{v}_\texttt{cand}\ket{0}_{\underline{\texttt{f(cand)}}} -
    \facs \ket{w^\star}_\texttt{cand}\ket{1}_{\underline{\texttt{f(cand)}}}
\Big) \otimes \ket{0}_\texttt{k}.
$$

Now, dropping $\scriptsize\underline{\texttt{f(cand)}}$ (i.e., removing it from
consideration) is physically equivalent to measuring it. Concretely, measuring
and dropping $\scriptsize\underline{\texttt{f(cand)}}$ results in one of the
following states, collapsing $\psi'_{7,0}$:

$$
\psi'_{7,0,0} = \psi_2 \otimes
    \sum_{v \neq w^\star} \facs \ket{v}_\texttt{cand}
 \otimes \ket{0}_\texttt{k} \quad
 \text{or} \quad
 \psi'_{7,0,1} = \psi_2 \otimes
    \facs \ket{w^\star}_\texttt{cand}
 \otimes \ket{0}_\texttt{k}.
$$

In this case, as the probability of obtaining $$\psi'_{7,0,1}$$ is
$$\frac{1}{2^n}$$, `grover` returns the correct result $$w^\star$$ with
probability $$\frac{1}{2^n}$$. Hence, without uncomputation of
$$\scriptsize\underline{\texttt{f(cand)}}$$, `grover` degrades to random
guessing.

As a consequence, to prevent an undesired implicit measurement, we must
uncompute $$\scriptsize\underline{\texttt{f(cand)}}$$, i.e., modify its state to
be unentangled with all other qubits in the system. In our case, correct
uncomputation yields intuitive semantics that simply forget the state of
$$\scriptsize\underline{\texttt{f(cand)}}$$ in $$\psi'_{7,0}$$, thus obtaining
$$\psi_{7,0}$$.

### Uncomputation Pitfalls

Various pitfalls can lead to uncomputation issues. Programmers may

- forget to use it altogether,
- attempt to uncompute variables that are not actually uncomputable
- use wrong operations for uncomputation, or
- rely on variables no longer available to the uncomputation.

### Automatic Uncomputation

In contrast, the type system of Silq ensures that uncomputation of
$\scriptsize\underline{\texttt{f(cand)}}$ is possible, as (i) `f` is `qfree` and
(ii) `cand` is not modified in Line 7 and hence we can temporarily interpret it
as a `const`.

In general, Silq supports automatic uncomputation for expressions which are
`lifted`, i.e., consist of `qfree` functions only depending on `const`
variables. We note that variables may be temporarily viewed as `const`, as in
Line 7 of [Grover's algorithm](#grover-code).

Beyond subexpressions, Silq's type system also enables uncomputation of
variables, which allows overwriting or silently forgetting quantum variables in
a wide range of scenarios and without unintuitive side-effects.

We stress that Silq not only guarantees safe uncomputation, but also leads to
cleaner code that captures the programmer's intent.
