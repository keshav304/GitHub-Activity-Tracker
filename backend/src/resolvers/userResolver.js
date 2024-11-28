import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const userResolvers = {
    Mutation: {
      signup: async (_, { email, password }, { client }) => {
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const result = await client.query(
          'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
          [email, hashedPassword]
        );
  
        const user = result.rows[0];
  
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        return { token, user };
      },
      login: async (_, { email, password }, { client }) => {
        const result = await client.query(
          'SELECT id, email, password FROM users WHERE email = $1',
          [email]
        );
      
        const user = result.rows[0];
        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new Error('Invalid credentials');
        }
      
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        return { token, user }; 
      }
      
    },
  };
  