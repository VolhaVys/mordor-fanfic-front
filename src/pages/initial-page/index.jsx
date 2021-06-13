import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { useStyles } from './styled';
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '../../constant/routs';

const InitialPage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <CssBaseline />
      <Grid className={classes.container_heading}>
        <h1 className={classes.heading}>Welcome</h1>
        <Grid className={classes.container_button}>
          <Button className={classes.button} color="primary" href={SIGN_UP_ROUTE} size="medium" variant="contained">
            Create an account
          </Button>
          <Button className={classes.button} color="primary" href={SIGN_IN_ROUTE} size="medium" variant="outlined">
            Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InitialPage;
