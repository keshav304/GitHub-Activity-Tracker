import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { userTypeDefs } from './schema/userSchema.js';
import { userResolvers } from './resolvers/userResolver.js';
import { repoTypeDefs } from './schema/repoSchema.js';
import { repoResolvers } from './resolvers/repoResolver.js';
import { authenticate } from './utils/jwt.js';
import pg from "pg";

const app = express();

//db connection
const client = new pg.Client({
  user: 'postgres',
  password: '2678',
  host: 'localhost',
  port: 5432,
  database: 'aspire-demo',
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Error connecting to PostgreSQL database', err));

const server = new ApolloServer({
  typeDefs: [userTypeDefs, repoTypeDefs],
  resolvers: [userResolvers, repoResolvers],
  context: ({ req }) => {
    const userId = authenticate(req); 
    return { userId, client }; 
  },
});

await server.start();
server.applyMiddleware({ app });

app.listen(4000, () => console.log('Server running on http://localhost:4000'));
