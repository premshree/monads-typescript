/* tslint:disable:max-classes-per-file */
import { Monad } from './monad';

abstract class Either<L, R> implements Monad<R> {
  public static left<L, R>(l: L): Either<L, R> {
    return new Left(l);
  }

  public static right<L, R>(r: R): Either<L, R> {
    return new Right(r);
  }

  unit = Either.right;

  abstract flatMap<U>(f: (t: R) => Either<L, U>): Either<L, U>;
  abstract fold<X, Y>(fLeft: (_: L) => X, fRight: (_: R) => Y): X | Y;

  abstract isLeft(): boolean;

  abstract isRight(): boolean;
}

class Left<L, R> extends Either<L, R> {
  private readonly l: L;

  constructor(l: L) {
    super();
    this.l = l;
  }

  isLeft(): boolean {
    return true;
  }

  isRight(): boolean {
    return false;
  }

  flatMap<U>(f: (t: R) => Either<L, U>): Either<L, U> {
    return new Left<L, U>(this.l);
  }

  fold<X, Y>(fLeft: (_: L) => X, fRight: (_: R) => Y): X {
    return fLeft(this.l);
  }
}

class Right<L, R> extends Either<L, R> {
  private readonly r: R;

  constructor(r: R) {
    super();
    this.r = r;
  }

  isLeft(): boolean {
    return false;
  }

  isRight(): boolean {
    return true;
  }

  flatMap<U>(f: (t: R) => Either<L, U>): Either<L, U> {
    return f(this.r);
  }

  fold<X, Y>(fLeft: (_: L) => X, fRight: (_: R) => Y): Y {
    return fRight(this.r);
  }
}

const left = Either.left;
const right = Either.right;

export { Either, Left, Right, left, right };
