import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  CircularProgress, List, ListItem, ListItemText,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Layout from '../../components/layout';
import { useStyles } from './styled';

const PreviewFanficPage = () => {
  const classes = useStyles();
  const { fanficId } = useParams();
  const [fanfic, setFanfic] = useState({});
  const [isFanficLoad, setFanficLoad] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/fanfics/${fanficId}`)
      .then((response) => {
        setFanfic(response.data);
        setFanficLoad(true);
      }).catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <Layout>
      {!isFanficLoad && <CircularProgress />}
      {isFanficLoad && (
        <Container className={classes.root} maxWidth="sm">
          <Typography gutterBottom variant="h3">
            {fanfic.title}
          </Typography>
          <Box className={classes.tags}>
            <Chip
              color="primary"
              label={fanfic.fandom}
            />
            {fanfic.tags.map((tag) => (
              <Chip
                color="primary"
                key={tag}
                label={tag}
                variant="outlined"
              />
            ))}
          </Box>
          <Typography gutterBottom variant="body1">
            {/* {`${fanfic.user.firstName} ${fanfic.user.lastName}`} */}
          </Typography>
          <Typography gutterBottom variant="body1">
            {fanfic.description}
          </Typography>

          <List component="nav">
            {fanfic.chapters.map((chapter) => (
              <ListItem
                button
                component="a"
                href={`#fanfic-${chapter.id}`}
                key={chapter.id}
              >
                <ListItemText primary={chapter.title} />
              </ListItem>
            ))}
          </List>

          {fanfic.chapters.map((chapter) => (
            <Box id={`fanfic-${chapter.id}`} key={chapter.id}>
              <Typography gutterBottom variant="h4">
                {chapter.title}
              </Typography>
              <Typography gutterBottom variant="body2">
                {chapter.text}
              </Typography>
            </Box>
          ))}

        </Container>
      )}
    </Layout>
  );
};

export default PreviewFanficPage;
