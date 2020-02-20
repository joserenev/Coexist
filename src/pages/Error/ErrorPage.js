// @flow

import React from "react";
import { Link } from "react-router-dom";

const errorImageLink = `https://freefrontend.com/assets/img/html-funny-404-pages/HTML-404-Error-Page.gif`;

function NotFoundPage(): React.Element<"div"> {
    return (
        <div>
            <img
                alt="Page Not Found!"
                src={errorImageLink}
                style={{
                    display: "block",
                    margin: "auto",
                    position: "relative",
                    height: "96vh",
                    width: "100vw"
                }}
            />
            <center>
                <Link to="/">Return to Home Page</Link>
            </center>
        </div>
    );
}
export default NotFoundPage;
