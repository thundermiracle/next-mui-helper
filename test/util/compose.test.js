import compose from '../../src/util/compose';

const func1 = name => `My name is ${name}`;
const func2 = null;
const func3 = name => `[NOTE]${name}`;

test('with null funcionts', () => {
  const myName = 'HelloWorld';
  const nameModifier = compose(
    func3,
    func2,
    func1,
  );

  const result = nameModifier(myName);
  const expected = '[NOTE]My name is HelloWorld';

  expect(result).toEqual(expected);
});

test('without null funcionts', () => {
  const myName = 'HelloWorld';
  const nameModifier = compose(
    func3,
    func1,
  );

  const result = nameModifier(myName);
  const expected = '[NOTE]My name is HelloWorld';

  expect(result).toEqual(expected);
});
