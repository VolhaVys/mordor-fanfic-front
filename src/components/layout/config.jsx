import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { MenuItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { SIGN_IN_ROUTE } from '../../constant/routs';
import { getToken, getUserData } from '../../redux/selectors/selector';
import { logoutAction } from '../../redux/actionCreators/actions';

const RenderUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onLogout = () => {
    dispatch(logoutAction());
    // history.go(0);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const login = () => {
    history.push(SIGN_IN_ROUTE);
  };

  if (useSelector(getToken)) {
    return (
      <Toolbar>
        <div>{useSelector(getUserData).firstName}</div>
        <IconButton
          aria-controls="menu-appbar"
          aria-haspopup="true"
          aria-label="account of current user"
          color="inherit"
          onClick={handleMenu}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id="menu-appbar"
          keepMounted
          onClose={handleClose}
          open={!!anchorEl}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    );
  }

  return <Button color="secondary" onClick={login}>Login</Button>;
};

export default RenderUser;
