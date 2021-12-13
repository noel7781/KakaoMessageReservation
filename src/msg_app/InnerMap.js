import MsgShowComponent from "./MsgShowComponent";

import { Divider, Stack } from "@mui/material";

let InnerMap = ({
  historyItem,
  value,
  historyIndex,
  edited,
  clickedIndex,
  onClickEditButton,
  onClickSubmitButton,
  handleRemoveHistory,
  TabPanel,
  newText,
  modifyIcon,
}) => {
  let nextMessages = historyItem.messages.sort((m1, m2) =>
    m1.time < m2.time ? -1 : 1
  );

  return nextMessages.map((messageItem, messageIndex) => (
    <Stack>
      <TabPanel
        value={value}
        index={historyIndex}
        key={historyIndex + "," + messageIndex}
      >
        <MsgShowComponent
          messageItem={messageItem}
          edited={edited}
          clickedIndex={clickedIndex}
          historyIndex={historyIndex}
          messageIndex={messageIndex}
          onClickEditButton={onClickEditButton}
          onClickSubmitButton={onClickSubmitButton}
          handleRemoveHistory={handleRemoveHistory}
          newText={newText}
          modifyIcon={modifyIcon}
        />
      </TabPanel>
      <Divider />
    </Stack>
  ));
};

export default InnerMap;
