
export const typeDefs = `#graphql

type User {
  id: ID!
  email: String!
  username: String!
  password: String!
}

type GetUsersResponse {
  success: Boolean!
  message: String
  users: [User]
}

type GetAddUserResponse {
  success: Boolean!
  message: String
  user: User
  filename: String!
}

type UpdateResponse {
  success: Boolean!
  message: String
  user: User 
}

type LoginResponse {
  success: Boolean!
  message: String!
  token: String
  username: String
  profile_picture: String
}

type DeleteResponse {
  success: Boolean!
  message: String!
  user: User
}

input UpdateContent {
  id:ID!
  email: String
  username: String 
  password: String
}

type GetSurah {
  id: ID!
  revelation_place: String
  revelation_order: Int
  bismillah_pre: Boolean
  name_simple: String
  name_complex: String
  name_arabic: String
  verses_count: Int
  pages: [Int]
  translated_name: translated_name
}

type GetSurahsResponse {
  success: Boolean!
  message: String
  surahs: [GetSurah]
  
}

type Verse {
  id: ID!
  verse_number: Int
  verse_key: String
  hizb_number: Int
  rub_el_hizb_number: Int
  ruku_number: Int
  manzil_number: Int
  sajdah_number: Int  
  page_number: Int
  juz_number: Int
  text_uthmani: String
  chapter_id: Int
  translations: [translation]
}

type translation {
  id: ID!
  resource_id: Int
  text: String
}

type GetSurahVerseResponse {
  success: Boolean!
  message: String
  verses: [Verse]
}

type translated_name {
  language_name: String
  name: String
}


scalar Upload

type File {
  success: Boolean!
  filename: String
}

type Query {
  # User
  getusers: GetUsersResponse
  login(email: String!, password: String!): LoginResponse
  hello: String

  # Surahs
  getsurah: GetSurahsResponse
  getsurahverses(chapter:Int!): GetSurahVerseResponse
  # posts: [Post!] -- testing purpose

  

}

type Mutation {
  addUser(email: String!, username: String!, password: String!, confirm_pass: String!, file: Upload!): GetAddUserResponse
  updateuser(content: UpdateContent): UpdateResponse
  deleteuser(id: ID!): DeleteResponse
  # addPost(title: String!, body: String!, tags: [String!], userId: Int!): PostResponse   // Test resolver
  # singleUpload(file: Upload!): File!

}




# type Reaction {
#   likes: Int
#   dislikes: Int
# }

# type Post {
#   id: ID!
#   title: String!
#   body: String!
#   tags: [String!]
#   reactions: Reaction
#   views: Int
#   userId: Int!
# }


# type PostResponse {
#   success: Boolean!
#   message: String
#   post: Post
  
# }




`;


