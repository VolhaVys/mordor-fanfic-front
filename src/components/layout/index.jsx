import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { useStyles } from './styled';
import RenderUser from './render-user';
import { DASHBOARD_ROUTE } from '../../constant/routs';

const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const toDashboard = () => {
    history.push(DASHBOARD_ROUTE);
  };

  return (
    <Grid>
      <AppBar className={classes.grow} position="static">
        <Toolbar>
          <IconButton aria-label="menu" className={classes.menuButton} color="inherit" edge="start" onClick={toDashboard}>
            <HomeIcon />
          </IconButton>
          <Typography className={classes.title} noWrap onClick={toDashboard} variant="h6">
            Мордор — техногенная цивилизация, опороченная победителями
          </Typography>
          <div className={classes.grow} />
          <RenderUser />
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        {children}
      </main>
    </Grid>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
