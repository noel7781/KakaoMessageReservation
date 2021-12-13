/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($userID: ID!) {
    getUser(userID: $userID) {
      userID
      name
      accessToken
      refreshToken
      msgs {
        items {
          msgID
          recvId
          recvName
          content
          reserveTime
          success
          createdAt
          updatedAt
          userMsgsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $userID: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      userID: $userID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userID
        name
        accessToken
        refreshToken
        msgs {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMsg = /* GraphQL */ `
  query GetMsg($msgID: ID!) {
    getMsg(msgID: $msgID) {
      msgID
      recvId
      recvName
      sendId {
        userID
        name
        accessToken
        refreshToken
        msgs {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      reserveTime
      success
      createdAt
      updatedAt
      userMsgsId
    }
  }
`;
export const listMsgs = /* GraphQL */ `
  query ListMsgs(
    $msgID: ID
    $filter: ModelMsgFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMsgs(
      msgID: $msgID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        msgID
        recvId
        recvName
        sendId {
          userID
          name
          accessToken
          refreshToken
          createdAt
          updatedAt
        }
        content
        reserveTime
        success
        createdAt
        updatedAt
        userMsgsId
      }
      nextToken
    }
  }
`;
