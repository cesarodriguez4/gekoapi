const sql = require('sql-crud');
let crud = new sql('mysql');
let random = require('randomstring');
module.exports = (app, con) => {
	app.post('/query', (req, res) => {
		req.body.ticket = random.generate(6).toUpperCase();
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