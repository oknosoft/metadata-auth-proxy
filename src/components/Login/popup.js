/**
 * ### Окно авторизации
 *
 * @module popup
 *
 * Created by Evgeniy Malyarov on 14.06.2019.
 */

export default function oAuthPopup(url, options) {
  return new Promise((resolve, reject) => {
    this._oauthComplete = false;
    options.windowName = options.windowTitle ||	'Social Login';
    options.windowOptions = options.windowOptions || 'location=0,status=0'; //,width=800,height=600
    const _oauthWindow = window.open(url, options.windowName, options.windowOptions);

    if (!_oauthWindow) {
      reject({ error: 'Authorization popup blocked' });
    }

    const _oauthInterval = setInterval(() => {
      if (_oauthWindow.closed) {
        clearInterval(_oauthInterval);
        if (!this._oauthComplete) {
          this.authComplete = true;
          reject({ error: 'Authorization cancelled' });
        }
      }
    }, 500);

    window.superlogin = {};
    window.superlogin.oauthSession = (error, session, link) => {
      if (!error && session) {
        session.serverTimeDiff = session.issued - Date.now();
        this.setSession(session);
        this._onLogin(session);
        return resolve(session);
      } else if (!error && link) {
        this._onLink(link);
        return resolve(`${capitalizeFirstLetter(link)} successfully linked.`);
      }
      this._oauthComplete = true;
      return reject(error);
    };
  });
}
