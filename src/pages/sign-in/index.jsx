import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useStyles } from './styled';
import { HOME_PAGE_ROUTE, SIGN_UP_ROUTE } from '../../constant/routs';
import Input from '../../components/input';
import { inputConfig } from './config';
import { loginAction } from '../../redux/actionCreators/actions';

const SignIn = () => {
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const onSubmit = (data) => {
    axios.post(`${process.env.REACT_APP_API_BASE}/login`, data).then((response) => {
      dispatch(loginAction(response.data.token, response.data.user));
      history.push(HOME_PAGE_ROUTE);
    }).catch((e) => {
      setError(e.response?.data?.message ?? 'Server is temporarily unavailable');
    });
  };

  return (
    <Container className={classes.container}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            {inputConfig.map((cfg) => (
              <Controller
                control={control}
                defaultValue=""
                key={cfg.id}
                name={cfg.name}
                render={({ field: { onChange, value } }) => (
                  <Input
                    autoComplete={cfg.autoComplete}
                    autoFocus
                    fullWidth
                    id={cfg.id}
                    label={cfg.label}
                    margin="normal"
                    name={cfg.name}
                    onChange={onChange}
                    required
                    type={cfg.type ?? 'text'}
                    value={value}
                  />
                )}
                rules={{ required: 'First name required' }}
              />
            ))}
            <p style={{ color: 'red' }}>{error}</p>
            <Button
              className={classes.submit}
              color="primary"
              fullWidth
              type="submit"
              variant="contained"
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href={SIGN_UP_ROUTE} variant="body2">
                  Dont have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Container>
  );
};
export default SignIn;
