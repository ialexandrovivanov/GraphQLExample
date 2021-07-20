const graphql = require('graphql');
const lodash = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

var books = [
    {id: '1', name: 'one',  genre: 'first', authorId: '1'},
    {id: '2', name: 'two', genre: 'second', authorId: '2'},
    {id: '3', name: 'tree', genre: 'third', authorId: '3'}
];

var authors = [
    {id: '1', name: 'antonio', age: 45},
    {id: '2', name: 'secando', age: 55},
    {id: '3', name: 'tremlor', age: 65}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id:{type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author:{
            type: AuthorType,
            resolve(parent, args){
                return lodash.find(authors, { id: parent.authorId }) // return from database
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({        
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: graphql.GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return lodash.filter(books, {authorId: parent.id}) // return from database
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){
               return lodash.find(books, {id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return lodash.find(authors, { id: args.id })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({query: RootQuery});