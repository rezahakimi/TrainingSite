import { Outlet } from "react-router-dom";
import { useEffect } from "react";


function App() {
  useEffect(() => {
    document.title = "React Toturial";
  }, []);
  return (
    <>
        
        <Outlet />
        </>
  );
}

export default App;
