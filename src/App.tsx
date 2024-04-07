import "./App.css";
import Home from "./views/home/Home";
import Menu from "./views/menu/Menu";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="size-full">
      {/* <Stage
        mapName="Map Mk-1"
        players={UserTeams[0].entities}
        enemies={monsters}
      ></Stage> */}
      <body className="size-full min-w-max min-h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Menu" element={<Menu />} />
          </Routes>
        </BrowserRouter>
      </body>
    </div>
  );
}

export default App;
