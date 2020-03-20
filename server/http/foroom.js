/**
 *
 * Возвращает браузеру справочники жалюзи
 * @module foroom
 *
 * Created by Evgeniy Malyarov on 19.03.2020.
 */

const compression = require('compression');
const {promisify} = require('util');
const compressionHandler = promisify(compression());
const fs = require('fs');
const fname = require('path').resolve(__dirname, '../mdm/foroom/index.json');
const jsname = require('path').resolve(__dirname, '../mdm/foroom/api.js');

module.exports = function foroom($p, log) {

  return async function foroom(req, res) {

    await compressionHandler(req, res);

    const {paths} = req.parsed;
    let stream;
    if(paths[3] === 'js' || paths[3] === 'api') {
      res.setHeader('Content-Type', 'application/javascript');
      stream = fs.createReadStream(jsname);
    }
    else {
      stream = fs.createReadStream(fname);
    }

    stream.pipe(res);
    res.on('close', () => stream.destroy());
  }

};
