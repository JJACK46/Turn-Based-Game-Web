import "./App.css";
import { monsters } from "./data/enemies";
import { UserTeams } from "./data/user/team";
import Stage from "./views/stage/Stage";
// import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="w-full ">
      <Stage
        mapName="Map Mk-1"
        players={UserTeams[0].entities}
        enemies={monsters}
      ></Stage>
    </div>
  );
}

export default App;
