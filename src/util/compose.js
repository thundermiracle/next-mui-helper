export default (...fns) => (...args) => {
  fns.forEach((fn) => {
    if (fn == null) return;

    if (!Array.isArray(args)) {
      args = [args];
    }
    args = fn(...args);
  });
  return args;
};
