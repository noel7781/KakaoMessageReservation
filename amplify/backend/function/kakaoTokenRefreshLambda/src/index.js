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

const params = {
  TableName: "User-xbu6zk5rejcerank326v64d4si-dev",
};

async function listItems() {
  try {
    const data = await docClient.scan(params).promise();
    return data;
  } catch (err) {
    return err;
  }
}

async function RestCall(item) {
  const { refreshToken: refresh_token } = item;
  // console.log("Item:", item);
  // console.log("refreshToken:", refresh_token);
  const url = "https://kauth.kakao.com/oauth/token";
  const data = {
    grant_type: "refresh_token",
    client_id: "44601939644a29fa75e93f83cecb76d5",
    client_secret: "6t5nHUFxnOexm7XkGixULk7vvDxbB04G",
    refresh_token: refresh_token,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(data),
    url,
  };
  try {
    const res = await axios(options);
    return [refresh_token, res.data];
  } catch (e) {
    console.log(e);
  }
}

async function updateItem(item, token_info) {
  let prior_ref_token = token_info[0];
  let new_token = token_info[1];

  console.log("refr token:", prior_ref_token);
  console.log("new token:", new_token);
  const updateParams = {
    TableName: "User-xbu6zk5rejcerank326v64d4si-dev",
    Key: {
      userID: item.userID,
    },
    UpdateExpression: "set #var1 = :x, #var2 = :y",
    ExpressionAttributeNames: {
      "#var1": "accessToken",
      "#var2": "refreshToken",
    },
    ExpressionAttributeValues: {
      ":x": new_token.access_token,
      ":y": new_token.refresh_token || prior_ref_token,
    },
  };
  // console.log("updateParams:", updateParams);
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

exports.handler = async (event, context) => {
  try {
    const data = await listItems();
    let items = data["Items"];
    for (let item of items) {
      const new_token = await RestCall(item);
      await updateItem(item, new_token);
    }
    const new_data = await listItems();
    return { body: JSON.stringify(new_data) };
  } catch (err) {
    return { error: err };
  }
};
