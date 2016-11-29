module.exports = (obj) => {
  return Object.keys(obj).map(key => obj[key]);
};
