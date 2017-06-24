const sql = require('sql-crud');
let crud = new sql('mysql');
let random = require('randomstring');
module.exports = (app, con, transporter) => {
	
app.get('/messages/:ticket', (req, res) => {
  const ticket = req.params.ticket;
  const query = `SELECT * FROM MENSAJES INNER JOIN CONSULTAS ON MENSAJES.ticket = CONSULTAS.ticket WHERE ticket = ${ticket};`;
  console.log(query);
  con.query(query, (err, response) => {
  if (err) {
    res.send(err);
  }
    res.send(response);
  });
});

app.get('/users/delete/:ticket', (req, res) => {
  const ticket = req.params.ticket;
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
