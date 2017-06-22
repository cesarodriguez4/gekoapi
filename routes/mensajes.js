const sql = require('sql-crud');
let crud = new sql('mysql');
let random = require('randomstring');
module.exports = (app, con, transporter) => {
	
	app.get('/messages/:ticket', (req, res) => {
      const ticket = req.params.ticket;
      crud.select(con, {
      	select: '*',
      	from: 'MENSAJES',
      	where: {ticket}
      }, (err, result) => {
      	if (err) {
      		res.send(err);
      	}
      	res.send(result);
      }, true);
	});

	app.delete('/users/delete', (req, res) => {
      const ticket = req.body.ticket;
      crud.delete(con, {
      	from: 'CONSULTAS',
      	where: {ticket}
      }, 0, 1);
      crud.delete(con, {
      	from: 'MENSAJES',
      	where: {ticket}
      }, 0, 1);
      res.send(200);
	});

};
