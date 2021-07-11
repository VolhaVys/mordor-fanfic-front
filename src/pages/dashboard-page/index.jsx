import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useStyles } from './styled';
import Layout from '../../components/layout';
import FanficsGrid from '../../components/fanfics-grid';
import { getToken } from '../../redux/selectors/selector';

const limit = 9;

const DashboardPage = () => {
  const classes = useStyles();
  const [topFanfics, setTopFanfics] = useState([]);
  const [lastFanfics, setLastFanfics] = useState([]);
  const token = useSelector(getToken);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/fanfics/top/${limit}`,
      { headers: { Authorization: token } }).then((response) => {
      setTopFanfics(response.data.map((fanfic) => {
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

    axios.get(`${process.env.REACT_APP_API_BASE}/fanfics/last/${limit}`,
      { headers: { Authorization: token } }).then((response) => {
      setLastFanfics(response.data.map((fanfic) => {
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

  return (
    <Layout>
      <Typography className={classes.gridTitle} gutterBottom variant="h3">
        {`Топ-${limit}`}
      </Typography>
      <FanficsGrid fanfics={topFanfics} />
      <Typography className={classes.gridTitle} gutterBottom variant="h3">
        Недавно обновлённые
      </Typography>
      <FanficsGrid fanfics={lastFanfics} />
    </Layout>

  );
};

export default DashboardPage;
