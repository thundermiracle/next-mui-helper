export default (...fns) => (...args) => (
  fns.reduce((prevBC, fn) => {
    if (fn == null) return prevBC;

    if (!Array.isArray(prevBC)) prevBC = [prevBC];

    return fn(...prevBC);
  }, args)
);
