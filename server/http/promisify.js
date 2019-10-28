/**
 * Добавляет async-версии файловых операций
 *
 * @module promisify
 *
 * Created by Evgeniy Malyarov on 28.10.2019.
 */

const fs = require('fs');

if(!fs.readFileAsync) {
  fs.readFileAsync = require('util').promisify(fs.readFile);
}

if(!fs.writeFileAsync) {
  fs.writeFileAsync = require('util').promisify(fs.writeFile);
}
