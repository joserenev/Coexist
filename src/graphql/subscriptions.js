/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    id
    username
    email
    name
    phone
    group {
      id
      name
      users {
        nextToken
      }
    }
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
    group {
      id
      name
      users {
        nextToken
      }
    }
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
    group {
      id
      name
      users {
        nextToken
      }
    }
  }
}
`;
export const onCreateGroup = `subscription OnCreateGroup {
  onCreateGroup {
    id
    name
    users {
      items {
        id
        username
        email
        name
        phone
      }
      nextToken
    }
  }
}
`;
export const onUpdateGroup = `subscription OnUpdateGroup {
  onUpdateGroup {
    id
    name
    users {
      items {
        id
        username
        email
        name
        phone
      }
      nextToken
    }
  }
}
`;
export const onDeleteGroup = `subscription OnDeleteGroup {
  onDeleteGroup {
    id
    name
    users {
      items {
        id
        username
        email
        name
        phone
      }
      nextToken
    }
  }
}
`;
