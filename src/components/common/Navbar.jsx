import * as React from 'react';
import { useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export const Navbar = () => {
  const history = useHistory();
  const handleMenuClose = () => {
    localStorage.removeItem("token");
    window.location.reload();
    history.push("/signin")
  };

  // const FullName = JSON.parse(localStorage.getItem("tovar"));
  // console.log(FullName.full_name);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Wrapper>
      <Toolbar>
          <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit"
      >
        <AccountCircle />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>
      </Toolbar>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: absolute;
  right: 0;
  display: block;
  span{
    font-size: 15px;
    margin-right: 4px;
  }
`;
