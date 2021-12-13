import React, { Component } from "react";
import { API } from "aws-amplify";
import MsgForm from "./MsgForm";
import ReservationBox from "./ReservationBox";
import KakaoFriends from "./KakaoFriends";

import { Button, Container, Stack } from "@mui/material";

import LoginButtonImage from "../kakao_login_btn.png";
import startImage from "../start.png";
import { getUser, listMsgs } from "../graphql/queries";
import {
  createUser,
  createMsg,
  updateMsg,
  deleteMsg,
} from "../graphql/mutations";

import { v4 as uuidv4 } from "uuid";

import BackImage from "../StyledComponent";

import moment from "moment";
import "moment-timezone";
import qs from "qs";
import axios from "axios";
moment.tz.setDefault("Asia/Seoul");

const JAVASCRIPT_KEY = "575e443e9c044c2c57b93ab72dc2dc3a";

const REST_KEY = "44601939644a29fa75e93f83cecb76d5";

const REDIRECT_URI = "http://localhost:3000/index.html";

class MsgApp extends Component {
  constructor() {
    super();
    this.state = JSON.parse(window.localStorage.getItem("state")) || {
      initialized: false,
      history: [],
      new_msg: "",
      loginResult: false,
      friend_lists: [],
      timeData: "",
      checkedHistoryIndex: -1,
      checkedMessageIndex: -1,
      userToken: "",
      userId: "",
      userName: "",
      keyword: "",
      selectedHistory: [],
      clickedIndex: "",
      edited: false,
      newText: "",
      value: 0,
      modifyIcon: false,
    };
  }
  // setState(state) {
  //   let nowState = JSON.parse(window.localStorage.getItem("state")) || {};
  //   nowState = { ...nowState, ...state };
  //   window.localStorage.setItem("state", JSON.stringify(nowState));
  //   super.setState(nowState);
  // }

  handleInitialize = async () => {
    let initialized =
      JSON.parse(window.localStorage.getItem("initState")) || false;
    if (!initialized) {
      this.setState({ initialized: true });
      window.localStorage.setItem("initState", JSON.stringify(true));
      await window.Kakao.Auth.authorize({
        redirectUri: `${REDIRECT_URI}`,
      });
    }
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    let { new_msg, friend_lists, timeData, userId, modifyIcon } = this.state;
    let history = [];
    let friend_infos = friend_lists.filter((item) => item.checked === true);
    for (let friend of friend_infos) {
      await API.graphql({
        query: createMsg,
        variables: {
          input: {
            msgID: uuidv4(),
            content: new_msg,
            recvId: String(friend.uuid),
            recvName: String(friend.profile_nickname),
            reserveTime: timeData,
            userMsgsId: userId,
            success: false,
          },
        },
      }).catch((err) => console.log(err));
    }
    let nextFriendLists = friend_lists.map((item) => {
      let newItem = { ...item, checked: false };
      return newItem;
    });
    API.graphql({
      query: listMsgs,
      variables: {
        filter: {
          userMsgsId: {
            eq: userId,
          },
        },
      },
    })
      .then((data) => {
        let newItems = data.data.listMsgs.items;
        for (let newItem of newItems) {
          let index = history.findIndex(
            (item) =>
              item.name === newItem.recvName && item.key === newItem.recvId
          );
          let newMessage = {
            message: newItem.content,
            checked: false,
            time: newItem.reserveTime,
            success: newItem.success,
            msgID: newItem.msgID,
          };
          if (index === -1) {
            let newHistory = {
              name: newItem.recvName,
              key: newItem.recvId,
              messages: [newMessage],
            };
            history.push(newHistory);
          } else {
            history[index].messages.push(newMessage);
          }
        }
      })
      .then(() =>
        this.setState(
          { friend_lists: nextFriendLists, keyword: "", history },
          () => {
            modifyIcon === true
              ? this.handleReservedHistory()
              : this.handleCompleteHistory();
          }
        )
      );
  };

