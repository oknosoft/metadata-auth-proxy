
module.exports = function load_predefined(db) {
  return db.allDocs({
    include_docs: true,
    attachments: true,
    startkey: 'cch.predefined_elmnts',
    endkey: 'cch.predefined_elmnts\ufff0',
  })
    .then(({rows}) => rows.map(({doc}) => {
      doc.ref = doc._id.substr(22);
      delete doc._id;
      delete doc._rev;
      delete doc.timestamp;
      delete doc.class_name;
      return doc;
    }));
};
