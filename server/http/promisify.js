/**
 * Добавляет async-версии файловых операций
 *
 * @module promisify
 *
 * Created by Evgeniy Malyarov on 28.10.2019.
 */

const fs = require('fs');
const util = require('util');

if(!fs.readFileAsync) {
  fs.readFileAsync = util.promisify(fs.readFile);
}

if(!fs.writeFileAsync) {
  fs.writeFileAsync = util.promisify(fs.writeFile);
}
