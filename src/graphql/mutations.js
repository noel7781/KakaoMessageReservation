/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createMsg = /* GraphQL */ `
  mutation CreateMsg(
    $input: CreateMsgInput!
    $condition: ModelMsgConditionInput
  ) {
    createMsg(input: $input, condition: $condition) {
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
export const updateMsg = /* GraphQL */ `
  mutation UpdateMsg(
    $input: UpdateMsgInput!
    $condition: ModelMsgConditionInput
  ) {
    updateMsg(input: $input, condition: $condition) {
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
export const deleteMsg = /* GraphQL */ `
  mutation DeleteMsg(
    $input: DeleteMsgInput!
    $condition: ModelMsgConditionInput
  ) {
    deleteMsg(input: $input, condition: $condition) {
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
