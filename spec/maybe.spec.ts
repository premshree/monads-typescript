import { maybe } from '../src/maybe';

describe('Monadic laws', () => {
  it('left-identity law: unit(x).flatMap(f) == f(x)', () => {
    const x = 4;
    const f = (n: number) => maybe(n * n);
    expect(maybe(x).flatMap(f)).toStrictEqual(f(x));
  });

  it('right-identity law: m.flatMap(unit) == m', () => {
    const x = 4;
    expect(maybe(x).flatMap(maybe)).toStrictEqual(maybe(x));
  });

  it('associativity law: m.flatMap(f).flatMap(g) == m.flatMap(x ⇒ f(x).flatMap(g))', () => {
    const x = 'Prem';
    const m = maybe(x);
    const f = (s: string) => maybe(`Hello, ${s}`);
    const g = (s: string) => maybe(`${s}, welcome.`);
    expect(m.flatMap(f).flatMap(g)).toStrictEqual(m.flatMap((x) => f(x).flatMap(g)));
  });
});

describe('maybe', () => {
  it('does not bind None', () => {
    const name = (n: string | null) => n;
    const none = maybe(name(null))
      .flatMap((e) => maybe(`Hello, ${e}`))
      .getOrElse('Hello, guest');
    expect(none).toBe('Hello, guest');
  });
  it('binds Some', () => {
    const name = (n: string | null) => n;
    const some = maybe(name('Prem'))
      .flatMap((e) => maybe(`Hello, ${e}`))
      .getOrElse('Hello, guest');
    expect(some).toBe('Hello, Prem');
  });
});
