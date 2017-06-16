const sql  = require('sql-crud');
const crud = new sql("mysql");

module.exports = (app, con) => {
  app.post('/query', (req, res) => {
    console.log(req.body);
    res.send('ok');
  });
};
