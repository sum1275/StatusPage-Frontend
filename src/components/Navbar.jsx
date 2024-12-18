import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();

  // After login, navigate to the desired route (if authenticated)
  useEffect(() => {
    if (isAuthenticated) {
      console.log('user nvabar: ',user)

      navigate('/status', { replace: true }); // Use `replace` to avoid keeping the current URL in history
    }
  }, [isAuthenticated, navigate, user]); // Trigger this when `isAuthenticated` changes

  const handleLogin = async () => {
    try {
      await loginWithRedirect({
        appState: { returnTo: "status" }, // Relative path for redirect after login
      });
    } catch (error) {
      console.error("Login failed", error);
      alert("Failed to log in. Please try again.");
    }
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin }); // Logout and return to the homepage
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-white">
            <img src="/vite.svg" alt="Logo" className="h-8" />
          </a>
        </div>
        <ul className="flex space-x-4">
          {!isAuthenticated ? (
            <li>
              <button
                onClick={handleLogin}
                className="text-white hover:text-gray-400"
              >
                Log in
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-400"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;