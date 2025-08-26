const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html>
      <head><title>Test Server</title></head>
      <body>
        <h1>¡Servidor de prueba funcionando!</h1>
        <p>Si puedes ver esto, el problema no es de conectividad básica.</p>
        <p>Fecha: ${new Date().toLocaleString()}</p>
      </body>
    </html>
  `);
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Servidor de prueba ejecutándose en http://localhost:3000');
  console.log('También accesible desde la red en http://0.0.0.0:3000');
});


