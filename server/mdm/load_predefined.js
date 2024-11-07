
module.exports = function load_predefined({db, register, abonent, branch, properties, job_prm}) {
  // читаем стандартные константы
  return db.allDocs({
    include_docs: true,
    attachments: true,
    startkey: 'cch.predefined_elmnts',
    endkey: 'cch.predefined_elmnts\ufff0',
  })
    .then(({rows}) => rows.map(({doc}) => {
      doc.ref = doc._id.substring(22);
      // смотрим, нет ли для данного абонента или отдела, переопределения в регистре "предопределенные элементы"
      let parent = doc.parent && rows.find(({id}) => id.includes(doc.parent));
      if(parent?.doc?.synonym && doc.synonym) {
        const synonym = `${parent.doc.synonym}/${doc.synonym}`;
        const property = synonym && properties.predefined(synonym);
        if(property) {
          let _row;
          register.find_rows({property}, (row) => {
            const {obj, recipient} = row;
            if(!_row && !recipient && (!obj || obj === abonent)) {
              _row = row;
            }
            else if(recipient === abonent && obj?.id == job_prm.zone) {
              _row = row;
            }
            if(!branch.empty() && obj?._hierarchy(branch)) {
              _row = row;
            }
            if(!branch.empty() && obj == branch) {
              _row = row;
              return false;
            }
          });
          // если найдено переопределение, кладём в образ данного отдела, изменённое значение
          if(_row) {
            doc.value = _row.value;
          }
        }
      }
      delete doc._id;
      delete doc._rev;
      delete doc.timestamp;
      delete doc.class_name;
      return doc;
    }));
};
