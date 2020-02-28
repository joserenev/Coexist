/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateUserGroups = `subscription OnCreateUserGroups {
  onCreateUserGroups {
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
      createdAt
      updatedAt
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
  }
}
`;
export const onUpdateUserGroups = `subscription OnUpdateUserGroups {
  onUpdateUserGroups {
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
      createdAt
      updatedAt
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
  }
}
`;
export const onDeleteUserGroups = `subscription OnDeleteUserGroups {
  onDeleteUserGroups {
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
      createdAt
      updatedAt
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
  }
}
`;
export const onCreateGroup = `subscription OnCreateGroup {
  onCreateGroup {
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
export const onUpdateGroup = `subscription OnUpdateGroup {
  onUpdateGroup {
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
export const onDeleteGroup = `subscription OnDeleteGroup {
  onDeleteGroup {
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
