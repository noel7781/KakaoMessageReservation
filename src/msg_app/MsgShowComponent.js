import Stack from "@mui/material/Stack";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import InsertInvitationRoundedIcon from "@mui/icons-material/InsertInvitationRounded";
import CheckIcon from "@mui/icons-material/Check";
import { Box } from "@mui/system";

let MsgShowComponent = ({
  edited,
  clickedIndex,
  historyIndex,
  messageIndex,
  onClickEditButton,
  onClickSubmitButton,
  onChangeEditInput,
  handleRemoveHistory,
  messageItem,
  newText,
  modifyIcon,
}) => {
  return (
    <Stack direction="row" spacing={50}>
      <Box
        sx={{
          display: "flex",

          width: 5,
          height: 5,
        }}
      >
        <Box
          sx={{
            marginRight: 2,
          }}
        >
          {!edited ||
          !(
            clickedIndex ===
            String(historyIndex) + "-" + String(messageIndex)
          ) ? (
            modifyIcon && (
              <ModeEditOutlineRoundedIcon
                onClick={onClickEditButton}
                id={String(historyIndex) + "-" + String(messageIndex)}
              />
            )
          ) : (
            <CheckIcon
              onClick={onClickSubmitButton}
              id={String(historyIndex) + "-" + String(messageIndex)}
            />
          )}
        </Box>
        <Box
          sx={{
            overflow: "auto",
            flex: "none",
            textAlign: "left",
            wordWrap: "break-word",
            wordBreak: "keep-all",
            width: 300,
            height: 100,
          }}
        >
          {messageItem.message}
        </Box>
        {/* {edited &&
        clickedIndex === String(historyIndex) + "-" + String(messageIndex) ? (
          <TextField
            type="text"
            // value={newText}
            // ref={editInputRef}
            // onChange={onChangeEditInput}
            // onChange={setText}
            // onChange={changeInput}
            key={String(historyIndex) + "-" + String(messageIndex)}
          />
        ) : (
          messageItem.message
        )} */}
      </Box>
      <Box
        sx={{
          display: "flex",
          width: 5,
          height: 5,
        }}
      >
        <Box
          sx={{
            marginRight: 2,
          }}
        >
          <InsertInvitationRoundedIcon />
        </Box>
        <Box
          sx={{
            flex: "none",
            textAlign: "left",
            width: 300,
            height: 100,
          }}
        >
          {messageItem.time}
        </Box>
      </Box>
      <Box>
        <DeleteForeverRoundedIcon
          onClick={handleRemoveHistory}
          id={String(historyIndex) + "-" + String(messageIndex)}
        />
      </Box>
    </Stack>
  );
};

export default MsgShowComponent;
/*
오류 두개. overflow : 속성 넣으면 갑자기 안보임.
{"문자열"} 이렇게 하면 정상적으로 가로표시가 되지만, {messageItem.time}하면 안됨.
*/
