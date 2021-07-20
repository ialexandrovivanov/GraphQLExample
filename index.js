const express = require('express');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHttp({
    schema,
    graphiql: true
}));

app.listen(80, () => console.log("Server listening on port 80"));