  handleChangeMsgBox = (e) => {
    this.setState({ new_msg: e.target.value });
  };

  handleModifyHistory = (e) => {
    e.preventDefault();
    let { history, checkedHistoryIndex, checkedMessageIndex } = this.state;
    let nextHistory = history;
    let current_message =
      nextHistory[checkedHistoryIndex].messages[checkedMessageIndex];
    current_message.message = e.target.value;
    this.setState({ history: nextHistory });
  };

  handleRemoveHistory = async (e) => {
    let { selectedHistory } = this.state;
    let [nextHistoryIndex, nextMessageIndex] = e.currentTarget.id
      .split("-")
      .map((item) => Number(item));

    let selectedMessageID =
      selectedHistory[nextHistoryIndex].messages[nextMessageIndex].msgID;

    await API.graphql({
      query: deleteMsg,
      variables: { input: { msgID: selectedMessageID } },
    });

    let nextHistory = selectedHistory.map((historyItem, historyIndex) => {
      if (historyIndex === nextHistoryIndex) {
        let nextMessages = historyItem.messages;
        nextMessages = nextMessages.filter(
          (messageItem, messageIndex) => messageIndex !== nextMessageIndex
        );
        historyItem.messages = nextMessages;
      }
      return historyItem;
    });

    this.setState({ selectedHistory: nextHistory });
  };

