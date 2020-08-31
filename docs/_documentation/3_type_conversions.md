---
title: Type Conversion
layout: entry
---

Silq allows converting types by type annotation or type conversion.

### Type Annotation

Type annotations allow re-interpreting the type of an expression if no runtime
conversion is needed.

**Examples**: Function `zeroes` (below) creates representations of `0` of
different types:

{% include code.html filename="type_annotations.slq" %}

**Example**: By default, constant values (e.g., `0`, `true`, ...) are considered
classical. To create a quantum constant, Silq requires an explicit type
annotation:

```javascript
def plusState():𝔹{
  x := false:𝔹;
  x := H(x);
  return x;
}
```

Writing `x := false` instead of `x := false:𝔹` in `plusState` results in `x`
being classical, meaning that it is not consumed by `H(x)`. This results in the
following error:

```javascript
def plusStateInvalid():𝔹{
  x := false;
  x := H(x);
  return x;
} // error: redefinition of "x"
```

### Safe Type Conversion

Safe type conversions (`as`) allow changing the type of an expression by
converting runtime values from one type to another. They are only allowed if the
conversion is safe, i.e., cannot result in a runtime exception.

**Examples**: Function `casts` shows examples of safe type conversions.

{% include code.html filename="type_safe_conversion.slq" %}

## Unsafe Type Coercion

Type coercion is the unsafe alternative to type casts, which is needed whenever
the type transformation may throw a runtime exception.

**Examples**: Function `coerces` shows to applications of `coerce`.

{% include code.html filename="type_unsafe_conversion.slq" %}
