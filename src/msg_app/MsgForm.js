import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import InsertInvitationRoundedIcon from "@mui/icons-material/InsertInvitationRounded";
import AirDatePickerCalendar from "./AirDatePicketCalendar";
import localeKr from "./datepicker.ko";

import BootstrapButton from "./Button";

let MsgForm = ({
  handleSubmit,
  handleChangeMsgBox,
  handleGetTime,
  new_msg,
}) => {
  let onSelect = (date) => {
    handleGetTime(date);
  };
  return (
    <div>
      <form id="msg_form" onSubmit={handleSubmit}>
        <Stack direction="row">
          <TextField
            sx={{ width: 1000, backgroundColor: "white" }}
            required
            id="outlined-required"
            // value="메세지 입력창"
            // value={text}
            // onChange={onChangeText}
            value={new_msg}
            onChange={handleChangeMsgBox}
          />
          <InsertInvitationRoundedIcon
            sx={{
              width: "54px",
              height: "54px",
              borderTop: 1,
              borderLeft: 1,
              borderBottom: 1,
              borderColor: "gray",
              color: "black",
            }}
          />
          <AirDatePickerCalendar
            timepicker={true}
            minutesStep={5}
            locale={localeKr}
            onSelect={onSelect}
          />
          <BootstrapButton variant="contained" onClick={handleSubmit}>
            등록
          </BootstrapButton>
        </Stack>
      </form>
    </div>
  );
};

export default MsgForm;
