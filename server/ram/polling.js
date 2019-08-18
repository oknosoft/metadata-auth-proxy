/**
 *
 *
 * @module polling
 *
 * Created by Evgeniy Malyarov on 18.08.2019.
 */

module.exports = class Polling {

  constructor(db, log) {
    this.db = db;
    this.log = log;
    this.feed = db.changes({
      live: true,
      include_docs: true,
      since: 'now',
      style: 'main_only'
    })
      .on('change', this.handleChange.bind(this))
      .on('error', (err) => {
        log(err);
      });
    this.responses = new Set();
    this.heartbeat = this.heartbeat.bind(this);
    this.heartbeat();
  }

  /**
   * Пишет пустую строку во все активные ответы, чтобы освежить соединение
   */
  heartbeat() {
    for (const res in this.responses) {
      res.write('\n');
    }
    setTimeout(this.heartbeat, 30000);
  }

  /**
   * Добавляет response в очередь
   */
  add(res) {
    res.setHeader('Content-Type', 'application/json');
    this.responses.add(res);
  }

  /**
   * Оповещает всех подписчиков об изменениях
   */
  handleChange(change) {
    const responses = Array.from(this.responses);
    this.responses.clear();
    const data = JSON.stringify(change);
    for(const res of responses) {
      try{
        res.end(data);
      }
      catch (e) {
        this.log(e);
      }
    }
  }

}
