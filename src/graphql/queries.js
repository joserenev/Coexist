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
    pictureURL
    lastPageLoad
    heartbeat
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
      pictureURL
      lastPageLoad
      heartbeat
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
        approvalStatus
        approvedDate
        approverList
      }
      nextToken
    }
    groupCalculations {
      items {
        id
        cycleEndDate
        totalExpenditure
        expenseDivision
      }
      nextToken
    }
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
      groupCalculations {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getReceipt = `query GetReceipt($id: ID!) {
  getReceipt(id: $id) {
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
      groupCalculations {
        nextToken
      }
    }
    receiptImageUrl
    approvalStatus
    approvedDate
    approverList
  }
}
`;
export const listReceipts = `query ListReceipts(
  $filter: ModelReceiptFilterInput
  $limit: Int
  $nextToken: String
) {
  listReceipts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
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
      name
      description
      memberSplit
      totalAmount
      createdAt
      updatedAt
      group {
        id
        name
        type
        description
        lastReceiptCalculationTime
        createdAt
        updatedAt
        pictureURL
        totalBudget
        remainingBalance
      }
      receiptImageUrl
      approvalStatus
      approvedDate
      approverList
    }
    nextToken
  }
}
`;
export const getExpensesCalculation = `query GetExpensesCalculation($id: ID!) {
  getExpensesCalculation(id: $id) {
    id
    cycleEndDate
    totalExpenditure
    expenseDivision
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
      groupCalculations {
        nextToken
      }
    }
  }
}
`;
export const listExpensesCalculations = `query ListExpensesCalculations(
  $filter: ModelExpensesCalculationFilterInput
  $limit: Int
  $nextToken: String
) {
  listExpensesCalculations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      cycleEndDate
      totalExpenditure
      expenseDivision
      group {
        id
        name
        type
        description
        lastReceiptCalculationTime
        createdAt
        updatedAt
        pictureURL
        totalBudget
        remainingBalance
      }
    }
    nextToken
  }
}
`;
