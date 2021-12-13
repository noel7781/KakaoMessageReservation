import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import BootstrapButton from "./Button";
import { Modal } from "@mui/material";

import OuterMap from "./OuterMap";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
let ReservationBox = ({
  history,
  checkedHistoryIndex,
  checkedMessageIndex,
  handleModifyHistory,
  handleModifySubmit,
  handleRemoveHistory,
  handleChangevalue,
  onClickReservedHistory,
  onClickCompleteHistory,
  onClickEditButton,
  onChangeEditInput,
  onClickSubmitButton,
  selectedHistory,
  edited,
  clickedIndex,
  newText,
  value,
  setValue,
  modifyIcon,
}) => {
  // const [clickedIndex, setClickedIndex] = useState("");
  // const [value, setValue] = useState(0);
  // const [msg, setMsg] = useState("");
  // const [selectedHistory, setSelectedHistory] = useState([]);
  // const [edited, setEdited] = useState(false);
  // const [newText, setNewText] = useState("");
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  // const editInputRef = useRef(null);
  // useEffect(() => {
  //   if (edited) {
  //     editInputRef.current.focus();
  //   }
  // }, [edited]);
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 10 }}>
            <Typography component={"div"}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  return (
    <div style={{ marginTop: 200 }}>
      <Stack direction="row">
        <BootstrapButton variant="contained" onClick={onClickReservedHistory}>
          예약
        </BootstrapButton>
        <BootstrapButton variant="contained" onClick={onClickCompleteHistory}>
          완료
        </BootstrapButton>
      </Stack>
      <Stack direction="row" sx={{ height: 700 }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={setValue}
          sx={{
            borderLeft: 2,
            borderRight: 2,
            borderBottom: 2,
            borderTop: 2,
            marginTop: 0.1,
            borderColor: "divider",
            width: "100px",
            backgroundColor: "white",
          }}
        >
          {selectedHistory.map((item, index) => (
            <Tab
              label={item.name}
              id={index}
              key={index}
              {...a11yProps(index)}
              sx={{
                borderBottom: 1,
                borderTop: 1,
                borderLeft: 1,
                borderRight: 1,
                marginTop: 0.1,
                borderColor: "gray",
                // backgroundColor: "white",
              }}
            />
          ))}
        </Tabs>
        <Stack>
          <OuterMap
            selectedHistory={selectedHistory}
            TabPanel={TabPanel}
            value={value}
            edited={edited}
            clickedIndex={clickedIndex}
            onClickEditButton={onClickEditButton}
            onClickSubmitButton={onClickSubmitButton}
            handleRemoveHistory={handleRemoveHistory}
            onChangeEditInput={onChangeEditInput}
            newText={newText}
            modifyIcon={modifyIcon}
          />
        </Stack>
        <Modal
          open={edited}
          onClose={onClickSubmitButton}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableBackdropClick
        >
          <Box sx={{ ...style, width: 900 }}>
            <Box>
              <TextField
                type="text"
                onChange={onChangeEditInput}
                multiline
                rows={4}
                sx={{
                  width: 800,
                  borderBlock: "t",
                  borderColor: "violet",
                }}
              />
              <Button
                variant="contained"
                sx={{ width: 100, height: 124, fontSize: 18 }}
                onClick={onClickSubmitButton}
              >
                수정
              </Button>
            </Box>
          </Box>
        </Modal>
      </Stack>
    </div>
  );
};

export default ReservationBox;
