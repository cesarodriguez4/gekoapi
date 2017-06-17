const sql = require('sql-crud');
let crud = new sql('mysql');
let random = require('randomstring');
module.exports = (app, con, transporter) => {
	app.post('/query', (req, res) => {
		req.body.ticket = random.generate(10).toUpperCase();
		let opciones = {
		  from: '"Ventas" <ventas1@gekosupplies.com>', // sender address
		  to: req.body.email,
		  subject: `Tu consulta se ha creado correctamente`,
		  html: 
		   `<img style="margin-left: 40%" width="250" height="100" src="https://pbs.twimg.com/media/DCf4MEIWAAA0SfB.png">
		    <h1 style="background-color: #001357;color: white;font-family: arial;
		    padding: 2em;"">
		      Tu consulta está siendo procesada.
		    </h1>
		    <p>El ticket asignado a tu caso es: ${req.body.ticket}</p>
		    <p>Tan pronto como tengamos una respuesta a tu consulta
		    te lo comunicaremos por esta vía</p>
		    <p>Gekosupplies LLC</p>
		    `
		};
        transporter.sendMail(opciones, (error, info) => {
	    if (error) {
		   return console.log(error);
		}
	     console.log('Correo %s enviado: %s', info.messageId, info.response);
		});
		
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