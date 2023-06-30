
module.exports = function ips({cat, job_prm}) {

  return job_prm.server.white_ips ? function white_ips(req, res) {
    const ip = `${req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || res.socket.remoteAddress}`
      .replace('::ffff:','');
    for(const [mask, id] of job_prm.server.white_ips) {
      if(mask == ip || (mask.includes('*') && ip.startsWith(mask.split('*')[0]))) {
        return cat.users.by_id(id);
      }
    }
  } : () => null;

}
