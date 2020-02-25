/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
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
  }
}
`;
export const updateUser = `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
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
  }
}
`;
export const deleteUser = `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
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
  }
}
`;
export const createUserGroups = `mutation CreateUserGroups(
  $input: CreateUserGroupsInput!
  $condition: ModelUserGroupsConditionInput
) {
  createUserGroups(input: $input, condition: $condition) {
    id
    user {
      id
      username
      email
      name
      phone
      groups {
        nextToken
      }
    }
    group {
      id
      name
      owner {
        id
        username
        email
        name
        phone
      }
      type
      description
      users {
        nextToken
      }
    }
  }
}
`;
export const updateUserGroups = `mutation UpdateUserGroups(
  $input: UpdateUserGroupsInput!
  $condition: ModelUserGroupsConditionInput
) {
  updateUserGroups(input: $input, condition: $condition) {
    id
    user {
      id
      username
      email
      name
      phone
      groups {
        nextToken
      }
    }
    group {
      id
      name
      owner {
        id
        username
        email
        name
        phone
      }
      type
      description
      users {
        nextToken
      }
    }
  }
}
`;
export const deleteUserGroups = `mutation DeleteUserGroups(
  $input: DeleteUserGroupsInput!
  $condition: ModelUserGroupsConditionInput
) {
  deleteUserGroups(input: $input, condition: $condition) {
    id
    user {
      id
      username
      email
      name
      phone
      groups {
        nextToken
      }
    }
    group {
      id
      name
      owner {
        id
        username
        email
        name
        phone
      }
      type
      description
      users {
        nextToken
      }
    }
  }
}
`;
export const createGroup = `mutation CreateGroup(
  $input: CreateGroupInput!
  $condition: ModelGroupConditionInput
) {
  createGroup(input: $input, condition: $condition) {
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
    }
    type
    description
    users {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const updateGroup = `mutation UpdateGroup(
  $input: UpdateGroupInput!
  $condition: ModelGroupConditionInput
) {
  updateGroup(input: $input, condition: $condition) {
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
    }
    type
    description
    users {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const deleteGroup = `mutation DeleteGroup(
  $input: DeleteGroupInput!
  $condition: ModelGroupConditionInput
) {
  deleteGroup(input: $input, condition: $condition) {
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
    }
    type
    description
    users {
      items {
        id
      }
      nextToken
    }
  }
}
`;
