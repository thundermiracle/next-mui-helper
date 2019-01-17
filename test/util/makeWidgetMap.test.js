import makeWidgetMap from '../../src/util/makeWidgetMap';

const input = { name1: 'Jack', name2: 'Frank', name3: 'Billy' };
const inputWithInvalidKeys = { name1: 'Jack', name2: 'Frank', 23: 'No name', name3: 'Billy' };

describe('no funcs tests', () => {
  test('valid input', () => {
    const output = makeWidgetMap(input);
    expect(output).toEqual(input);
  });

  test('valid input with empty funcs array', () => {
    const outputEmptyFunc = makeWidgetMap(input);
    expect(outputEmptyFunc).toEqual(input, []);
  });

  test('invalid input', () => {
    const outputInvalid = makeWidgetMap(inputWithInvalidKeys);
    expect(outputInvalid).toEqual(inputWithInvalidKeys);
  });
});

describe('have funcs tests', () => {
  test('valid input', () => {
    const func1 = function AddDescript(value) { return `My name is ${value}`; };

    const expected = Object.keys(input).reduce((prevObj, key) => {
      prevObj[key] = func1(input[key]);
      return prevObj;
    }, {});

    const output = makeWidgetMap(input, func1);
    expect(output).toEqual(expected);
  });

  test('valid input(multiple funcs)', () => {
    const func1 = function AddDescript(value) { return `My name is ${value}`; };
    const func2 = function AddDescript(value) { return `[NOTE]${value}`; };

    const expected = Object.keys(input).reduce((prevObj, key) => {
      prevObj[key] = func2(func1(input[key]));
      return prevObj;
    }, {});

    const output = makeWidgetMap(input, func1, func2);
    expect(output).toEqual(expected);
  });

  test('invalid input', () => {
    const func1 = function AddDescript(value) { return `My name is ${value}`; };

    const expected = Object.keys(inputWithInvalidKeys).reduce((prevObj, key) => {
      prevObj[key] = func1(inputWithInvalidKeys[key]);
      return prevObj;
    }, {});

    const output = makeWidgetMap(inputWithInvalidKeys, func1);
    expect(output).toEqual(expected);
  });
});
