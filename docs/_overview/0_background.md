---
title: Background
layout: entry
---

We assume a basic background in quantum computation. Concretely, the reader
should be familiar with the following concepts:

<div class="table-container" markdown="1">

| Concept                                          | Short Explanation                                                                                                                                                                                                         
|--------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| State of quantum bit (qubit)                     | $\varphi=\gamma_0\ket{0}+\gamma_1\ket{1}$, for $\gamma_0,\gamma_1 \in \mathbb{C}$                                                                                             
| (Computational) basis states                     | States not in superposition, such as $ \ket{0}, \ket{1} $                                                                                                                                                                 
| Tensor product                                   | Used to represent states consisting of multiple qubits, e.g. $ \ket{0} \otimes \ket{0} = \ket{0}\ket{0} $                                                                                                                      
| Entangled states                                 | States than cannot be written as a tensor product of two states. For example, $ \frac{1}{\sqrt{2}} \ket{0}\ket{0} + \frac{1}{\sqrt{2}} \ket{1}\ket{1} $                                                                   
| Measurement                                      | Measuring state $\varphi=\sum_{b=0}^1 \gamma_b\ket{b}$ yields $ \gamma_b \ket{b} $ with probability $\norm{\gamma_b}^2$ (we do not normalize the result).                                                                 
| Lifting classical computations to quantum inputs | Any function $f \colon A \to B$ can be made reversible (and thus realized on a quantum computer) by running the (unitary) operation $U_f \ket{a} \ket{b} \mapsto \ket{a} \ket{b \oplus f(a)} $ on input $\ket{a}\ket{0}$. 
| No-cloning theorem                               | We cannot physically realize an operation of the form $\varphi \mapsto \varphi \otimes \varphi$.|                                                                                                                         

</div>