import { registerUser, loginUser, getUsers, updateUser, deleteUser } from "../controllers/user.js";
import { getSurahs, getSurahVerses } from "../controllers/content.js";
import  GraphQLUpload  from 'graphql-upload/GraphQLUpload.mjs';


// Create a new user


const saltRounds = 10;

export const resolvers = {
  // Query resolvers
  Upload: GraphQLUpload,
  
  Query : {
    login: loginUser,
    getusers: getUsers,
    getsurah: getSurahs,
    getsurahverses: getSurahVerses,
    
    hello: () => { return("Hello world"); }
  }, 

  // Mutation resolvers
  Mutation : {
    addUser: registerUser,
    updateuser: updateUser,
    deleteuser: deleteUser,
    // singleUpload:uploadImage

    // async (_, {file})=>{
    //   console.log('\n')
    //   const {filename} = await file
    //   console.log(file)
    //   return {success: true, filename: filename}
    // }
  }  


  // TEST RESOLVER
  
  // addPost: ({ title, body, tags, userId }) => {
  //   if (!title || !body || !userId) {
  //     return { success: false, message: 'Required fields missing', post: null };
  //   }
  //   const newPost = {
  //     id: posts.length + 1,
  //     title,
  //     body,
  //     tags,
  //     reactions: { likes: 0, dislikes: 0 },
  //     views: 0,
  //     userId
  //   };
  //   posts.push(newPost);
  //   // return newPost;
  //   return { success: true, message: 'Post created sucessfully!', post: newPost };

  // },



};
