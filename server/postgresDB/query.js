const pool = require('./pool');

const getAll = async () => {
  try {
    const result = await pool.query('SELECT * FROM salesforce.property__c');
    return result.rows;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAll
}

// export default {
//   /**
//    * DB Query
//    * @param {object} req
//    * @param {object} res
//    * @returns {object} object
//    */
//   query(quertText, params) {
//     return new Promise((resolve, reject) => {
//       pool.query(quertText, params)
//         .then((res) => {
//           resolve(res);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   },
// };