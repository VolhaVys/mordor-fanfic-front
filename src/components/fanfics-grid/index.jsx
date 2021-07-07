import React from 'react';
import PropTypes from 'prop-types';
import Fanfic from '../fanfic';

const FanficsGrid = ({ fanfics }) => (
  <div>
    {fanfics.map((fanfic) => (
      <Fanfic {...fanfic} />
    ))}
  </div>
);

FanficsGrid.propTypes = {
  fanfics: PropTypes.array.isRequired,
};

export default FanficsGrid;
