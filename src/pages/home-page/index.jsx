import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Layout from '../../components/layout';
import FanficsGrid from '../../components/fanfics-grid';
import { getToken } from '../../redux/selectors/selector';

const HomePage = () => {
  const [fanfics, setFanfics] = useState([]);
  const token = useSelector(getToken);

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

  return (
    <Layout>
      <FanficsGrid fanfics={fanfics} />
    </Layout>
  );
};

export default HomePage;
