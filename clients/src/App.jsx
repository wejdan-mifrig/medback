import { Route, Routes } from "react-router-dom";
import Register from "./componants/Auth/login.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" />

      <Routes>
        {/* <Route path="/" element={} */}
        <Route path="/" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
