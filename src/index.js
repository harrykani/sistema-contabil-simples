const app = require('./server.js');

const port = process.env.PORT;

app.listen(port, () =>
  console.log(`Server hosted on port: ${port}`)
);
