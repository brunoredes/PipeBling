import http from 'http';
import app from './app';

const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor rodando na porta: ${process.env.PORT}`);
});
