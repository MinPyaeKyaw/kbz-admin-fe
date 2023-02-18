import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import { Toaster } from 'react-hot-toast';

import Create from "./pages/Create";
import Dashboard from "./pages/Dashboard";
import Update from "./pages/Update";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path={'/'} element={<Dashboard />} />
          <Route path={'/create'} element={<Create />} />
          <Route path={'/update/:id'} element={<Update />} />
        </Routes>
      </Router>

      <Toaster />
    </div>
  );
}

export default App;
