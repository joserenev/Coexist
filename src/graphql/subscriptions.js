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
    pictureURL
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
    pictureURL
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
    pictureURL
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
      pictureURL
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
        pictureURL
      }
      type
      description
      users {
        nextToken
      }
      createdAt
      updatedAt
      pictureURL
      receipts {
        nextToken
      }
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
      pictureURL
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
        pictureURL
      }
      type
      description
      users {
        nextToken
      }
      createdAt
      updatedAt
      pictureURL
      receipts {
        nextToken
      }
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
      pictureURL
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
        pictureURL
      }
      type
      description
      users {
        nextToken
      }
      createdAt
      updatedAt
      pictureURL
      receipts {
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
      pictureURL
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
    pictureURL
    receipts {
      items {
        id
        name
        description
        totalAmount
        createdAt
        updatedAt
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
      pictureURL
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
    pictureURL
    receipts {
      items {
        id
        name
        description
        totalAmount
        createdAt
        updatedAt
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
      pictureURL
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
    pictureURL
    receipts {
      items {
        id
        name
        description
        totalAmount
        createdAt
        updatedAt
      }
      nextToken
    }
  }
}
`;
export const onCreateReceipt = `subscription OnCreateReceipt {
  onCreateReceipt {
    id
    name
    description
    totalAmount
    createdAt
    updatedAt
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
        pictureURL
      }
      type
      description
      users {
        nextToken
      }
      createdAt
      updatedAt
      pictureURL
      receipts {
        nextToken
      }
    }
  }
}
`;
export const onUpdateReceipt = `subscription OnUpdateReceipt {
  onUpdateReceipt {
    id
    name
    description
    totalAmount
    createdAt
    updatedAt
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
        pictureURL
      }
      type
      description
      users {
        nextToken
      }
      createdAt
      updatedAt
      pictureURL
      receipts {
        nextToken
      }
    }
  }
}
`;
export const onDeleteReceipt = `subscription OnDeleteReceipt {
  onDeleteReceipt {
    id
    name
    description
    totalAmount
    createdAt
    updatedAt
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
        pictureURL
      }
      type
      description
      users {
        nextToken
      }
      createdAt
      updatedAt
      pictureURL
      receipts {
        nextToken
      }
    }
  }
}
`;
