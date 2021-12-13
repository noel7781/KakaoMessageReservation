import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const BootstrapButton = styled(Button)({
  padding: ".3em .8em",
  border: "1px solid #446d88",
  background: "#58a linear-gradient(#77a0bb, #58a)",
  borderRadius: ".2em",
  boxShadow: "0 .05em .05em #335166",
  color: "white",
  textShadow: "0 -.05em .05em #335166",
  fontsize: "125%",
  lineHeight: "1.5",
});

export default BootstrapButton;
