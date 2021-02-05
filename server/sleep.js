
// даёт процессору отдохнуть
module.exports = function sleep(time = 100, res) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(res), time);
  });
};
