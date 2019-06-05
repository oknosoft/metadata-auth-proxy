/**
 *
 *
 * @module 404
 *
 * Created by Evgeniy Malyarov on 04.06.2019.
 */

module.exports = {
  end404(res, path) {
    const body = {
      error: true,
      status: 404,
      message: `path '${path}' not available`,
    };
    res.statusCode = body.status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body));
  },
  end500({res, err, log}) {
    const body = {
      error: true,
      status: err.status || 500,
      message: err.stack || err.message,
    };
    res.statusCode = body.status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body));
    log(err);
  }
};
