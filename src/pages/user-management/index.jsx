import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import { getToken } from '../../redux/selectors/selector';
import { columns } from './config';
import { logoutAction } from '../../redux/actionCreators/actions';
import { SIGN_IN_ROUTE } from '../../constant/routs';
import { useStyles } from './styled';

const UserManagement = () => {
  const classes = useStyles();

  const token = useSelector(getToken);
  const [users, setUsers] = useState([]);
  const [selectedUserIDs, setSelectedUserIDs] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    dispatch(logoutAction());
    history.push(SIGN_IN_ROUTE);
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/users`, { headers: { Authorization: token } }).then((response) => {
      setUsers(response.data.map((user) => {
        // eslint-disable-next-line no-underscore-dangle
        user.id = user._id;

        return user;
      }));
    }).catch((error) => {
      if (error.response?.status === 403) {
        logout();
      }
      console.log(error);
    });
  }, []);

  const blockUsers = () => {
    axios.put(`${process.env.REACT_APP_API_BASE}/users/block`,
      selectedUserIDs, { headers: { Authorization: token } })
      .then((response) => {
        // eslint-disable-next-line no-underscore-dangle
        setUsers(response.data.map((user) => {
          // eslint-disable-next-line no-underscore-dangle
          user.id = user._id;

          return user;
        }));
      }).catch((error) => {
        console.error(error);
        if (error.response?.status === 403) {
          logout();
        }
      });
  };

  const deleteUsers = () => {
    axios.delete(`${process.env.REACT_APP_API_BASE}/users`,
      { headers: { Authorization: token }, data: selectedUserIDs })
      .then((response) => {
        // eslint-disable-next-line no-underscore-dangle
        setUsers(response.data.map((user) => {
          // eslint-disable-next-line no-underscore-dangle
          user.id = user._id;

          return user;
        }));
      }).catch((error) => {
        console.error(error);
        if (error.response?.status === 403) {
          logout();
        }
      });
  };

  const unBlockUsers = () => {
    axios.put(`${process.env.REACT_APP_API_BASE}/users/unblock`,
      selectedUserIDs, { headers: { Authorization: token } })
      .then((response) => {
        setUsers(response.data.map((user) => {
          // eslint-disable-next-line no-underscore-dangle
          user.id = user._id;

          return user;
        }));
      }).catch((error) => {
        if (error.response?.status === 403) {
          logout();
        }
        console.log(error);
      });
  };
  const onSelect = (e) => {
    setSelectedUserIDs(e.selectionModel);
  };

  return (
    <Grid>
      <div className={classes.btnPanel}>
        <div className={classes.toolbar}>
          <Button onClick={blockUsers} variant="outlined">Block</Button>
          <IconButton aria-label="unblock" onClick={unBlockUsers}>
            <LockOpenIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={deleteUsers}>
            <DeleteIcon />
          </IconButton>
        </div>
        <div className={classes.logout}>
          <Button onClick={logout} variant="outlined">Logout</Button>
        </div>
      </div>
      <div style={{ height: 400 }}>
        <DataGrid
          checkboxSelection
          columns={columns}
          onSelectionModelChange={onSelect}
          pageSize={5}
          rows={users}
        />
      </div>
    </Grid>
  );
};

export default UserManagement;
