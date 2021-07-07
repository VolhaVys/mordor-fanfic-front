import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styled';
import Layout from '../../components/layout';
import { getToken } from '../../redux/selectors/selector';
import { tags, fandoms, inputs } from './config';
import Chapters from '../../components/chapters';
import { USER_PAGE_ROUTE } from '../../constant/routs';

const NewFanficPage = () => {
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const token = useSelector(getToken);
  const history = useHistory();

  const onSubmit = (data) => {
    axios.post(`${process.env.REACT_APP_API_BASE}/fanfics`, data, { headers: { Authorization: token } })
      .then((response) => {
        history.push(USER_PAGE_ROUTE);
      }).catch((e) => {
        setError(e.response?.data?.message ?? 'Server is temporarily unavailable');
      });
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <form
          autoComplete="off"
          className={classes.root}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          {inputs.map((cfg) => (
            <Controller
              control={control}
              defaultValue=""
              key={cfg.id}
              name={cfg.name}
              render={({ field: { onChange, value } }) => (
                <TextField
                  SelectProps={cfg.SelectProps}
                  className={classes.input}
                  id={cfg.id}
                  label={cfg.label}
                  onChange={onChange}
                  required
                  select={cfg.select}
                  value={value}
                >
                  { cfg.id === 'fanfic-fandom'
                      && fandoms.map((option) => (
                        <option key={option.value}>
                          {option.label}
                        </option>
                      ))}

                </TextField>

              )}
              rules={{ required: true }}
            />
          ))}
          <Controller
            control={control}
            defaultValue=""
            name="tags"
            render={({ field: { onChange, values } }) => (
              <Autocomplete
                className={classes.input}
                freeSolo
                id="tags-filled"
                multiple
                onChange={(_, data) => onChange(data)}
                options={tags.map((option) => option.title)}
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
            defaultValue=""
            name="chapters"
            render={({ field: { onChange, value } }) => (
              <Chapters onChange={onChange} value={value} />
            )}
          />

          <Box className={classes.boxButton}>
            <Button
              className={classes.button}
              color="primary"
              size="medium"
              type="submit"
              variant="contained"
            >
              Сохранить
            </Button>
          </Box>
        </form>
      </Container>
    </Layout>
  );
};

export default NewFanficPage;
