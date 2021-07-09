import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/layout';
import { getToken } from '../../redux/selectors/selector';

const HomePage = () => {
  const [fanfics, setFanfics] = useState([]);
  const token = useSelector(getToken);

  return (
    <Layout>
      <div>Home page</div>
    </Layout>
  );
};

export default HomePage;
