import * as R from 'ramda';

import { isString } from './fp';

/**
 * Apply all hocs to the object's value(component),
 * return new key->value object { pathOfComponent: hocs(component) }
 *
 * @param {*object} allComponents object of key->value, [key] is the path of the component, [value] is the component
 * @param {*} funcs hoc
 */
const makeWidgetMap = (allComponents, ...funcs) => {
  if (!funcs || funcs.length === 0) {
    // return original mapping if hocs is not defined
    return allComponents;
  }

  const getPropFromAllComponents = name => R.prop(name, allComponents);
  const makeNewComponent = R.compose(
    R.pipe(...funcs),
    getPropFromAllComponents,
  );

  const validComponentNames = R.filter(isString, R.keys(allComponents));
  const validComponents = R.map(makeNewComponent)(validComponentNames);

  return R.compose(
    R.fromPairs,
    R.zip(validComponentNames),
  )(validComponents);
};

export default makeWidgetMap;
