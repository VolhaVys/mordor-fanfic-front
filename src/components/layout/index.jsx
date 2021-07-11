import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styled';
import RenderUser from './config';
import { DASHBOARD_ROUTE } from '../../constant/routs';

const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const toDashboard = () => {
    history.push(DASHBOARD_ROUTE);
  };

  return (
    <Grid>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                placeholder="Search…"
              />
            </div>
            <Typography className={classes.title} noWrap onClick={toDashboard} variant="h6">
              Мордор — техногенная цивилизация, опороченная победителями
            </Typography>
            <div className={classes.grow} />
            <RenderUser />
          </Toolbar>
        </AppBar>
      </div>
      {children}
    </Grid>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
