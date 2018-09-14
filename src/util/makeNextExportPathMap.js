import * as R from 'ramda';

const nilToEmpty = elem => (R.isNil(elem) ? '' : elem);
const toArray = elem => (Array.isArray(elem) ? elem : [elem]);
const formatToNextPathmap = uri => [uri, { page: uri }];

function getUriList(basicUri, nameList) {
  const composeUri = R.curry((base, subPath) => `/${base}${subPath === '' ? '' : `/${subPath}`}`)(basicUri);
  const makeRealUri = R.compose(
    composeUri,
    nilToEmpty,
  );
  return R.compose(
    R.map(makeRealUri),
    toArray,
  )(nameList);
}

/**
 * Flat pathMap to OBJECT which can be used to
 * create static next.js site.
 *
 * The flatten OBJECT: { 'name of path': { page: 'absolute path'} }
 * 
 * @param {*array} pathMap [{pathname: pathname, children: null or array of subpath}]
 */
export default function makeNextExportPathMap(pathMap) {
  if (!Array.isArray(pathMap)) return {};

  const makeNextPathmapUriList = R.compose(
    R.apply(getUriList),
    R.props(['pathname', 'children']),
  );

  const allPathMap = R.compose(
    R.fromPairs,
    R.map(formatToNextPathmap),
    R.flatten,
    R.concat(['/']), // add root path
    R.map(makeNextPathmapUriList),
  )(pathMap);

  return allPathMap;
}
