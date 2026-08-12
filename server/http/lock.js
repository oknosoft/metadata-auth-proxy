
const timeout = 180000;

const locker = {

  lock({ref, uid, user}) {
    let item = this.get(ref);
    if(!item) {
      item = {uid, user, start: new Date().toLocaleString()};
    }
    else if(item.uid === uid && item.user === user) {
      clearTimeout(item.timer);
    }
    else {
      this.error({ref, uid, user, start: item.start});
    }
    item.timer = setTimeout(this.delete.bind(this, ref), timeout);
    this.locks[ref] = item;
  },

  unlock({ref, uid, user}) {
    let item = this.get(ref);
    if(item) {
      if(item.uid === uid && item.user === user) {
        clearTimeout(item.timer);
        this.delete(ref);
      }
      else {
        this.error({ref, uid, user});
      }
    }
  },

  error({ref, uid, user, start}) {
    throw `Объект ${ref}<br/>заблокирован пользователем ${user.name}<br/> в браузере ${uid}<br/>${start}`;
  },

  get(ref) {
    return this.locks[ref];
  },

  delete(ref) {
    delete this.locks[ref];
  },

  locks: {},
};

module.exports = function lock($p, log, route) {

  function handleLock(req, res) {
    const {user, query, parsed: {paths}} = req;
    if(query) {
      const {ref, uid} = query;
      try {
        locker[paths[3] === 'unlock' ? 'unlock' : 'lock']({ref, uid, user});
      }
      catch (e) {
        return res.end(JSON.stringify({
          error: true,
          message: e,
        }));
      }
    }
    res.end(JSON.stringify({ok: true}));
  }

  route.lock = handleLock;

}
