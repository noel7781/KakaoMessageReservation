import "./App.css";
import MsgApp from "./msg_app";
import BackImage from "./StyledComponent";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BackImage>
          <MsgApp />
        </BackImage>
      </header>
    </div>
  );
}
export default App;
