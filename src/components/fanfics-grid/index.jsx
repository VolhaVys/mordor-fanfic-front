import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Fanfic from '../fanfic';
import { useStyles } from './styled';

const FanficsGrid = ({ fanfics }) => {
  const classes = useStyles();
  const [gridFanfics, setGridFanfics] = useState(fanfics);

  useEffect(() => {
    setGridFanfics(fanfics);
  }, [fanfics]);

  const onFanficDelete = (id) => {
    // eslint-disable-next-line no-underscore-dangle
    setGridFanfics(gridFanfics.filter((f) => f._id !== id));
  };

  return (
    <Grid className={classes.root} container spacing={2}>
      {gridFanfics.map((fanfic) => (
        // eslint-disable-next-line no-underscore-dangle
        <Fanfic {...fanfic} key={fanfic._id} onDelete={onFanficDelete} />
      ))}
    </Grid>
  );
};

FanficsGrid.propTypes = {
  fanfics: PropTypes.array.isRequired,
};

export default FanficsGrid;
