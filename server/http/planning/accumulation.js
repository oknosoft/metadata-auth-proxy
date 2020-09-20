/**
 * Работа с postgres
 *
 * @module Accumulation
 *
 * Created by Evgeniy Malyarov on 20.09.2020.
 */

const {classes} = require('metadata-core');

class Accumulation extends classes.MetaEventEmitter {

  /**
   * создаёт базу и подключается
   */
  init() {
    const conf = {
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      password: process.env.PGPASSWORD,
      database: 'postgres',
    };
    if(!conf.host || !conf.password) {
      return Promise.reject();
    }
    const {Client} = require('pg');
    const client = new Client(conf);
    return client.connect()
      .then(() => {
        conf.database = 'wb_planning';
        return client.query(`SELECT 1 FROM pg_database WHERE datname = '${conf.database}'`)
      })
      .then(({rows}) => {
        if(!rows.length) {
          return client.query(`CREATE DATABASE ${conf.database} WITH
            ENCODING = 'UTF8'
            LC_COLLATE = 'ru_RU.UTF-8'
            LC_CTYPE = 'ru_RU.UTF-8'
            CONNECTION LIMIT = -1;`);
        }
      })
      .then((create_metadata) => {
        const reconnect = (client) => client.end()
          .then(() => {
            this.client = new Client(conf);
            return this.client.connect();
          });
        return reconnect(client)
          .then(() => {
            if(create_metadata) {
              return this.db_metadata()
                .then(() => reconnect(this.client));
            }
          });
      })
      .then(() => this.set_param('date', Date.now()))
      .then(() => {
        this.emit('init');
      })
      .catch((err) => this.emit('err', err));
  }

  /**
   * Создаёт таблицы, индексы и триггеры
   * @return {Promise<void>}
   */
  db_metadata() {
    const {client} = this;
    const raw = require('fs').readFileSync(require.resolve('./pg.sql'), 'utf8').split('\n');
    let sql = '';
    for(const row of raw) {
      sql += '\n';
      if(!row.startsWith('--')){
        sql += row;
      }
    }
    for(let i = 0; i < 5; i++) {
      sql = sql.replace(/\n\n\n/g, '\n\n');
    }
    let res = Promise.resolve();
    for(const row of sql.split('\n\n')) {
      if(!row) {
        continue;
      }
      res = res.then(() => client.query(row));
    }
    return res;
  }


  /**
   * создаёт таблицы регистров
   * @param def
   */
  create_tables(def = []) {

  }

  set_param(name, value) {
    return this.client.query(`INSERT INTO settings (param, value) VALUES ('${name}', '${value}')
      ON CONFLICT (param) DO UPDATE SET value = EXCLUDED.value;`);
  }

  get_param(name) {
    return this.client.query(`select value from settings where param = '${name}';`)
      .then(({rows}) => rows.length ? rows[0].value : '');
  }
}

module.exports = Accumulation;
