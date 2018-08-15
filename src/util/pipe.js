import compose from './compose';

export default (...fns) => (...args) => (
  compose(...fns.reverse())(...args)
);
