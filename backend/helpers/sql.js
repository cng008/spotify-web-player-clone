const { BadRequestError } = require('../expressError');

/**
 * Helper for making selective update queries.
 *
 * The calling function can use it to make the SET clause of an SQL UPDATE
 * statement.
 *
 * @param dataToUpdate {Object} {field1: newVal, field2: newVal, ...}
 * @param jsToSql {Object} maps js-style data fields to database column names,
 *   like { name: "name", description: "description", "image": image}
 *
 * @returns {Object} {sqlSetCols, dataToUpdate}
 *
 * @example {name: 'Christien', description: 'liked songs', image: 'uri'} =>
 *   { setCols: '"name"=$1, "description"=$2', "image"=$3,
 *     values: ['Christien', 'liked songs', 'uri'] }
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError('No data');

  // {name: 'Christien', description: 'liked songs', image: 'uri'} => ['"name"=$1', '"description"=$2', '"image"=$3']
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(', '),
    values: Object.values(dataToUpdate)
  };
}

module.exports = { sqlForPartialUpdate };
