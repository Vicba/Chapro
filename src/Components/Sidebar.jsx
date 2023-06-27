//components
import Avatar from "./Avatar";

import { useAuthContext } from "../hooks/useAuthContext";

//styles & images
import "./Sidebar.css";
import DashboardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";
import Friends from "../assets/friends.png";
import Settings from "../assets/settings.svg";
import NameLogo from "../assets/name-logo.png";

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";

export default function Sidebar() {
  const { user } = useAuthContext();

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <img src={NameLogo} alt="name-logo" className="logo" />
          <Avatar src={user.photoURL} />
        </div>

        <nav className="links">
          <ul>
            <li>
              <NavLink to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add project icon" />
                <span>New project</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/friends">
                <img src={Friends} alt="Friends" />
                <span>Friends</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings">
                <img src={Settings} alt="settings" className="settings-img" />
                <span>Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
