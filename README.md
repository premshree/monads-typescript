# monad.ts

In functional programming, a [monad](https://en.wikipedia.org/wiki/Monad_(functional_programming)) is a design pattern that allows structuring programs generically while automating away boilerplate code needed by the program logic.

In a strongly typed liked language like Scala, with built-in types like the `Option` type, you are very likely
to have already used or will eventually end up using monads without even knowing you are using them. This project
is my attempt at understanding monads by writing them, and I decided to use TypeScript because it forces me to
build monads from "scratch", but with support for strong typing.

### `Maybe`
The first monad, the `Maybe` monad, is based on Scala's
[`Option`](https://www.scala-lang.org/api/current/scala/Option.html) type. It's very useful when you want
to encapsulate computation on values that might be `null` or `undefined`.

Here's an example of some code you might find yourself writing in JavaScript/TypeScript:

```ts
const greetUser = (userId) => {
  const user = getUser(userId);
  let name;
  if (user) {
    name = user.getName();
  }
  if (name) {
    return `Hello ${name}`;
  } else {
    return 'Hello, guest';
  }   
}
``` 

Using the `Maybe` monad:

```ts
const greetUser = (userId: number) => {
  return maybe(getUser(userId))
    .map((user) => user.getName())
    .map((name) => `Hello, ${name}`)
    .getOrElse('Hello, guest');
};
```

Depending on your application, you could simplify this even further, like so:

```ts
const getName = (user: User) => user.getName();
const greetName = (name: string) => `Hello, ${name}`;

const greetUser = (userId: number) => {
  return maybe(getUser(userId))
    .map(getName)
    .map(greetName)
    .getOrElse(greetName('guest'));
};
``` 

As you can see, using the `Maybe` monad abstracts away a lot of boilerplate giving you a flat, composable
interface to work with that's much more readable.

### `Either` 
Similarly, the `Either` monad is based on Scala's
[`Either`](https://www.scala-lang.org/api/current/scala/util/Either.html) type.

### Resources
- [Demystifying the Monad in Scala, Sinisa Louc](https://medium.com/free-code-camp/demystifying-the-monad-in-scala-cc716bb6f534), a well-written, technical, yet approachable explanation of monads in Scala.
- [Douglas Crockford, Monads and Gonads, Google Tech Talks](https://www.youtube.com/watch?v=b0EF0VTs9Dc) Most talks about Monads involve some assumption that types are essential in creating
monadic abstractions. This talk is a refreshing non-academic take on _why_ we need monads (in programming) to begin with, and how you could build one in vanilla (untyped) JavaScript.

### Other JavaScript/TypeScript implementations 
- [monad.js](https://github.com/chrislewis/monad.js), a vanilla JavaScipt implementation of Maybe and Either monads
- [TsMonad](https://github.com/cbowdon/TsMonad), a TypeScript implementation of Maybe, Either and Writer monads