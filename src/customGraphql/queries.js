export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    email
    name
    phone
    createdAt
    updatedAt
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
          createdAt
          updatedAt
        }
      }
    }
  }
}`;

export const getGroup = `query GetGroup($id: ID!) {
  getGroup(id: $id) {
    id
    name
    owner {
      id
      username
      email
      name
      phone
      groups {
        nextToken
      }
      createdAt
      updatedAt
    }
    type
    description
    users {
      items {
          id
		  user {
			   id
		        name
	            email
		        phone
		        createdAt
		        updatedAt
		        username
		  }
      }
    }
    createdAt
    updatedAt
  }
}
`;
