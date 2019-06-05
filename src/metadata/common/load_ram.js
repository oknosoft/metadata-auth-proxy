/**
 *
 *
 * @module load_ram
 *
 * Created by Evgeniy Malyarov on 02.06.2019.
 */

export default function load_ram({pouch, job_prm}) {
  const {auth} = pouch.remote.ram.__opts;

  return fetch(`${job_prm.server.prefix}/ram/all`, {
    credentials: 'include',
    headers: {Authorization: 'Basic ' + btoa(unescape(encodeURIComponent(auth.username + ':' + auth.password)))},
  })
    .then((res) => res.json())
    .then((res) => {
      pouch.load_changes(res);
    });
}
