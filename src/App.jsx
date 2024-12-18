import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Issue from "./components/pages/Issue";
import IssuePrivate from "./components/pages/IssuePrivate";
import ScheduledMaintenance from "./components/pages/ScheduledMaintenance";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Route for Issue */}
          <Route index element={<Issue />} />

          {/* Protected Route for status */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isLoading={isLoading}
              />
            }
          >
            <Route path="status" element={<IssuePrivate />} />
          </Route>

          <Route path="test" element={<ScheduledMaintenance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;