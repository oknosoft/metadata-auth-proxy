/**
 * Created by ftescht on 18.04.2014.
 */

module.exports = function(runtime) {

	const workerId = runtime && (runtime.common ? 'ram' : (runtime.cluster && runtime.cluster.worker ? runtime.cluster.worker.id : null));
  const workerKey = (message) => {
    const time = new Date();
    let key = time.toISOString();
    if(workerId) {
      key += ` [worker#${workerId}]`
    }
    if(message.ip) {
      key += `[${message.ip}]`
    }
    return key;
  };

	return function (message, type) {
    const logObject = {
      type: (type !== null && type !== undefined) ? type : 'info',
      message: message
    };

		console[logObject.type === 'error' || message instanceof Error ? 'error' : 'log'](
      workerKey(message) + `[${logObject.type}]: `+
      (logObject.message instanceof Error ? logObject.message.stack : JSON.stringify(logObject.message))
		);
	};

};
