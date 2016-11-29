module.exports = (value, threshold, zeroFn) => {
  const number = parseFloat(value);

  return number === 0 ? zeroFn(`${value}s`) : (number < threshold ? '-' : `${value}s`);
};
