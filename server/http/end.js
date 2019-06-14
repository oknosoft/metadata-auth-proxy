/**
 *
 *
 * @module 404
 *
 * Created by Evgeniy Malyarov on 04.06.2019.
 */

function end(res, body) {
  if(!res.finished) {
    res.statusCode = body.status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body));
  }
}

module.exports = {
  end401({res, err, log}) {
    log(err);
    end(res, {
      error: true,
      status: 401,
      message: `Unauthorized\n${err.message || ''}`,
    });

  },
  end404(res, path) {
    end(res, {
      error: true,
      status: 404,
      message: `path '${path}' not available`,
    });
  },
  end500({res, err, log}) {
    log(err);
    end(res, {
      error: true,
      status: err.status || 500,
      message: err.message || 'unknown error',
    });
  }
};
