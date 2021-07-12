import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { Alert, Autocomplete } from '@material-ui/lab';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  CircularProgress, FormControl, InputLabel, MenuItem, Select,
} from '@material-ui/core';
import { useStyles } from './styled';
import Layout from '../../components/layout';
import { getToken } from '../../redux/selectors/selector';
import { fandoms, inputs } from './config';
import Chapters from '../../components/chapters';
import { USER_PAGE_ROUTE } from '../../constant/routs';

const NewFanficPage = () => {
  const classes = useStyles();
  const {
    control, handleSubmit, formState: { errors }, setError, clearErrors,
  } = useForm();
  const token = useSelector(getToken);
  const history = useHistory();
  const { fanficId } = useParams();
  const [fanfic, setFanfic] = useState({});
  const [isFanficLoad, setFanficLoad] = useState(false);
  const [tags, setTags] = useState([]);

  const setServerError = (e) => {
    console.error(e);
    setError('submit', {
      type: 'server',
      message: e.response?.data?.message ?? 'Сервер временно недоступен',
    });
  };

  const clearSubmitErrors = () => {
    clearErrors('submit');
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/tags`)
      .then((tagsResponse) => {
        setTags(tagsResponse.data);

        if (fanficId) {
          axios.get(`${process.env.REACT_APP_API_BASE}/fanfics/${fanficId}`)
            .then((response) => {
              setFanfic(response.data);
              setFanficLoad(true);
            }).catch(setServerError);
        } else {
          setFanficLoad(true);
        }
      }).catch(setServerError);
  }, []);

  const onSubmit = (data) => {
    if (fanficId) {
      axios.put(`${process.env.REACT_APP_API_BASE}/fanfics/${fanficId}`, data, { headers: { Authorization: token } })
        .then(() => {
          history.goBack();
        }).catch(setServerError);
    } else {
      axios.post(`${process.env.REACT_APP_API_BASE}/fanfics`, data, { headers: { Authorization: token } })
        .then(() => {
          history.push(USER_PAGE_ROUTE);
        }).catch(setServerError);
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        {!isFanficLoad && <CircularProgress />}
        {isFanficLoad && (
        <form
          autoComplete="off"
          className={classes.root}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          {errors.submit && <Alert severity="error">{errors.submit.message}</Alert>}
          {inputs.map((cfg) => (
            <Controller
              control={control}
              defaultValue={fanfic[cfg.name] ?? ''}
              key={cfg.id}
              name={cfg.name}
              render={({ field: { onChange, value } }) => (
                <TextField
                  className={classes.input}
                  error={!!errors[cfg.name]}
                  id={cfg.id}
                  label={cfg.label}
                  multiline={!!cfg.multiline}
                  onChange={onChange}
                  required
                  value={value}
                />
              )}
              rules={{ required: true }}
            />
          ))}

          <Controller
            control={control}
            defaultValue={fanfic.fandom ?? ''}
            name="fandom"
            render={({ field: { onChange, value } }) => (
              <FormControl error={!!errors.fandom}>
                <InputLabel id="fanfic-fandom-label">Фэндом</InputLabel>
                <Select
                  id="fanfic-fandom"
                  labelId="fanfic-fandom-label"
                  onChange={onChange}
                  required
                  value={value}
                >
                  {fandoms.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            rules={{ required: true }}
          />

          <Controller
            control={control}
            defaultValue={fanfic.tags ?? []}
            name="tags"
            render={({ field: { onChange, values } }) => (
              <Autocomplete
                className={classes.input}
                defaultValue={fanfic.tags ?? []}
                freeSolo
                id="tags-filled"
                multiple
                onChange={(_, data) => onChange(data)}
                options={tags}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Тэги"
                    value={values}
                  />
                )}
                renderTags={(value, getTagProps) => value.map((option, index) => (
                  <Chip label={option} variant="outlined" {...getTagProps({ index })} />
                ))}
              />
            )}
          />
          <Controller
            control={control}
            defaultValue={fanfic.chapters ?? []}
            name="chapters"
            render={({ field: { onChange, value } }) => (
              <Chapters data={value} onChange={onChange} />
            )}
          />

          <Box className={classes.boxButton}>
            <Button
              className={classes.button}
              color="primary"
              onClick={clearSubmitErrors}
              size="medium"
              type="submit"
              variant="contained"
            >
              Сохранить
            </Button>
          </Box>
        </form>
        ) }
      </Container>
    </Layout>
  );
};

export default NewFanficPage;
