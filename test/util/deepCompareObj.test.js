import deepCompareObj from '../../src/util/deepCompareObj';

test('input is not object', () => {
  const obj1 = { a: 1 };
  const obj2 = 'a1';

  const result1 = deepCompareObj(obj1, obj2);
  const result2 = deepCompareObj(obj2, obj1);

  expect(result1).toEqual(false);
  expect(result2).toEqual(false);
});

test('input empty', () => {
  const obj1 = {};
  const obj2 = {};

  const result = deepCompareObj(obj1, obj2);

  expect(result).toEqual(true);
});

test('input have nested object', () => {
  const obj1 = { a: { b: { b1: 111, b2: 222 } }, c: 'hello' };
  const obj2 = { c: 'hello', a: { b: { b2: 222, b1: 111 } } };

  const result = deepCompareObj(obj1, obj2);

  expect(result).toEqual(true);
});

test('input have array value', () => {
  const obj1 = { a: [1, 2, 3] };
  const obj2 = { a: [2, 3, 1] };

  const result = deepCompareObj(obj1, obj2);

  expect(result).toEqual(true);
});

test('input have different array value', () => {
  const obj1 = { a: [1, 2, 3] };
  const obj2 = { a: [2, 3, 4] };

  const result = deepCompareObj(obj1, obj2);

  expect(result).toEqual(false);
});

test('input have different object value', () => {
  const obj1 = { a: { b: 1 } };
  const obj2 = { a: { c: 1 } };

  const result = deepCompareObj(obj1, obj2);

  expect(result).toEqual(false);
});

test('input have different normal value', () => {
  const obj1 = { a: 1 };
  const obj2 = { a: '1' };

  const result = deepCompareObj(obj1, obj2);

  expect(result).toEqual(false);
});
