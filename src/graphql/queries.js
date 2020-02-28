/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
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
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const listGroups = `query ListGroups(
  $filter: ModelGroupFilterInput
  $limit: Int
  $nextToken: String
) {
  listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      owner {
        id
        username
        email
        name
        phone
        createdAt
        updatedAt
      }
      type
      description
      users {
        nextToken
      }
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
