import { gql } from '@apollo/client'

const mutations = {
  edit: {
    project: gql`
      mutation editproject(
        $file: Upload
        $name: String
        $id: ID
        $description: String
        $purpos: String
        $link: String
        $categorytitle: String
      ) {
        editproject(
          file: $file
          name: $name
          id: $id
          description: $description
          purpos: $purpos
          link: $link
          categorytitle: $categorytitle
        ) {
          status
          message
        }
      }
    `,
    aboutus: gql`
      mutation editaboutus($id: ID, $input: Aboutus) {
        editaboutus(id: $id, input: $input) {
          status
          message
        }
      }
    `,
    user: gql`
      mutation edituser($input: UserInput!, $id: ID) {
        edituser(input: $input, id: $id) {
          status
          message
        }
      }
    `,
    caption: gql`
      mutation editcaptionaboutus($text: String, $id: ID) {
        editcaptionaboutus(text: $text, id: $id) {
          status
          message
        }
      }
    `,
    category: gql`
      mutation editcategory($file: Upload, $title: String, $id: ID) {
        editcategory(file: $file, title: $title, id: $id) {
          status
          message
        }
      }
    `,
    connectus: gql`
      mutation editeconecctus($email: String, $response: String) {
        editeconecctus(email: $email, response: $response) {
          status
          message
        }
      }
    `,
    weblog: gql`
      mutation editWeblog($input: CreateWeblog!, $id: ID!) {
        editWeblog(input: $input, id: $id) {
          status
          message
        }
      }
    `,
  },
  add: {
    aboutus: gql`
      mutation createaboutus($input: Aboutus) {
        createaboutus(input: $input) {
          status
          message
        }
      }
    `,
    baner: gql`
      mutation createbaner($file: [Upload], $idprivate: String) {
        createbaner(file: $file, idprivate: $idprivate) {
          status
          message
        }
      }
    `,
    caption: gql`
      mutation createcaptionaboutus($text: String) {
        createcaptionaboutus(text: $text) {
          status
          message
        }
      }
    `,
    category: gql`
      mutation createcategory($file: Upload!, $title: String) {
        createcategory(file: $file, title: $title) {
          status
          message
        }
      }
    `,
    connectus: gql`
      mutation connectus($fname: String, $email: String!, $description: String!) {
        connectus(fname: $fname, email: $email, description: $description) {
          status
          message
        }
      }
    `,
    project: gql`
      mutation createproject($input: CreateProject!) {
        createproject(input: $input) {
          status
          message
        }
      }
    `,
    weblog: gql`
      mutation createWeblog($input: CreateWeblog!) {
        createWeblog(input: $input) {
          status
          message
        }
      }
    `,
    uploadimage: gql`
      mutation uploadimage($file: Upload!) {
        uploadimage(file: $fiel) {
          status
          message
          pathimage
        }
      }
    `,
  },
  delete: {
    aboutus: gql`
      mutation deleteaboutus($id: ID) {
        deleteaboutus(id: $id) {
          status
          message
        }
      }
    `,
    baner: gql`
      mutation deletbaner($id: ID) {
        deletbaner(id: $id) {
          message
          status
        }
      }
    `,
    caption: gql`
      mutation deletecaption($id: ID) {
        deletecaption(id: $id) {
          status
          message
        }
      }
    `,
    category: gql`
      mutation deletcategory($id: ID) {
        deletcategory(id: $id) {
          status
          message
        }
      }
    `,
    connectus: gql`
      mutation deletconectus($id: ID) {
        deletconectus(id: $id) {
          status
          message
        }
      }
    `,
    customProject: gql`
      mutation deletecustomproject($id: ID) {
        deletecustomproject(id: $id) {
          status
          message
        }
      }
    `,
    project: gql`
      mutation deletproject($id: ID) {
        deletproject(id: $id) {
          status
          message
        }
      }
    `,
    user: gql`
      mutation deletuser($id: ID) {
        deletuser(id: $id) {
          status
          message
        }
      }
    `,
    weblog: gql`
      mutation deletWeblog($id: ID) {
        deletWeblog(id: $id) {
          status
          message
        }
      }
    `,
  },
  get: {
    user: gql`
      mutation {
        getAllUser {
          status
          users {
            phone
            fname
            email
            password
            isAdmin
            category {
              title
            }
            id
          }
        }
      }
    `,
    baner: gql`
      mutation getAllBaner($id: String) {
        getAllBaner(id: $id) {
          baners {
            id
            user
            dirimage
            idprivate
          }
          status
        }
      }
    `,
  },
}

export default mutations
