import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { UserResolver } from './resolvers/UserResolver';
import { PropertyResolver } from './resolvers/PropertyResolver';
import cors from 'cors';
import dotenv from 'dotenv';
import { authMiddleware } from './middlewares/authMiddleware';

// Load environment variables
dotenv.config();

// Initialize Prisma client
const prisma = new PrismaClient();

async function bootstrap() {
  // Create Express application
  const app = express();
  
  // Configure middleware
  app.use(cors());
  app.use(express.json());
  app.use(authMiddleware);
  
  // Build GraphQL schema
  const schema = await buildSchema({
    resolvers: [UserResolver, PropertyResolver],
    validate: false,
  });
  
  // Create Apollo Server
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({
      req,
      prisma,
    }),
  });
  
  // Start Apollo Server
  await apolloServer.start();
  
  // Apply Apollo middleware to Express
  apolloServer.applyMiddleware({ app });
  
  // Start Express server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`);
  });
}

// Handle server errors
bootstrap().catch((error) => {
  console.error('Server startup error:', error);
});

// Handle Prisma client shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
}); 