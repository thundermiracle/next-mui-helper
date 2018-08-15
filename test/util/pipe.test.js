import pipe from 'src/util/pipe';

const func1 = name => `My name is ${name}`;
const func2 = null;
const func3 = name => `[NOTE]${name}`;

test('with null funcionts', () => {
  const myName = 'HelloWorld';
  const nameModifier = pipe(
    func1,
    func2,
    func3,
  );

  const result = nameModifier(myName);
  const expected = '[NOTE]My name is HelloWorld';

  expect(result).toEqual(expected);
});

test('without null funcionts', () => {
  const myName = 'HelloWorld';
  const nameModifier = pipe(
    func1,
    func3,
  );

  const result = nameModifier(myName);
  const expected = '[NOTE]My name is HelloWorld';

  expect(result).toEqual(expected);
});
