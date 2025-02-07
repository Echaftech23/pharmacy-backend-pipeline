import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  uri: 'mongodb+srv://rachidchaf2001:EL7NjIbf4n1Dk4ty@cluster0.bu5c5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0y',
  options: {
    dbName: 'pharmacy',
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
    family: 4,
  },
}));
