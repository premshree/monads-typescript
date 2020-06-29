interface Monad<T> {
  unit<U>(t: U): Monad<U>;

  flatMap<U>(f: (t: T) => Monad<U>): Monad<U>;
}

export { Monad };
