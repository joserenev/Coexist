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
    lastPageLoad
    heartbeat
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
    lastPageLoad
    heartbeat
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
    lastPageLoad
    heartbeat
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
      lastPageLoad
      heartbeat
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
        lastPageLoad
        heartbeat
      }
      type
      description
      users {
        nextToken
      }
      lastReceiptCalculationTime
      createdAt
      updatedAt
      pictureURL
      totalBudget
      remainingBalance
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
      lastPageLoad
      heartbeat
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
        lastPageLoad
        heartbeat
      }
      type
      description
      users {
        nextToken
      }
      lastReceiptCalculationTime
      createdAt
      updatedAt
      pictureURL
      totalBudget
      remainingBalance
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
      lastPageLoad
      heartbeat
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
        lastPageLoad
        heartbeat
      }
      type
      description
      users {
        nextToken
      }
      lastReceiptCalculationTime
      createdAt
      updatedAt
      pictureURL
      totalBudget
      remainingBalance
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
      lastPageLoad
      heartbeat
    }
    type
    description
    users {
      items {
        id
      }
      nextToken
    }
    lastReceiptCalculationTime
    createdAt
    updatedAt
    pictureURL
    totalBudget
    remainingBalance
    receipts {
      items {
        id
        name
        description
        memberSplit
        totalAmount
        createdAt
        updatedAt
        receiptImageUrl
        isApproved
        approvedDate
        approverList
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
      lastPageLoad
      heartbeat
    }
    type
    description
    users {
      items {
        id
      }
      nextToken
    }
    lastReceiptCalculationTime
    createdAt
    updatedAt
    pictureURL
    totalBudget
    remainingBalance
    receipts {
      items {
        id
        name
        description
        memberSplit
        totalAmount
        createdAt
        updatedAt
        receiptImageUrl
        isApproved
        approvedDate
        approverList
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
      lastPageLoad
      heartbeat
    }
    type
    description
    users {
      items {
        id
      }
      nextToken
    }
    lastReceiptCalculationTime
    createdAt
    updatedAt
    pictureURL
    totalBudget
    remainingBalance
    receipts {
      items {
        id
        name
        description
        memberSplit
        totalAmount
        createdAt
        updatedAt
        receiptImageUrl
        isApproved
        approvedDate
        approverList
      }
      nextToken
    }
  }
}
`;
export const onCreateReceipt = `subscription OnCreateReceipt {
  onCreateReceipt {
    id
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
      lastPageLoad
      heartbeat
    }
    name
    description
    memberSplit
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
        lastPageLoad
        heartbeat
      }
      type
      description
      users {
        nextToken
      }
      lastReceiptCalculationTime
      createdAt
      updatedAt
      pictureURL
      totalBudget
      remainingBalance
      receipts {
        nextToken
      }
    }
    receiptImageUrl
    isApproved
    approvedDate
    approverList
  }
}
`;
export const onUpdateReceipt = `subscription OnUpdateReceipt {
  onUpdateReceipt {
    id
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
      lastPageLoad
      heartbeat
    }
    name
    description
    memberSplit
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
        lastPageLoad
        heartbeat
      }
      type
      description
      users {
        nextToken
      }
      lastReceiptCalculationTime
      createdAt
      updatedAt
      pictureURL
      totalBudget
      remainingBalance
      receipts {
        nextToken
      }
    }
    receiptImageUrl
    isApproved
    approvedDate
    approverList
  }
}
`;
export const onDeleteReceipt = `subscription OnDeleteReceipt {
  onDeleteReceipt {
    id
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
      lastPageLoad
      heartbeat
    }
    name
    description
    memberSplit
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
        lastPageLoad
        heartbeat
      }
      type
      description
      users {
        nextToken
      }
      lastReceiptCalculationTime
      createdAt
      updatedAt
      pictureURL
      totalBudget
      remainingBalance
      receipts {
        nextToken
      }
    }
    receiptImageUrl
    isApproved
    approvedDate
    approverList
  }
}
`;