  handleLogin = async (e) => {
    e.preventDefault();

    const scope = "profile_nickname, profile_image, friends, talk_message";
    const home = this;
    let loginResult = false;

    let { history } = this.state;

    let thumbnail_link = "";

    window.Kakao.Auth.login({
      scope,
      success: async function (response) {
        loginResult = true;
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function ({ kakao_account }) {
            const { profile, email } = kakao_account;
            thumbnail_link = profile.thumbnail_image_url;
            const name = profile.nickname;
            API.graphql({
              query: getUser,
              variables: {
                userID: email,
              },
            })
              .then(async (res) => {
                let user = res.data.getUser;
                if (user) {
                  home.setState({
                    loginResult,
                    userToken: user.accessToken,
                    userName: user.name,
                    userId: user.userID,
                  });
                  window.Kakao.Auth.setAccessToken(user.accessToken);
                  // console.log(`is set?: ${window.Kakao.Auth.getAccessToken()}`);
                  return user;
                } else {
                  // console.log("no user");

                  const authorizeCodeFromKakao =
                    window.location.search.split("=")[1];
                  if (authorizeCodeFromKakao === undefined) {
                    alert("Please Sign Up!");
                    return;
                  }
                  // console.log(
                  //   `authorizeCodeFromKakao : ${authorizeCodeFromKakao}`
                  // );

                  const body = {
                    grant_type: "authorization_code",
                    client_id: REST_KEY,
                    redirect_uri: `${REDIRECT_URI}`,
                    code: authorizeCodeFromKakao,
                    client_secret: "6t5nHUFxnOexm7XkGixULk7vvDxbB04G",
                  };
                  const url = "https://kauth.kakao.com/oauth/token";

                  const tokenConfig = {
                    method: "POST",
                    headers: {
                      "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8",
                    },
                    url,
                    data: qs.stringify(body),
                  };

                  let data = await axios(tokenConfig);
                  let {
                    access_token: axios_accessToken,
                    refresh_token: axios_refreshToken,
                  } = data.data;

                  // console.log("axios Access Token: ", axios_accessToken);
                  // console.log("axios Refresh Token: ", axios_refreshToken);
                  let user = API.graphql({
                    query: createUser,
                    variables: {
                      input: {
                        userID: email,
                        name: name,
                        accessToken: axios_accessToken,
                        refreshToken: axios_refreshToken,
                      },
                    },
                  }).then((res) => {
                    home.setState({
                      loginResult,
                      userToken: res.data.createUser.accessToken,
                      userName: res.data.createUser.name,
                      userId: res.data.createUser.userID,
                    });
                    window.Kakao.Auth.setAccessToken(
                      res.data.createUser.accessToken
                    );
                    // console.log(
                    //   `is set?: ${window.Kakao.Auth.getAccessToken()}`
                    // );
                    return res.data.createUser;
                  });
                  return user;
                }
              })
              .then(async (res) => {
                let data = await API.graphql({
                  query: listMsgs,
                  variables: {
                    filter: {
                      userMsgsId: {
                        eq: res.userID,
                      },
                    },
                  },
                });
                let pair = [res, data];
                return pair;
              })
              .then(([res, data]) => {
                let newItems = data.data.listMsgs.items;
                for (let newItem of newItems) {
                  let index = history.findIndex(
                    (item) =>
                      item.name === newItem.recvName &&
                      item.key === newItem.recvId
                  );
                  let newMessage = {
                    message: newItem.content,
                    checked: false,
                    time: newItem.reserveTime,
                    success: newItem.success,
                    msgID: newItem.msgID,
                  };
                  if (index === -1) {
                    let newHistory = {
                      name: newItem.recvName,
                      key: newItem.recvId,
                      messages: [newMessage],
                    };
                    history.push(newHistory);
                  } else {
                    history[index].messages.push(newMessage);
                  }
                }
                let { userName } = home.state;
                let nextFriendLists = [];
                let me = {
                  profile_nickname: userName,
                  allowed_msg: true,
                  checked: false,
                  favorite: false,
                  id: -1,
                  profile_thumbnail_image: thumbnail_link,
                  uuid: "-1",
                };
                nextFriendLists.push(me);

                window.Kakao.API.request({
                  url: "/v1/api/talk/friends",
                  success: (res) => {
                    let checked_attr_freinds_list = res.elements;
                    for (let n_friends of checked_attr_freinds_list) {
                      n_friends.checked = false;
                      nextFriendLists.push(n_friends);
                    }
                    home.setState({
                      history,
                      friend_lists: nextFriendLists,
                    });
                  },
                  fail: (err) => {
                    console.log("error", err);
                  },
                });
              })
              .catch((e) => console.log(e));
          },

          fail: function (error) {
            console.log(error);
          },
        });
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };

  handleGetTime = (e) => {
    let formatted_time = moment(e.date).format("YYYY-MM-DD hh:mm:ss");
    this.setState({ timeData: formatted_time });
  };

  handleCheckbox = (e) => {
    let { friend_lists } = this.state;
    let nextFriends = friend_lists.map((item, index) => {
      if (index === Number(e.target.value)) {
        item.checked = e.target.checked;
      }
      return item;
    });

    this.setState({ friend_lists: nextFriends });
  };

  handleChangevalue = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  };

  handleReservedHistory = () => {
    let { history } = this.state;
    let reservedHistory = history.map((item) => {
      let nextItem = { ...item };
      let nextMessages = nextItem.messages.filter(
        (msg) => msg.success === false
      );
      nextItem.messages = nextMessages;
      return nextItem;
    });
    this.setState({ selectedHistory: reservedHistory, modifyIcon: true });
  };

  handleCompleteHistory = () => {
    let { history } = this.state;
    let completeHistory = history.map((item) => {
      let nextItem = { ...item };
      let nextMessages = nextItem.messages.filter(
        (msg) => msg.success === true
      );
      nextItem.messages = nextMessages;
      return nextItem;
    });
    this.setState({ selectedHistory: completeHistory, modifyIcon: false });
  };

  onClickEditButton = (e) => {
    this.setState({ clickedIndex: e.currentTarget.id, edited: true });
  };
  onChangeEditInput = (e) => {
    this.setState({ newText: e.target.value });
  };

