import { Divider, Paper, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

let KakaoFriends = ({
  friend_lists,
  handleCheckbox,
  handleChangevalue,
  keyword,
}) => {
  const friendlistFilter = (friend_lists) => {
    friend_lists.sort();
    friend_lists = friend_lists.filter((friend) => {
      return friend.profile_nickname.indexOf(keyword) > -1;
    });

    return (
      <FormGroup>
        <Stack
          spacing={1}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          {friend_lists.map((friend, index) => (
            <Stack
              container="true"
              direction="row"
              spacing={5}
              alignItems="center"
              // justifyContent="center"
              style={{ minHeight: "3vh" }}
              key={index + "stack"}
            >
              <FormControlLabel
                checked={friend.checked}
                control={<Checkbox onClick={handleCheckbox} />}
                label={
                  <div style={{ marginLeft: "100px" }}>
                    {friend.profile_nickname}
                  </div>
                }
                key={index}
                value={index}
              />
              <img
                src={
                  friend.profile_thumbnail_image === ""
                    ? "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg"
                    : friend.profile_thumbnail_image
                }
                alt=""
                key={index + "img"}
                className="profile-img"
                width="60px"
                height="auto"
                style={{ marginLeft: "100px" }}
              />
            </Stack>
          ))}
        </Stack>
      </FormGroup>
    );
  };
  return (
    <Stack marginLeft="100px">
      <TextField
        sx={{ width: 400, backgroundColor: "white" }}
        id="friend_search_bar"
        //   value="메세지 입력창
        placeholder="search"
        onChange={handleChangevalue}
        value={keyword}
      />
      <Paper
        style={{ height: 800, overflow: "auto" }}
        sx={{
          width: 350,
          flexGrow: 1,
          overflow: "hidden",
          px: 3,
          backgroundColor: "#A2E9FF",
        }}
      >
        {friendlistFilter(friend_lists)}
      </Paper>
    </Stack>
  );
};

export default KakaoFriends;
