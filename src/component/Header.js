import React from "react";
import { BASE_URL } from "../api/baseURL";

function Header() {
  return (
    <div>
      <h1>{BASE_URL.organization}/{BASE_URL.repo}</h1>
    </div>
  );
}

export default Header;
