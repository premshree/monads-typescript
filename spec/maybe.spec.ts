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

  it('binds Some, but not None', () => {
    class User {
      constructor(private readonly userId: number, private readonly name: string) {}

      getName() {
        return this.name;
      }
    }

    const getUser = (userId: number): User | null => {
      switch (userId) {
        case 1:
          return new User(1, 'Prem');
        case 2:
          return new User(2, 'Emily');
        default:
          return null;
      }
    };

    const getName = (user: User) => user.getName();
    const greetName = (name: string) => `Hello, ${name}`;

    const greetUser = (userId: number) => {
      return maybe(getUser(userId)).map(getName).map(greetName).getOrElse(greetName('guest'));
    };

    expect(greetUser(1)).toBe('Hello, Prem');
    expect(greetUser(2)).toBe('Hello, Emily');
    expect(greetUser(3)).toBe('Hello, guest');
  });
});
