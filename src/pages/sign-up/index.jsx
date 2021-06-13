import React from 'react';
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
import { DASHBOARD_ROUTE, SIGN_IN_ROUTE } from '../../constant/routs';
import { inputConfig } from './config';
import Input from '../../components/input';
import { loginAction } from '../../redux/actionCreators/actions';

const SignUp = () => {
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/registration', data).then((response) => {
      dispatch(loginAction(response.data.token));
      history.push(DASHBOARD_ROUTE);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Container className={classes.container}>
      <Container
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {inputConfig.map((cfg) => (
                <Grid item key={cfg.id} sm={cfg.sm} xs={cfg.xs}>
                  <Controller
                    control={control}
                    defaultValue=""
                    name={cfg.name}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        autoComplete={cfg.autoComplete}
                        fullWidth
                        id={cfg.id}
                        label={cfg.label}
                        name={cfg.name}
                        onChange={onChange}
                        required
                        value={value}
                      />
                    )}
                    rules={{ required: 'First name required' }}
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              className={classes.submit}
              color="primary"
              fullWidth
              type="submit"
              variant="contained"
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href={SIGN_IN_ROUTE} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Container>
  );
};

export default SignUp;
