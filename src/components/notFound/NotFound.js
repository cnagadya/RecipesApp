import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "antd";
const NotFound = () => (
  <div>
    <Icon type="meh" theme="outlined" style={{ fontSize: "5em" }} />
    <br />
    The page you are trying to access is not available.
    <p>
      Go back <Link to="/recipes">home</Link>
    </p>
  </div>
);
export default NotFound;
