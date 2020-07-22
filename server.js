const express = require('express');
const expressGraphQL = require('express-graphql');
const { graphqlHTTP } = expressGraphQL;
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');
const app = express();


const authors =[
    { id: 1, name:'J. K. Rowling'},
    { id: 2, name:'J. K. Suryawanshi'},
    { id: 3, name:'J. K. Kelkar'},
];

const books = [
    { id:1, name:'Harry Potter 1', authorID:3},
    { id:2, name:'Divya Potter 2', authorID:2},
    { id:3, name:'Pooja Potter 3', authorID:1},
    { id:4, name:'Himani Potter 4', authorID:3},
    { id:5, name:'Shivani Potter 5', authorID:1},
    { id:6, name:'Tejal Potter 6', authorID:3},
    { id:7, name:'Ali Potter 7', authorID:1},
    { id:8, name:'Dhanu Potter 8', authorID:2},
]

const BookType = new GraphQLObjectType({
    name:'Book',
    description:'This represents a book written by an Author',
    fields:()=>({
        id:{type:GraphQLNonNull(GraphQLInt)},
        name:{type:GraphQLNonNull(GraphQLString)},
        authorID:{type:GraphQLNonNull(GraphQLString)},
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields:()=>({
        books:{
            type: new GraphQLList(BookType),
            description:'List of Books',
            resolve:()=> books
        }
    })
})

const schema = new GraphQLSchema({
    query:RootQueryType
})

app.use('/graphql',graphqlHTTP({
    graphiql: true,
    schema:schema
  }));

app.listen(5000, () => {
    console.log(`Server started on port 5000`);
});