import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './schema.js';

import _db  from './_db.js';

const resolvers = {
   Query: {
       games: () => _db.games,

       game: (_, args) => _db.games.find(game => game.id === args.id),

       authors: () => _db.authors,

       author: (_, args) => _db.authors.find(author => author.id === args.id),

       reviews: () => _db.reviews,

       review: (_, args) => _db.reviews.find(review => review.id === args.id)

   }
};

// server setup
const server = new ApolloServer({
    // A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
    typeDefs,
    resolvers
    
    
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);