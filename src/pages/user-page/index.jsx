import React, { useEffect, useState } from 'react';
import Tab from '@material-ui/core/Tab';
import { DataGrid } from '@material-ui/data-grid';
import AppBar from '@material-ui/core/AppBar';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from 'react-router-dom';
import { columns } from './config';
import Layout from '../../components/layout';
import { useStyles } from './styled';
import { getToken } from '../../redux/selectors/selector';
import { NEW_FANFIC_PAGE_ROUTE } from '../../constant/routs';

const UserPage = () => {
  const classes = useStyles();
  const [value, setValue] = useState('my-fanfics');
  const token = useSelector(getToken);
  const [fanfics, setFanfics] = useState([]);
  const [selectedFanficIDs, setSelectedFanficIDs] = useState([]);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/users/fanfics`,
      { headers: { Authorization: token } }).then((response) => {
      setFanfics(response.data.map((fanfic) => {
        // eslint-disable-next-line no-underscore-dangle
        fanfic.id = fanfic._id;

        return fanfic;
      }));
    }).catch((error) => {
      if (error.response?.status === 403) {
        console.log(error);
      }
      console.log(error);
    });
  }, []);

  const deleteFanfics = () => {
    axios.delete(`${process.env.REACT_APP_API_BASE}/fanfics`,
      { headers: { Authorization: token }, data: selectedFanficIDs })
      .then((response) => {
        // eslint-disable-next-line no-underscore-dangle
        setFanfics(fanfics.filter((f) => !selectedFanficIDs.includes(f._id)));
      }).catch((error) => {
        console.error(error);
        if (error.response?.status === 403) {
          console.error(error);
        }
      });
  };

  const onSelect = (e) => {
    setSelectedFanficIDs(e.selectionModel);
  };

  const addFanfic = () => {
    history.push(NEW_FANFIC_PAGE_ROUTE);
  };

  return (
    <Layout>
      <div className={classes.root}>
        <TabContext value={value}>
          <AppBar position="static">
            <TabList aria-label="simple tabs example" onChange={handleChange}>
              <Tab label="Мои фанфики" value="my-fanfics" />
              <Tab label="Закладки" value="bookmarks" />
            </TabList>
          </AppBar>
          <TabPanel value="my-fanfics">
            <div className={classes.table}>
              <ButtonGroup aria-label="outlined primary button group" color="primary">
                <Button onClick={addFanfic}>Добавить </Button>
                <Button>Редактировать</Button>
                <Button onClick={deleteFanfics}>Удалить</Button>
              </ButtonGroup>
              <DataGrid
                checkboxSelection
                columns={columns}
                onSelectionModelChange={onSelect}
                pageSize={5}
                rows={fanfics}
              />
            </div>
          </TabPanel>
          <TabPanel value="bookmarks">Закладки</TabPanel>
        </TabContext>
      </div>
    </Layout>
  );
};

export default UserPage;
