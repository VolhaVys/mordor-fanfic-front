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
import { Alert } from '@material-ui/lab';
import { useStyles } from './styled';
import { DEFAULT_ROUTE, SIGN_IN_ROUTE } from '../../constant/routs';
import { inputConfig } from './config';
import Input from '../../components/input';
import { loginAction } from '../../redux/actionCreators/actions';

const SignUp = () => {
  const classes = useStyles();
  const {
    control, handleSubmit, formState: { errors }, setError, clearErrors,
  } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    axios.post(`${process.env.REACT_APP_API_BASE}/registration`, data).then((response) => {
      dispatch(loginAction(response.data.token, response.data.user));
      history.push(DEFAULT_ROUTE);
    }).catch((e) => {
      setError('submit', {
        type: 'server',
        message: e.response?.data?.message ?? 'Сервер временно недоступен',
      });
    });
  };

  const clearSubmitErrors = () => {
    clearErrors('submit');
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
            Регистрация
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
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
                        error={!!errors[cfg.name]}
                        fullWidth
                        helperText={errors[cfg.name] && errors[cfg.name].type === 'pattern' && 'Неправильный формат'}
                        id={cfg.id}
                        label={cfg.label}
                        name={cfg.name}
                        onChange={onChange}
                        required
                        type={cfg.type ?? 'text'}
                        value={value}
                      />
                    )}
                    rules={cfg.rules ?? { required: true }}
                  />
                </Grid>
              ))}
            </Grid>
            {errors.submit && <Alert severity="error">{errors.submit.message}</Alert>}
            <Button
              className={classes.submit}
              color="primary"
              fullWidth
              onClick={clearSubmitErrors}
              type="submit"
              variant="contained"
            >
              Зарегистрироваться
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href={SIGN_IN_ROUTE} variant="body2">
                  Уже есть аккаунт? Войдите
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
