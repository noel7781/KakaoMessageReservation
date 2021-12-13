import InnerMap from "./InnerMap";
import { Stack } from "@mui/material";

import { Paper } from "@mui/material";
let OuterMap = ({
  selectedHistory,
  TabPanel,
  value,
  edited,
  clickedIndex,
  onClickEditButton,
  onClickSubmitButton,
  handleRemoveHistory,
  onChangeEditInput,
  newText,
  modifyIcon,
}) => {
  return (
    <Paper
      style={{ height: 450, overflow: "auto" }}
      sx={{
        width: 1000,
        flexGrow: 1,
        overflow: "hidden",
        px: 3,
        backgroundColor: "#A2E9FF",
      }}
    >
      {selectedHistory.map((historyItem, historyIndex) => (
        <Stack key={historyIndex}>
          <InnerMap
            value={value}
            historyItem={historyItem}
            edited={edited}
            historyIndex={historyIndex}
            clickedIndex={clickedIndex}
            onClickEditButton={onClickEditButton}
            onClickSubmitButton={onClickSubmitButton}
            handleRemoveHistory={handleRemoveHistory}
            TabPanel={TabPanel}
            newText={newText}
            modifyIcon={modifyIcon}
          />
        </Stack>
      ))}
    </Paper>
  );
};

export default OuterMap;
