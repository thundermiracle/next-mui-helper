import makeNextExportPathMap from '../../src/util/makeNextExportPathMap';

const rootPath = { page: '/' };

test('pathmap object is not array', () => {
  const resultArray = ['', 'aa', null, 123].map(makeNextExportPathMap);
  resultArray.forEach((result) => {
    expect(result).toEqual({});
  });
});

test('pathmap.children is not null', () => {
  const pathMap = [{ pathname: 'root', children: ['sub1', 'sub2'] }];
  const result = makeNextExportPathMap(pathMap);

  const expected = {
    '/': rootPath,
    '/root/sub1': { page: '/root/sub1' },
    '/root/sub2': { page: '/root/sub2' },
  };

  expect(result).toEqual(expected);
});


test('pathmap.children is null', () => {
  const pathMap = [{ pathname: 'root' }];
  const result = makeNextExportPathMap(pathMap);

  const expected = {
    '/': rootPath,
    '/root': { page: '/root' },
  };

  expect(result).toEqual(expected);
});

test('pathmap is normal', () => {
  const pathMap = [
    { pathname: 'spiral' },
    { pathname: 'sunflower' },
  ];
  const result = makeNextExportPathMap(pathMap);

  const expected = {
    '/': rootPath,
    '/spiral': { page: '/spiral' },
    '/sunflower': { page: '/sunflower' },
  };

  expect(result).toEqual(expected);
});
