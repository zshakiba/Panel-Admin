import { gql } from '@apollo/client'

const query = {
  get: {
    aboutus: gql`
      query {
        getAllAboutus {
          users {
            name
            explain
            dirimage
            email
            id
          }
          status
        }
      }
    `,
    caption: gql`
      query {
        getAllcaption {
          caption {
            caption
            id
          }
          status
        }
      }
    `,
    category: gql`
      query {
        getAllCategory {
          categories {
            title
            dirimage
            id
            project {
              name
              description
              dirimage
              purpos
              link
              id
            }
          }
          status
        }
      }
    `,
    connectus: gql`
      query {
        getAllconecctus {
          conecctus {
            fname
            email
            description
            response
            id
          }
          status
        }
      }
    `,
    customProject: gql`
      query {
        getAllCustomProject {
          project {
            phone
            email
            category
            nameproject
            dirimage
            description
            link
            id
          }
          status
        }
      }
    `,
    weblog: gql`
      query {
        getAllWeblog {
          Weblogs {
            dirimage
            title
            categoryWeblog
            content
            id
          }
          status
        }
      }
    `,
  },
}

export default query
