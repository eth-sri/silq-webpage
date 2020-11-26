---
title: Imports
layout: entry
---

Silq supports imports from the directory where it was invoked from.

```javascript
// file main.slq
import lib; // imports f from lib.slq

def main() {
  return f();
}

// file lib.slq
def f(){
  return 42;
}
```

In order  to import from subdirectories, use `import directory.file`.
