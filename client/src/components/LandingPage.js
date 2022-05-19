import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <div>
        <h1>Rick and Morty App</h1>
        <Link to='/home'>
          <button>enter</button>
        </Link>
      </div>
    </div>
  )
}