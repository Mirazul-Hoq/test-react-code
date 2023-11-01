import { Routes, Route } from "react-router-dom";
import Problem1 from "./components/Problem-1.jsx";
import Menu from "./components/Menu.jsx";
import Problem2 from "./components/Problem-2.jsx";
import Index from "./components/Index.jsx";
import AllContact from "./components/Contacts/AllContact.jsx";
import UsContact from "./components/Contacts/UsContact.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/" element={<Menu />}>
          <Route path="problem-1" element={<Problem1 />} />
          <Route path="problem-2" element={<Problem2 />} />
          <Route path="problem-2/contact-list" element={<AllContact />} />
          <Route path="problem-2/uscontact-list" element={<UsContact />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
