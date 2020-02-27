export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    email
    name
    phone
    groups {
      items {
        id
        group {
          id
          name
          type
          description
          owner {
            username
            id
            name
          }
        }
      }
    }
  }
}`;
