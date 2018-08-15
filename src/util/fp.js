import {
  equals, type, compose,
} from 'ramda';

// eslint-disable-next-line import/prefer-default-export
export const isString = compose(equals('String'), type);
