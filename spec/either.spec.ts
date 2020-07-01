import { Either, left, right } from '../src/either';

describe('Monadic laws', () => {
  it('left-identity law: unit(x).flatMap(f) == f(x)', () => {
    const x = 4;
    const f = (n: number) => right(n * n);
    expect(right(x).flatMap(f)).toStrictEqual(f(x));
  });

  it('right-identity law: m.flatMap(unit) == m', () => {
    const x = 4;
    expect(right(x).flatMap(right)).toStrictEqual(right(x));
  });

  it('associativity law: m.flatMap(f).flatMap(g) == m.flatMap(x ⇒ f(x).flatMap(g))', () => {
    const x = 'Prem';
    const m = right(x);
    const f = (s: string) => right(`Hello, ${s}`);
    const g = (s: string) => right(`${s}, welcome.`);
    expect(m.flatMap(f).flatMap(g)).toStrictEqual(m.flatMap((x) => f(x).flatMap(g)));
  });
});

describe('either – fold', () => {
  const getAge = (id: number): Either<string, number> => {
    switch (id) {
      case 1:
        return left('age unknown');
      case 2:
        return right(17);
      case 3:
        return right(18);
      case 4:
        return right(19);
      case 5:
        return right(20);
      default:
        return left('no such user');
    }
  };

  const canDrink = (age: number): boolean => age >= 18;

  const mockLeft = jest.fn((l: string) => {
    return false;
  });

  const mockRight = jest.fn((r: boolean) => {
    return r;
  });

  test.each([
    [1, false, true],
    [2, false, false],
    [3, true, false],
    [4, true, false],
    [5, true, false],
    [6, false, true],
  ])(`getAge(%s).fold(mockLeft, mockRight) ⇒ %s`, (age, expected, isLeft) => {
    const okToDrink = getAge(age)
      .flatMap((age) => right(canDrink(age)))
      .fold(mockLeft, mockRight);
    expect(okToDrink).toBe(expected);
    expect(mockLeft).toHaveBeenCalledTimes(isLeft ? 1 : 0);
    expect(mockRight).toHaveBeenCalledTimes(isLeft ? 0 : 1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
