/* Amplify Params - DO NOT EDIT
	API_KAKAOTOKENREFRESH_GRAPHQLAPIENDPOINTOUTPUT
	API_KAKAOTOKENREFRESH_GRAPHQLAPIIDOUTPUT
	API_KAKAOTOKENREFRESH_GRAPHQLAPIKEYOUTPUT
	API_KAKAOTOKENREFRESH_MSGTABLE_ARN
	API_KAKAOTOKENREFRESH_MSGTABLE_NAME
	API_KAKAOTOKENREFRESH_USERTABLE_ARN
	API_KAKAOTOKENREFRESH_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const axios = require("axios");
AWS.config.update({ region: "ap-northeast-2" });
const docClient = new AWS.DynamoDB.DocumentClient();
const qs = require("qs");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

const params = {
  TableName: "Msg-xbu6zk5rejcerank326v64d4si-dev",
};

async function updateItem(msgID) {
  const updateParams = {
    TableName: "Msg-xbu6zk5rejcerank326v64d4si-dev",
    Key: {
      msgID: msgID,
    },
    UpdateExpression: "set #var1 = :x",
    ExpressionAttributeNames: {
      "#var1": "success",
    },
    ExpressionAttributeValues: {
      ":x": true,
    },
  };
  console.log("updateParams:", updateParams);
  docClient.update(updateParams, function (err, data) {
    if (err) {
      console.error(
        "Unable to update item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("success data:", data);
    }
  });
}
async function listItems() {
  try {
    const data = await docClient.scan(params).promise();
    return data;
  } catch (err) {
    return err;
  }
}
async function getSender(userMsgsId) {
  console.log("userMsgsId:", userMsgsId);
  const getUserDataParams = {
    TableName: "User-xbu6zk5rejcerank326v64d4si-dev",
    Key: { userID: userMsgsId },
  };
  return docClient.get(getUserDataParams).promise();
}

async function sendMessage(item) {
  const { msgID, content, userMsgsId, recvId, reserveTime, success } = item;
  const now = moment().format("YYYY-MM-DD hh:mm:ss");
  console.log("now:", now, " reserveTime:", reserveTime);
  if (moment(now).isSameOrAfter(moment(reserveTime)) && !success) {
    await getSender(userMsgsId).then(async (senderData) => {
      const { accessToken: ACCESS_TOKEN } = senderData.Item;
      let recv = [recvId];
      const url =
        recvId === "-1"
          ? "https://kapi.kakao.com/v2/api/talk/memo/default/send"
          : "https://kapi.kakao.com/v1/api/talk/friends/message/default/send";
      const data =
        recvId === "-1"
          ? {
              template_object: JSON.stringify({
                object_type: "text",
                text: content,
                link: {
                  web_url: "https://developers.kakao.com",
                  mobile_web_url: "https://developers.kakao.com",
                },
                button_title: "바로 확인",
              }),
            }
          : {
              receiver_uuids: JSON.stringify(recv),
              template_object: JSON.stringify({
                object_type: "text",
                text: content,
                link: {
                  web_url: "https://developers.kakao.com",
                  mobile_web_url: "https://developers.kakao.com",
                },
                button_title: "바로 확인",
              }),
            };
      console.log("data:", data);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        data: qs.stringify(data),
        url,
      };
      try {
        let res = await axios(options);
        console.log(res);
        res = updateItem(msgID);
        console.log(res);
        return res;
      } catch (e) {
        console.log(e);
      }
    });
  } else {
    return null;
  }
}

exports.handler = async (event, context) => {
  try {
    const data = await listItems();
    let items = data["Items"];
    for (let item of items) {
      await sendMessage(item);
    }
    const new_data = await listItems();
    return { body: JSON.stringify(new_data) };
  } catch (err) {
    return { error: err };
  }
};
