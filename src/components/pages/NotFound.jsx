// NotFound.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div>
      <h1>Redirecting...</h1>
      {/* <p>Oops! The page you're looking for doesn't exist.</p> */}
      {/* Add more content, links, or styling as needed */}
    </div>
  );
}

export default NotFound;
