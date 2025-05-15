import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div>Home</div>

      <Link to="/user-manage">
        <button className="bg-green-300 px-3 py-1"> user list </button>
      </Link>
    </>
  );
}

export default Home;
