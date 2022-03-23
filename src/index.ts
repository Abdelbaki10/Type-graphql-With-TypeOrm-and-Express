import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./resolvers/BookResolver";
import { UserResolver } from "./resolvers/UserResolver";
import express from 'express';

async function main() {
  const app = express()
  await createConnection() 
  const schema = await buildSchema({ 
    resolvers: [BookResolver,UserResolver],
    validate:false 
  });
  const server = new ApolloServer({ schema });
  server.start().then(()=>{
    console.log('Apollo is Up')
    server.applyMiddleware({app})
  })
  app.listen(4050,()=>{
    console.log('application running on port 4050')
  })
  
  
}

main();