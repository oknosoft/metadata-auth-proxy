/**
 * Извлекает тело запроса
 *
 * @module body
 *
 * Created by Evgeniy Malyarov on 13.02.2019.
 */

module.exports = function getBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => data += chunk);
    req.on('end', () => {
      if(data.length > 0 && data.charCodeAt(0) == 65279) {
        data = data.substring(1);
      }
      resolve(data);
    });
    req.on('error', reject);
  });
}
