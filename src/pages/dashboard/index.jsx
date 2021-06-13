import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Grid from '@material-ui/core/Grid';
import getToken from '../../redux/selectors/selector';
import { columns } from './config';

const Dashboard = () => {
  const token = useSelector(getToken);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/user', { headers: { Authorization: token } }).then((response) => {
      setUsers(response.data.map((user) => {
        // eslint-disable-next-line no-underscore-dangle
        user.id = user._id;

        return user;
      }));
    }).catch((error) => {
      console.log(error);
    });
  }, []);
  const blockUsers = () => {
    console.log('blockUsers');
  };
  const onSelect = (e) => {
    console.log(e);
  };

  return (
    <Grid>
      <div>
        <Button onClick={blockUsers} variant="outlined">Block</Button>
        <IconButton aria-label="unblock">
          <LockOpenIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>

      <div style={{ height: 400 }}>
        <DataGrid checkboxSelection columns={columns} onSelectionModelChange={onSelect} pageSize={5} rows={users} />
      </div>
    </Grid>
  );
};

export default Dashboard;
