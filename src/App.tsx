import "./App.css";
import { monsters } from "./data/enemies";
import { UserTeams } from "./data/user/team";
import Home from "./views/pages/Home";
import Menu from "./views/pages/Menu";
import Stage from "./views/stage/Stage";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="size-full">
      {/* <Stage
        mapName="Map Mk-1"
        players={UserTeams[0].entities}
        enemies={monsters}
      ></Stage> */}
      <body  className="size-full min-w-max min-h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Menu" element={<Menu />}/>
          </Routes>
        </BrowserRouter>
      </body>
    </div>
  );
}

export default App;