  onClickSubmitButton = async (e) => {
    let { selectedHistory, clickedIndex, newText } = this.state;

    let [nextHistoryIndex, nextMessageIndex] = clickedIndex
      .split("-")
      .map((item) => Number(item));

    let selectedMessageID =
      selectedHistory[nextHistoryIndex].messages[nextMessageIndex].msgID;

    await API.graphql({
      query: updateMsg,
      variables: { input: { msgID: selectedMessageID, content: newText } },
    });

    const newFriendList = selectedHistory.map((friend, friendIndex) => {
      let nextMessages = friend.messages.map((msg, msgIndex) => {
        return {
          ...msg,
          message:
            clickedIndex === String(friendIndex) + "-" + String(msgIndex)
              ? newText
              : msg.message,
        };
      });
      return {
        ...friend,
        messages: nextMessages,
      };
    });
    this.setState({
      selectedHistory: newFriendList,
      edited: false,
      newText: "",
    });
  };

  setValue = (e) => {
    let splitted = e.target.id.split("-");
    let index = Number(splitted[splitted.length - 1]);
    this.setState({ value: index });
  };

  render() {
    let {
      new_msg,
      history,
      loginResult,
      friend_lists,
      checkedHistoryIndex,
      checkedMessageIndex,
      keyword,
      selectedHistory,
      clickedIndex,
      edited,
      newText,
      value,
      modifyIcon,
    } = this.state;
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(JAVASCRIPT_KEY);
    }
    // console.log("index.js friendLists:", friend_lists);
    // console.log("history:", history);
    // console.log("userName: ", userName);
    // console.log("userId: ", userId);
    // console.log("User Token:", userToken);
    return (
      <div>
        {loginResult && (
          <BackImage>
            <Container sx={{ marginTop: 10 }}>
              <img src={startImage} alt="" height="130" width="1100" />
            </Container>
            <Stack
              direction="row"
              spacing={30}
              sx={{
                marginTop: 3,
                ml: 10,
              }}
            >
              <KakaoFriends
                friend_lists={friend_lists}
                handleCheckbox={this.handleCheckbox}
                handleChangevalue={this.handleChangevalue}
                keyword={keyword}
              />

              <Stack spacing={0}>
                <Container>
                  <MsgForm
                    handleSubmit={this.handleSubmit}
                    handleChangeMsgBox={this.handleChangeMsgBox}
                    history={history}
                    new_msg={new_msg}
                    handleGetTime={this.handleGetTime}
                  />
                </Container>
                <Container>
                  <ReservationBox
                    history={history}
                    checkedHistoryIndex={checkedHistoryIndex}
                    checkedMessageIndex={checkedMessageIndex}
                    handleModifyHistory={this.handleModifyHistory}
                    handleRemoveHistory={this.handleRemoveHistory}
                    handleChangevalue={this.handleChangevalue}
                    onClickReservedHistory={this.handleReservedHistory}
                    onClickCompleteHistory={this.handleCompleteHistory}
                    onClickEditButton={this.onClickEditButton}
                    onClickSubmitButton={this.onClickSubmitButton}
                    onChangeEditInput={this.onChangeEditInput}
                    selectedHistory={selectedHistory}
                    edited={edited}
                    clickedIndex={clickedIndex}
                    newText={newText}
                    value={value}
                    setValue={this.setValue}
                    modifyIcon={modifyIcon}
                  />
                </Container>
              </Stack>
            </Stack>
          </BackImage>
        )}
        {!loginResult && (
          <BackImage>
            <Stack
              sx={{
                marginTop: "400px",
              }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <img src={startImage} alt="" />
              <img
                id="login_btn"
                onClick={this.handleLogin}
                src={LoginButtonImage}
                alt=""
                style={{
                  marginTop: "100px",
                  height: "160px",
                  width: "500px",
                }}
              />
              <Button
                sx={{
                  width: "500px",
                  height: "160px",
                  fontSize: 30,
                  color: "black",
                  backgroundColor: "#fee402",
                  mt: 1,
                  borderRadius: "0.5em",
                }}
                variant="contained"
                onClick={this.handleInitialize}
              >
                회원가입
              </Button>
            </Stack>
          </BackImage>
        )}
      </div>
    );
  }
}

export default MsgApp;
