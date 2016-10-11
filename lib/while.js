module.exports = (fn, nextParams) => {
  return new Promise((resolve, reject) => {
    function next(err, nextParams) {
      if (err) {
        return reject(err);
      }

      if (nextParams) {
        return fn(next, nextParams);
      }
      else {
        resolve();
      }
    }

    fn(next, nextParams);
  });
};
