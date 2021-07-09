import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Fanfic from '../fanfic';
import { useStyles } from './styled';

const FanficsGrid = ({ fanfics }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={2}>
      {fanfics.map((fanfic) => (
        // eslint-disable-next-line no-underscore-dangle
        <Fanfic {...fanfic} key={fanfic._id} />
      ))}
    </Grid>
  );
};

FanficsGrid.propTypes = {
  fanfics: PropTypes.array.isRequired,
};

export default FanficsGrid;
