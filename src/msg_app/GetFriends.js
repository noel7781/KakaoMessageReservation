import React, { Component } from "react";

class GetFriends extends Component {
  // 사용자 정보를 가져온다면 갱신한다.
  state = {
    age_range: 0,
    profile_image_url: "",
  };

  componentDidMount() {
    // login함수와 비슷하다. 사용자 정보를 가져오면 success콜백
    // window.Kakao.API.request({
    //   url: "/v2/user/me",
    //   success: function ({ kakao_account }) {
    //     const { age_range, profile } = kakao_account;
    //     console.log(kakao_account);
    //     console.log(age_range);
    //     console.log(`responsed img: ${profile.profile_image_url}`);
    //     // 수집한 사용자 정보로 페이지를 수정하기 위해 setState
    //     GetUser.setState({
    //       age_range,
    //       profile_image_url: profile.profile_image_url,
    //     });
    //   },
    //   fail: function (error) {
    //     console.log(error);
    //   },
    // });
    window.Kakao.API.request({
      url: "/v1/api/talk/friends",
      success: function (response) {
        console.log(response);
      },
      fail: function (error) {
        console.log(error);
      },
    });
  }

  render() {
    // const { age_range, profile_image_url } = this.state;

    return (
      <div>
        Team
        {/* <h1>{age_range ? age_range : ""}</h1>
        <img src={profile_image_url} alt="profile_img" title="img_title" /> */}
      </div>
    );
  }
}

export default GetFriends;
