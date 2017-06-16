const sql = require('sql-crud');
let crud = new sql('mysql');
module.exports = (app, con) => {
	app.post('/login', (req, res) => {
		console.log('culooo');
		const usuario = req.body.usuario;
		const password = req.body.password;
		console.log(usuario);
		crud.select(con, {
			select: '*',
			from: 'USUARIOS',
			where: {usuario, password}
		}, (error, result) => {
			if (error) {
				res.send(error);
			}
			if (result.length > 0 ) {
				res.send({success: true});
			}
			res.send({error: 'No existe el usuario'});
		}, true);
	});
}