const sql = require('sql-crud');
let crud = new sql('mysql');
module.exports = (app, con) => {
	app.post('/login', (req, res) => {
		const correo = req.body.correo;
		const password = req.body.password;
		crud.select(con, {
			select: '*',
			from: 'ADMINISTRADORES',
			where: {correo, password}
		}, (error, result) => {
			if (error) {
				res.send(error);
			}
			if (result.length > 0 ) {
				res.send({success: true});
			}
			res.send({error: 'Este usuario no existe.'});
		}, true);
	});
}