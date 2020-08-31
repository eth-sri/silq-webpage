---
title: Unicode Input
layout: entry
---

Silq code often contains unicode symbols like `→` or `𝔹`. In the following, we
explain how to handle such unicode symbols.

### Typing Unicode Symbols

For typing unicode input in vscode, we recommend (enter this command after
hitting CTRL+P):

```
ext install freebroccolo.input-assist
```

Then in settings (`CTRL+,` and search for input-assist.languages) add:

```
"input-assist.languages": ["plaintext", "silq"]
```

### Common Unicode Symbols

In the following, we provide a short list of commonly used unicode symbols, how
the can be typed, and how to type them using ASCII symbols instead (if desired).

| Symbol | Shortcut  | ASCII alternative  |
|--------|-----------|--------------------|
| `→`    | `\to`     | `->`               |
| `ℕ`    | `\bn`     | `N`                |
| `ℝ`    | `\br`     | `R`                |
| `π`    | `\pi`     | `pi`               |
| `𝔹`    | `\bb`     | `B`                |
| `⋅`    | `\cdot`   | `*`                |
| `θ`    | `\theta`  | (any other letter) |
| `ψ`    | `\psi`    | (any other letter) |
| `λ`    | `\lambda` | `lambda`           |
| `¬`    | `\neg`    | `!`                |
| `×`    | `\times`  | `x`                |
| `±`    | `\pm`     | (none)             |
| `𝟙`    | `\b1`     | `1`                |
