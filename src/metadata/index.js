
// конструктор metadata.js
import MetaEngine from 'metadata-core';
import plugin_pouchdb from 'metadata-pouchdb';
import plugin_ui from 'metadata-abstract-ui';
import plugin_ui_tabulars from 'metadata-abstract-ui/tabulars';
import plugin_react from 'metadata-react/plugin';

// функция установки параметров сеанса
import settings from '../../config/app.settings';

// читаем скрипт инициализации метаданных, полученный в результате выполнения meta:prebuild
import meta_init from './init';
import modifiers from './modifiers';

// генераторы действий и middleware для redux
//import {combineReducers} from 'redux';
import {addMiddleware} from 'redux-dynamic-middlewares';
import {metaActions, metaMiddleware} from 'metadata-redux';

// подключаем плагины к MetaEngine
MetaEngine
  .plugin(plugin_pouchdb)     // подключаем pouchdb-адаптер к прототипу metadata.js
  .plugin(plugin_ui)          // подключаем общие методы интерфейса пользователя
  .plugin(plugin_ui_tabulars) // подключаем методы экспорта табличной части
  .plugin(plugin_react);      // подключаем react-специфичные модификаторы к scheme_settings

// создаём экземпляр MetaEngine и экспортируем его глобально
const $p = global.$p = new MetaEngine();

// параметры сеанса инициализируем сразу
$p.wsql.init(settings);

// со скрипом инициализации метаданных, так же - не затягиваем
meta_init($p);

// скрипт инициализации в привязке к store приложения
export function init(store) {

  return import('pouchdb-authentication')
    .then(() => {
      const {dispatch} = store;

      // подключаем metaMiddleware
      addMiddleware(metaMiddleware($p));

      // сообщяем адаптерам пути, суффиксы и префиксы
      const {wsql, job_prm, adapters: {pouch}, classes} = $p;
      if(wsql.get_user_param('couch_path') !== job_prm.couch_local && process.env.NODE_ENV !== 'development') {
        wsql.set_user_param('couch_path', job_prm.couch_local);
      }
      pouch.init(wsql, job_prm);

      pouch.on({
        on_log_in() {
          const {auth} = pouch.remote.ram.__opts;
          pouch.remote.meta = new classes.PouchDB(pouch.props.path + 'meta', {skip_setup: true, auth});
          Object.defineProperty(pouch.local, 'meta', {get(){ return pouch.remote.meta}});
          return pouch.remote.meta.info();
        },
        pouch_doc_ram_loaded() {
          pouch.emit('pouch_complete_loaded');
        },
      });


      // выполняем модификаторы
      modifiers($p, dispatch);

      // информируем хранилище о готовности MetaEngine
      dispatch(metaActions.META_LOADED($p));

      // читаем локальные данные в ОЗУ
      //return $p.adapters.pouch.load_data();

      // // читаем локальные данные в ОЗУ
      // pouch.load_changes({docs});
      // pouch.call_data_loaded({
      //   total_rows: docs.length,
      //   docs_written: docs.length,
      //   page: 1,
      //   limit: 300,
      //   start: Date.now(),
      // });
    })
    .catch((err) => $p && $p.record_log(err));

}

export default $p;
