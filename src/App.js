import { useState, useEffect, createContext } from "react";
import { CreateTask } from "./components/CreateTask";
import { ListTasks } from "./components/ListTasks";
import { Toaster } from "react-hot-toast";
import { ToggelTheme } from "./components/ToggelTheme";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const ThemeContext = createContext();

const light = "rgb(241 245 249)";
const dark = "rgb(30 41 59)";
function App() {
  const [theme, setTheme] = useState(false);

  const toggelTheme = () => {
    setTheme((prevMode) => !prevMode);
  };

  useEffect(() => {
    document.body.style.backgroundColor = theme ? dark : light;
  }, [theme]); // run the effect when the theme changes

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <ThemeContext.Provider value={{ theme, toggelTheme }}>
        <ToggelTheme />
        <div className="flex flex-col items-center p-3 pt-20 gap-16">
          <CreateTask />
          <ListTasks />
        </div>
      </ThemeContext.Provider>
    </DndProvider>
  );
}

export default App;
