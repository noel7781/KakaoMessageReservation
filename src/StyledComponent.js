import styled from "styled-components";

const BackImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: "cookie";
  border: 10px solid hsla(0, 0%, 100%, 0.5);
  //background: repeating-linear-gradient(30deg, #79b, #79b  15x, #58a 0, #58a 30px);
  background: #f2e36d;
  background-clip: cover;
`;
export const FirstDisplay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: "cookie";
  border: 10px solid hsla(0, 0%, 100%, 0.5);
  //background: repeating-linear-gradient(30deg, #79b, #79b  15x, #58a 0, #58a 30px);
  background: white;
  background-clip: cover;
`;

export default BackImage;
