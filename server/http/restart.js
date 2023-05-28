
const {writeFile} = require('node:fs/promises');
const {end401} = require('./end');

module.exports = function restart($p, log, route) {

  function restart(req, res) {
    const {user} = req;
    const is_admin = user?.roles?.includes('doc_full') || user?.roles?.includes('_admin');
    if(is_admin) {
      const filename = require.resolve('../../config/restart.json');
      writeFile(filename, JSON.stringify({user: user.name, date: new Date()}), 'utf8');
      res.end(JSON.stringify({ok: true}));
    }
    else {
      end401({req, res, err: {message: `patn ${req.parsed?.path || '/restart'} for admins only, role 'doc_full' required`}, log});
    }
  }

  route.restart = restart;

}
