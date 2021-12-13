/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateMsg = /* GraphQL */ `
  subscription OnCreateMsg {
    onCreateMsg {
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
export const onUpdateMsg = /* GraphQL */ `
  subscription OnUpdateMsg {
    onUpdateMsg {
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
export const onDeleteMsg = /* GraphQL */ `
  subscription OnDeleteMsg {
    onDeleteMsg {
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
