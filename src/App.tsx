import "./App.css";
import Home from "./views/home/Home";
import Menu from "./views/menu/Menu";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Stage from "./views/stage/pages/Stage";
import { tutorialSet } from "./data/tutorial";

function App() {
  return (
    <div className="size-full">
      <body className="size-full min-w-max min-h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Menu" element={<Menu />} />
            <Route
              path="/tutorial"
              element={
                <Stage
                  tutorial
                  mapName="Tutorial"
                  enemies={tutorialSet.enemies}
                  players={tutorialSet.players}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </body>
    </div>
  );
}

export default App;
