import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js'; 
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import express from 'express';
import cors from 'cors';
import { config } from "dotenv";
import { dirname } from 'path';
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);   


config({
    path: "./config.env",
  });

const app = express();

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: false,
});

// Start the Apollo Server instance
await server.start();

app.use(
  '/graphql',
  express.json(),
  expressMiddleware(server)
);

app.get('/api/images/:filename', (req, res) => {
  try{
    const imagePath = path.join(__dirname,  'uploads', 'profile_images',  req.params.filename);
    console.log(__dirname)
    console.log(imagePath)
    res.sendFile(imagePath);
  }catch(error){
    res.json("File doesnt exist on server")
  }
 
});

app.listen({ port: 9000 }, () => {
  console.log(`🚀 Server ready at http://localhost:9000/graphql`);
});