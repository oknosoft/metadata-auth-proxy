

// конструктор MetaEngine
const MetaEngine = require('metadata-core')
  .plugin(require('metadata-pouchdb'))
  .plugin(require('metadata-abstract-ui'))
  .plugin(require('./pouch_from_files'));

// функция установки параметров сеанса
const settings = require('../../config/app.settings');

// функция инициализации структуры метаданных
const meta_init = require('./init');
const on_log_in = require('./on_log_in');
const ram_changes = require('./ram_changes');
const modifiers = require('./modifiers');

module.exports = function (runtime) {

  // Logger
  const log = require('../logger')(runtime);

  // создаём контекст MetaEngine
  const $p = new MetaEngine();
  log('created MetaEngine');

  // параметры сеанса инициализируем сразу
  $p.wsql.init(settings);

  // реквизиты подключения к couchdb
  const {user_node, server} = settings();

  // выполняем скрипт инициализации метаданных
  meta_init($p);

  // сообщяем адаптерам пути, суффиксы и префиксы
  const {wsql, job_prm, adapters: {pouch}, classes, cat} = $p;
  wsql.set_user_param('user_name', user_node.username);
  if(user_node.suffix) {
    pouch.props._suffix = user_node.suffix;
  }
  if(user_node.templates) {
    job_prm.templates = user_node.templates;
  }
  pouch.init(wsql, job_prm);

  // // подключим модификаторы
  modifiers($p);

  // подключаем обработчики событий адаптера данных
  pouch.on({
    user_log_in(name) {
      log(`logged in ${job_prm.couch_local}, user:${name}, zone:${job_prm.zone}`);
    },
    on_log_in() {
      return on_log_in({pouch, classes, job_prm, cat});
    },
    user_log_fault(err) {
      log(`login error ${err}`);
    },
    pouch_load_start(page) {
      log('loadind to ram: start');
    },
    pouch_data_page(page) {
      log(`loadind to ram: page №${page.page} (${page.page * page.limit} from ${page.total_rows})`);
    },
    pouch_complete_loaded(page) {
      log(`ready to receive queries, listen on port: ${server.port}`);
    },
    pouch_doc_ram_loaded() {
      ram_changes({pouch, log});
    },
  });

  // инициализируем метаданные
  // загружаем кешируемые справочники в ram и начинаем следить за изменениями ram
  pouch
    .log_in(user_node.username, user_node.password)
    .then(() => pouch.load_data(pouch.remote.ram));

  return $p;
}




