export default (...fns) => (...args) =>
  fns.reduceRight((prevBC, fn) => {
    if (fn == null) return prevBC;

    if (!Array.isArray(prevBC)) prevBC = [prevBC];

    return fn(...prevBC);
  }, args);
