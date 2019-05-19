/**
 *
 *
 * @module body
 *
 * Created by Evgeniy Malyarov on 13.02.2019.
 */

module.exports = function getBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => data += chunk);
    req.on('end', (chunk) => {
      if(data.length > 0 && data.charCodeAt(0) == 65279) {
        data = data.substr(1);
      }
      resolve(data);
    });
  });
}
