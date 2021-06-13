import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
import { DASHBOARD_ROUTE, SIGN_UP_ROUTE } from '../../constant/routs';
import Input from '../../components/input';
import { inputConfig } from './config';
import { loginAction } from '../../redux/actionCreators/actions';

const SignIn = () => {
  const classes = useStyles();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/login', data).then((response) => {
      dispatch(loginAction(response.data.token));
      history.push(DASHBOARD_ROUTE);
    }).catch((error) => {
      console.log(error);
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
                    value={value}
                  />
                )}
                rules={{ required: 'First name required' }}
              />
            ))}
            <FormControlLabel
              control={<Checkbox color="primary" value="remember" />}
              label="Remember me"
            />
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
