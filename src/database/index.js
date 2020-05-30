import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on('error', (err) => {
      // eslint-disable-next-line no-console
      console.error(`Erro na conexão com o banco de dados! ${err}`);
    });
    mongoose.connection.on('disconnected', () => {
      // eslint-disable-next-line no-console
      console.error('Aplicação desconectada do banco de dados!');
    });
    mongoose.connection.on('connected', () => {
      // eslint-disable-next-line no-console
      console.log('Aplicação conectada do banco de dados!');
    });
  }
}
export default new Database();
