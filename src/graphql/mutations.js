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
    tasks {
      items {
        id
        name
        description
        createdAt
        updatedAt
        dueDate
        status
        isImportant
        notifStatus
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
    tasks {
      items {
        id
        name
        description
        createdAt
        updatedAt
        dueDate
        status
        isImportant
        notifStatus
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
    tasks {
      items {
        id
        name
        description
        createdAt
        updatedAt
        dueDate
        status
        isImportant
        notifStatus
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
      tasks {
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
      groupCalculations {
        nextToken
      }
      tasks {
        nextToken
      }
      events {
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
      tasks {
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
      groupCalculations {
        nextToken
      }
      tasks {
        nextToken
      }
      events {
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
      tasks {
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
      groupCalculations {
        nextToken
      }
      tasks {
        nextToken
      }
      events {
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
      tasks {
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
        totalOwed
      }
      nextToken
    }
    tasks {
      items {
        id
        name
        description
        createdAt
        updatedAt
        dueDate
        status
        isImportant
        notifStatus
      }
      nextToken
    }
    events {
      items {
        id
        name
        description
        location
        createdAt
        updatedAt
        startTimestamp
        endTimestamp
        status
        memberResponses
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
      tasks {
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
        totalOwed
      }
      nextToken
    }
    tasks {
      items {
        id
        name
        description
        createdAt
        updatedAt
        dueDate
        status
        isImportant
        notifStatus
      }
      nextToken
    }
    events {
      items {
        id
        name
        description
        location
        createdAt
        updatedAt
        startTimestamp
        endTimestamp
        status
        memberResponses
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
      tasks {
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
        totalOwed
      }
      nextToken
    }
    tasks {
      items {
        id
        name
        description
        createdAt
        updatedAt
        dueDate
        status
        isImportant
        notifStatus
      }
      nextToken
    }
    events {
      items {
        id
        name
        description
        location
        createdAt
        updatedAt
        startTimestamp
        endTimestamp
        status
        memberResponses
      }
      nextToken
    }
  }
}
`;
export const createReceipt = `mutation CreateReceipt(
  $input: CreateReceiptInput!
  $condition: ModelReceiptConditionInput
) {
  createReceipt(input: $input, condition: $condition) {
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
      tasks {
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
      tasks {
        nextToken
      }
      events {
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
export const updateReceipt = `mutation UpdateReceipt(
  $input: UpdateReceiptInput!
  $condition: ModelReceiptConditionInput
) {
  updateReceipt(input: $input, condition: $condition) {
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
      tasks {
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
      tasks {
        nextToken
      }
      events {
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
export const deleteReceipt = `mutation DeleteReceipt(
  $input: DeleteReceiptInput!
  $condition: ModelReceiptConditionInput
) {
  deleteReceipt(input: $input, condition: $condition) {
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
      tasks {
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
      tasks {
        nextToken
      }
      events {
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
export const createExpensesCalculation = `mutation CreateExpensesCalculation(
  $input: CreateExpensesCalculationInput!
  $condition: ModelExpensesCalculationConditionInput
) {
  createExpensesCalculation(input: $input, condition: $condition) {
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
      tasks {
        nextToken
      }
      events {
        nextToken
      }
    }
    totalOwed
  }
}
`;
export const updateExpensesCalculation = `mutation UpdateExpensesCalculation(
  $input: UpdateExpensesCalculationInput!
  $condition: ModelExpensesCalculationConditionInput
) {
  updateExpensesCalculation(input: $input, condition: $condition) {
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
      tasks {
        nextToken
      }
      events {
        nextToken
      }
    }
    totalOwed
  }
}
`;
export const deleteExpensesCalculation = `mutation DeleteExpensesCalculation(
  $input: DeleteExpensesCalculationInput!
  $condition: ModelExpensesCalculationConditionInput
) {
  deleteExpensesCalculation(input: $input, condition: $condition) {
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
      tasks {
        nextToken
      }
      events {
        nextToken
      }
    }
    totalOwed
  }
}
`;
export const createTask = `mutation CreateTask(
  $input: CreateTaskInput!
  $condition: ModelTaskConditionInput
) {
  createTask(input: $input, condition: $condition) {
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
      tasks {
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
    assignedTo {
      id
      username
      email
      name
      phone
      groups {
        nextToken
      }
      tasks {
        nextToken
      }
      createdAt
      updatedAt
      pictureURL
      lastPageLoad
      heartbeat
    }
    createdAt
    updatedAt
    dueDate
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
      tasks {
        nextToken
      }
      events {
        nextToken
      }
    }
    status
    isImportant
    notifStatus
  }
}
`;
export const updateTask = `mutation UpdateTask(
  $input: UpdateTaskInput!
  $condition: ModelTaskConditionInput
) {
  updateTask(input: $input, condition: $condition) {
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
      tasks {
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
    assignedTo {
      id
      username
      email
      name
      phone
      groups {
        nextToken
      }
      tasks {
        nextToken
      }
      createdAt
      updatedAt
      pictureURL
      lastPageLoad
      heartbeat
    }
    createdAt
    updatedAt
    dueDate
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
      tasks {
        nextToken
      }
      events {
        nextToken
      }
    }
    status
    isImportant
    notifStatus
  }
}
`;
export const deleteTask = `mutation DeleteTask(
  $input: DeleteTaskInput!
  $condition: ModelTaskConditionInput
) {
  deleteTask(input: $input, condition: $condition) {
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
      tasks {
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
    assignedTo {
      id
      username
      email
      name
      phone
      groups {
        nextToken
      }
      tasks {
        nextToken
      }
      createdAt
      updatedAt
      pictureURL
      lastPageLoad
      heartbeat
    }
    createdAt
    updatedAt
    dueDate
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
      tasks {
        nextToken
      }
      events {
        nextToken
      }
    }
    status
    isImportant
    notifStatus
  }
}
`;
export const createCalendarEvent = `mutation CreateCalendarEvent(
  $input: CreateCalendarEventInput!
  $condition: ModelCalendarEventConditionInput
) {
  createCalendarEvent(input: $input, condition: $condition) {
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
      tasks {
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
    location
    createdAt
    updatedAt
    startTimestamp
    endTimestamp
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
      tasks {
        nextToken
      }
      events {
        nextToken
      }
    }
    status
    memberResponses
  }
}
`;
export const updateCalendarEvent = `mutation UpdateCalendarEvent(
  $input: UpdateCalendarEventInput!
  $condition: ModelCalendarEventConditionInput
) {
  updateCalendarEvent(input: $input, condition: $condition) {
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
      tasks {
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
    location
    createdAt
    updatedAt
    startTimestamp
    endTimestamp
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
      tasks {
        nextToken
      }
      events {
        nextToken
      }
    }
    status
    memberResponses
  }
}
`;
export const deleteCalendarEvent = `mutation DeleteCalendarEvent(
  $input: DeleteCalendarEventInput!
  $condition: ModelCalendarEventConditionInput
) {
  deleteCalendarEvent(input: $input, condition: $condition) {
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
      tasks {
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
    location
    createdAt
    updatedAt
    startTimestamp
    endTimestamp
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
      tasks {
        nextToken
      }
      events {
        nextToken
      }
    }
    status
    memberResponses
  }
}
`;
