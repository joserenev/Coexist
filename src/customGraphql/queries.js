export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    email
    name
    phone
    createdAt
    updatedAt
    heartbeat
    lastPageLoad
    pictureURL
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
            heartbeat
            lastPageLoad
            pictureURL
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
                pictureURL
                lastPageLoad
                heartbeat
		  }
      }
    }
    createdAt
    updatedAt
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
        heartbeat
        lastPageLoad
      }
      name
      description
      memberSplit
      totalAmount
      createdAt
      updatedAt
      approvalStatus
      approvedDate
      approverList
      group {
        id
        name
        type
        description
        createdAt
        updatedAt
        pictureURL
        users {
          items {
            user {
              id
              name
              username
              pictureURL
              heartbeat
              lastPageLoad
            }
          }
        }
      }
      receiptImageUrl
    }
  }
}
`;
