/**
 * Дополняет запрос common информацией текущего branch и пользователя
 *
 * @module current_branch
 *
 * Created 06.05.2021.
 */

const {Readable} = require('stream');

module.exports = function current_branch({stream, branches, users, headers, utils}) {
  if(utils.is_guid(headers.branch)) {
    const branch = branches.by_ref[headers.branch];
    if(branch) {
      const rows = [branch];
      if(!branch.parent.empty()) {
        rows.push(branch.parent);
      }
      const text = JSON.stringify({name: 'cat.branches', rows}) + '\r\n';
      const readable = Readable.from([text]);
      stream.add(readable);
    }
  }
  if(utils.is_guid(headers.impersonation)) {
    const user = users.by_ref[headers.impersonation];
    if(user) {
      const text = JSON.stringify({name: 'cat.users', rows: [user]}) + '\r\n';
      const readable = Readable.from([text]);
      stream.add(readable);
    }
  }
};
