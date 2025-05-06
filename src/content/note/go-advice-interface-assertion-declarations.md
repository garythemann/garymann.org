---
title: "Go Advice: Use Interface assertion declarations"
description: "You can use interface assertion declarations to check and document that you have correctly implemented an interface in Go"
publishDate: "2025-05-06T20:00:00Z"
tags:
  - go
  - advice
  - plt
---

In Go, interfaces are _implicitly_ implemented by types. The type checker verifies that a value has a type which correctly implements the interface at the places where the value is being _used_ and not where its type is declared[^1]. Sometimes, it's nice to have earlier proof than this.

A simple but effective pattern in Go is to assert the type conversion explicitly within a declaration so that you know that the interface has been implemented correctly. I like to do this because it also works as documentation, and it works early in the process of implementing a new type before you know exactly where it will be used. It also helps prove whether the type implements the interface via the value or the pointer to a value.

```go
type Point struct {X, Y int }

var _ fmt.Stringer = (*Point)(nil) // ./prog.go:7:22: cannot use (*Point)(nil) (value of type *Point) as fmt.Stringer value in variable declaration: *Point does not implement fmt.Stringer (missing method String)

```

In the code above, it looks like we intended to implement the `String` method on the `Point` type, but since we didn't, we get a compiler error.  I observe a few things about this approach of using an  "interface assertion declaration" to check this early:

1. Notice the declaration uses a discard for its name. Since we don't actually care about ever referencing this value again, we can just use `_` for its name.
2. Notice the conversion of an untyped nil literal to a _typed_ nil value. This is a cute way to avoid making an allocation (i.e. `new(Point)`)

Interestingly, we decided to make `Point` implement `Stringer` via a _pointer_ instead of _directly_. Does this have any implications?

Well, it turns out that with this declaration, we can implement this interface using either selector for `Point`:

```go

// Either of these will satisfy the interface!
func (Point) String() string { ... }
func (*Point) String() string { ... }

```

However, if you assert the _non-pointer type_ in the interface assertion declaration, then the selector must also use the non-pointer type and using the pointer type is invalid. (See what I mean - [Go Play](https://go.dev/play/p/AwAAv2S9XyS)).

<!-- 

```go
package main

import "fmt"

// Refer to https://garymann.org/notes/go-advice-interface-assertion-declarations/

type Point struct{ X, Y int }

// This version will not compile
// var _ fmt.Stringer = Point{}

// But this one does
var _ fmt.Stringer = (*Point)(nil)

func (*Point) String() string {
	return ""
}

func main() {
}

```
-->


[^1]: The Go spec defines how types implement interfaces but the [rules of type assignability](https://go.dev/ref/spec#Assignability) of values are what give the definition actual importance because this is where it gets enforced for interfaces. 
