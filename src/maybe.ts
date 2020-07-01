/* tslint:disable:max-classes-per-file */
import { Monad } from './monad';

abstract class Maybe<T> implements Monad<T> {
  protected isDefined?: boolean;

  static maybe<T>(t?: T | null): Maybe<T> {
    if (t !== null && t !== undefined) {
      return new Some(t);
    } else {
      return new None();
    }
  }

  unit = maybe;

  flatMap<R>(f: (_: T) => Maybe<R>): Maybe<R> {
    if (this.isDefined) {
      return f(this.get());
    } else {
      return new None();
    }
  }

  bind = this.flatMap;

  getOrElse<E extends T>(defaultValue: E): E | T {
    if (this.isDefined) {
      return this.get();
    }
    return defaultValue;
  }

  abstract map<R>(f: (_: T) => R): Maybe<R>;

  abstract get(): T;
}

class Some<T> extends Maybe<T> {
  private readonly t: T;

  constructor(t: T) {
    super();
    this.isDefined = true;
    this.t = t;
  }

  map<R>(f: (_: T) => R): Maybe<R> {
    return this.flatMap((v) => this.unit<R>(f(v)));
  }

  get() {
    return this.t;
  }
}

class None<T> extends Maybe<T> {
  constructor() {
    super();
    this.isDefined = false;
  }

  flatMap<R>(f: (_: T) => Maybe<R>): Maybe<R> {
    return new None();
  }

  map<R>(f: (_: T) => R): Maybe<R> {
    return new None();
  }

  get(): never {
    throw new Error('This is a None object!');
  }
}

const maybe = Maybe.maybe;

export { Maybe, Some, None, maybe };
