import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";
import MyList from "./MyList";

export default function Navbar({ cartLength }) {
  const [List, setList] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();
  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  const currentPath = location.pathname;
  return (
    <nav className="navbarL">
      <div class="button-container">
        <Link
          to="/"
          className={currentPath === "/" ? "active-link" : "Link"}
          onClick={() => handleSetActiveLink("/")}
        >
          <svg
            class="icon"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
          </svg>
          <p>Home</p>
        </Link>

        <Link
          to="/Contact"
          className={
            currentPath === "/Contact" ? "msg active-link" : "Link msg"
          }
          onClick={() => handleSetActiveLink("/Contact")}
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <defs></defs>{" "}
              <g id="ic-contact-message">
                {" "}
                <path
                  style={{
                    fill: "none",
                    stroke: "#ffffff",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "1.5px",
                  }}
                  class="cls-1"
                  d="M19.89,3.25H4.11a2,2,0,0,0-2,2v9.06a2,2,0,0,0,2,2H5.75l2.31,4a.85.85,0,0,0,1.48,0l2.32-4h8a2,2,0,0,0,2-2V5.25A2,2,0,0,0,19.89,3.25Z"
                ></path>{" "}
                <line
                  class="cls-1"
                  x1="5.01"
                  y1="7.86"
                  x2="11.01"
                  y2="7.86"
                ></line>{" "}
                <line
                  class="cls-1"
                  x1="5.01"
                  y1="11.86"
                  x2="18.01"
                  y2="11.86"
                ></line>{" "}
              </g>{" "}
            </g>
          </svg>

          <p>Contact</p>
        </Link>

        <Link
          to="/AddProductForm"
          className={currentPath === "/AddProductForm" ? "active-link" : "Link"}
          onClick={() => handleSetActiveLink("/AddProductForm")}
        >
          <svg
            class="icon"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"></path>
          </svg>
          <p>Login</p>
        </Link>

        <Link
          to="./MyList"
          className={
            currentPath === "/MyList" ? "active-link cart" : "cart Link"
          }
          onClick={() => handleSetActiveLink("/MyList")}
        >
          <svg
            class="icon"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {cartLength > 0 && <h3>{cartLength}</h3>}
        </Link>
        {List && (
          <span>
            <button onClick={() => setList(false)}>X</button>
            <MyList />
          </span>
        )}
      </div>
    </nav>
  );
}
