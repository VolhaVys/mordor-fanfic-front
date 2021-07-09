import React, { useEffect, useState } from 'react';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Layout from '../../components/layout';
import { useStyles } from './styled';
import { getToken } from '../../redux/selectors/selector';
import FanficsGrid from '../../components/fanfics-grid';
import { NEW_FANFIC_PAGE_ROUTE } from '../../constant/routs';

const UserPage = () => {
  const classes = useStyles();
  const [value, setValue] = useState('my-fanfics');
  const token = useSelector(getToken);
  const [fanfics, setFanfics] = useState([]);
  const [isFanficLoad, setFanficLoad] = useState(false);
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
      setFanficLoad(true);
    }).catch((error) => {
      if (error.response?.status === 403) {
        console.log(error);
      }
      console.log(error);
    });
  }, []);

  const createFanfic = () => {
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
            <Button className={classes.margin} color="primary" onClick={createFanfic} size="medium" variant="outlined">
              Создать фанфик
            </Button>
            {isFanficLoad && <FanficsGrid fanfics={fanfics} />}
          </TabPanel>
          <TabPanel value="bookmarks">Закладки</TabPanel>
        </TabContext>
      </div>
    </Layout>
  );
};

export default UserPage;
