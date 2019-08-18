/**
 *
 *
 * @module load_ram
 *
 * Created by Evgeniy Malyarov on 02.06.2019.
 */

export default function load_ram({pouch, classes, job_prm, cat}) {
  const {remote: {ram}, local, props} = pouch;
  const common = new classes.PouchDB(props.path.replace(job_prm.local_storage_prefix, `common`), {
    skip_setup: true,
    owner: pouch,
    auth: ram.__opts.auth,
  });

  return local.ram.replicate.from(common)
    .then(() => {

      local.ram.allDocs({include_docs: true}).then((res) => pouch.load_changes(res, {}));

      // local.ram.replicate.from(common, {
      //   live: true,
      //   retry: true,
      //   since: 'now'
      // })
      //   .on('error', (err) => {
      //     console.log(err);
      //   });

      return fetch(`${job_prm.server.prefix}/ram/all`, {
        headers: ram.getBasicAuthHeaders({prefix: props._auth_provider.toUpperCase() + ' ', ...ram.__opts.auth}),
      })
        .then((res) => res.json())
        .then((res) => {
          pouch.load_changes(res);
          //return cat.clrs.find_rows_remote({});
        });
    });

}
