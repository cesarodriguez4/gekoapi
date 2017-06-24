const sql = require('sql-crud');
let crud = new sql('mysql');
let random = require('randomstring');
module.exports = (app, con, transporter) => {
	app.post('/query', (req, res) => {
		req.body.ticket = random.generate(10).toUpperCase();
		let opciones = {
		  from: '"Ventas" <ventas1@gekosupplies.com>', // sender address
		  to: req.body.correo,
		  subject: `Tu consulta se ha creado correctamente`,
		  html: 
		   `<img style="margin-left: 30%" width="250" height="100" src="https://pbs.twimg.com/media/DCf4MEIWAAA0SfB.png">
		    <h1 style="text-align: center; background-color: #5b6b8a;color: white;font-family: arial;
		    padding: 0.5em;border-radius:10px;">
		      Tu consulta está siendo procesada.
		    </h1>
		    <p>El ticket asignado a tu caso es: <strong>${req.body.ticket}</strong></p>
		    <p>Tan pronto como tengamos una respuesta a tu consulta
		    te lo comunicaremos por esta vía.</p>
		    <p>Gekosupplies LLC</p>
		    `
		};

		let auto = {
		  from: '"Ventas" <ventas1@gekosupplies.com>', // sender address
		  to: 'ventas1@gekosupplies.com' ,
		  subject: `¡Un cliente nuevo ha hecho una consulta!`,
		  html: 
		   `<img style="margin-left: 30%" width="250" height="100" src="https://pbs.twimg.com/media/DCf4MEIWAAA0SfB.png">
		    <h1 style="text-align: center; background-color: #5b6b8a;color: white;font-family: arial;
		    padding: 0.5em;border-radius:10px;">
		      El ticket del cliente: <strong>${req.body.ticket}</strong>.
		    </h1>
		    <p>Acá los datos de su consulta:</p>
		    <table>
		    	<thead>
		    		<th>Nombre y Apellido</th>
		    		<th>Email</th>
		    		<th>Motivo de la consulta</th>
		    		<th>Mensaje</th>
		    		<th>Pais</th>
		    	</thead>
		    	<tbody>
		    		<tr>
		    			<td>${req.body.nombre}</td>
		    			<td>${req.body.correo}</td>
		    			<td>${req.body.motivo}</td>
		    			<td>${req.body.consulta}</td>
		    			<td>${req.body.pais}</td>
		    		</tr>
		    	</tbody>
		    </table>
		    <p>Puedes acceder a más detalles y opciones iniciando sesión como administrador en www.gekosupplies.com</p>
		    <small>Tip: Si usas la página para responder a tus clientes podrás manejar el historial de una manera más organizada.</small>
		    <p>Gekosupplies LLC</p>
		    `
		};

        transporter.sendMail(opciones, (error, info) => {
	    if (error) {
		   return console.log(error);
		}
	     console.log('Correo %s enviado: %s', info.messageId, info.response);
		});

		transporter.sendMail(auto, (error, info) => {
	    if (error) {
		   return console.log(error);
		}
	     console.log('Correo %s enviado: %s', info.messageId, info.response);
		});

		crud.insert(con, {
			insertInto: 'MENSAJES',
			values: {
				fecha: req.body.fecha,
				mensaje: req.body.consulta,
				ticket: req.body.ticket
			}},false, true);

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

	app.get('/query', (req, res) => {
      crud.select(con, {
      	select: '*',
      	from: 'CONSULTAS' 
      }, (error, result) => {
        if (error) {
        	res.send(error);
        }
        res.send(result);
      });
	});

	app.post('/query/answer', (req, res) => {
      crud.insert(con, {
      	insertInto: 'MENSAJES',
      	values: {
      	  mensaje: req.body.mensaje,
      	  ticket: req.body.ticket,
      	  fecha: req.body.fecha,
      	  envia: 1
      	}
      }, false, true);

      let mensaje = {
		  from: '"Ventas" <ventas1@gekosupplies.com>', // sender address
		  to: req.body.correo,
		  subject: `Mensaje de Gekosupplies LLC`,
		  html: 
		   `<img style="margin-left: 30%" width="250" height="100" src="https://pbs.twimg.com/media/DCf4MEIWAAA0SfB.png">
		    <h1 style="text-align: center; background-color: #5b6b8a;color: white;font-family: arial;
		    padding: 0.5em;border-radius:10px;">
		      Has recibido un nuevo mensaje.
		    </h1>
		    <p>Ticket #: <strong>${req.body.ticket}</strong></p>
		    <p>Mensaje: ${req.body.mensaje}.</p>
		    <p>Puedes responder a este mensaje siguiendo este <a href="www.gekosupplies.com/consulta/ticket">Enlace</a></p>
		    <small>Tip: Puedes ver el historial de conversacion y/o el estado de tu pedido visitando www.gekosupplies.com/consulta/ticket</small>
		    <p>Gekosupplies LLC</p>
		    `
		};

		transporter.sendMail(mensaje, (error, info) => {
	    if (error) {
		   return console.log(error);
		}
	     console.log('Correo %s enviado: %s', info.messageId, info.response);
		});
      res.send(200);
	});
}