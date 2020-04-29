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
export const onCreateExpensesCalculation = `subscription OnCreateExpensesCalculation {
  onCreateExpensesCalculation {
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
export const onUpdateExpensesCalculation = `subscription OnUpdateExpensesCalculation {
  onUpdateExpensesCalculation {
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
export const onDeleteExpensesCalculation = `subscription OnDeleteExpensesCalculation {
  onDeleteExpensesCalculation {
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
export const onCreateTask = `subscription OnCreateTask {
  onCreateTask {
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
export const onUpdateTask = `subscription OnUpdateTask {
  onUpdateTask {
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
export const onDeleteTask = `subscription OnDeleteTask {
  onDeleteTask {
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
export const onCreateCalendarEvent = `subscription OnCreateCalendarEvent {
  onCreateCalendarEvent {
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
export const onUpdateCalendarEvent = `subscription OnUpdateCalendarEvent {
  onUpdateCalendarEvent {
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
export const onDeleteCalendarEvent = `subscription OnDeleteCalendarEvent {
  onDeleteCalendarEvent {
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
