const sql = require('sql-crud');
let crud = new sql('mysql');
module.exports = (app, con) => {
	app.post('/query', (req, res) => {
		crud.insert(con, {
			insertInto: 'CONSULTAS',
			values: req.body
		}, (err, result) => {
			if (err) {
				res.send(err);
			}
			res.send(result);
		}, true);
	});
}