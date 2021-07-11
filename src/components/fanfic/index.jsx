import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import { MenuItem } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import axios from 'axios';
import { useSelector } from 'react-redux';
import Moment from 'moment';
import 'moment/locale/ru';
import { useStyles } from './styled';
import { getToken, getUserData } from '../../redux/selectors/selector';

Moment.locale('ru');

const Fanfic = ({
  id, title, description, isLiked, likes, user: { firstName, lastName, _id: userId }, onDelete,
  isBookmarked, rating, rate, updateAt,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userRate, setUserRate] = useState(rate);
  const [fanficRating, setFanficRating] = useState(rating);
  const [isFanficBookmarked, setFanficBookmarked] = useState(isBookmarked);
  const [isFanficLiked, setIsFanficLiked] = useState(isLiked);
  const [fanficLikes, setFanficLikes] = useState(likes);
  const token = useSelector(getToken);
  const user = useSelector(getUserData);

  useEffect(() => {
    setUserRate(rate);
  }, [rate]);

  useEffect(() => {
    setFanficRating(rating);
  }, [rating]);

  useEffect(() => {
    setFanficBookmarked(isBookmarked);
  }, [isBookmarked]);

  useEffect(() => {
    setIsFanficLiked(isLiked);
  }, [isLiked]);

  useEffect(() => {
    setFanficLikes(likes);
  }, [likes]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const trimText = (text, maxSymbols) => {
    if (text.length > maxSymbols) {
      return `${text.substring(0, maxSymbols)}...`;
    }

    return text;
  };

  const canChange = () => user && (user.role === 'admin' || user.id === userId);

  const onLikeClick = () => {
    const method = isFanficLiked ? 'unlike' : 'like';
    axios.put(`${process.env.REACT_APP_API_BASE}/fanfics/${id}/${method}`,
      {}, { headers: { Authorization: token } })
      .then(() => {
        setFanficLikes(isFanficLiked ? fanficLikes - 1 : fanficLikes + 1);
        setIsFanficLiked(!isFanficLiked);
      }).catch((error) => {
        console.error(error);
        if (error.response?.status === 403) {
        // TODO implement logout
        // logout();
        }
      });
  };

  const deleteFanfic = () => {
    axios.delete(`${process.env.REACT_APP_API_BASE}/fanfics/${id}/`,
      { headers: { Authorization: token } })
      .then(() => {
        onDelete(id);
      }).catch((error) => {
        console.error(error);
        if (error.response?.status === 403) {
          console.error(error);
        }
      });
  };

  const onBookmarkClick = () => {
    const method = isFanficBookmarked ? 'remove_bookmark' : 'bookmark';
    axios.put(`${process.env.REACT_APP_API_BASE}/fanfics/${id}/${method}`,
      {}, { headers: { Authorization: token } })
      .then(() => {
        setFanficBookmarked(!isFanficBookmarked);
      }).catch((error) => {
        console.error(error);
        if (error.response?.status === 403) {
        // TODO implement logout
        // logout();
        }
      });
  };

  const onRate = (event, newRating) => {
    const oldRating = userRate;
    setUserRate(newRating);

    axios.put(`${process.env.REACT_APP_API_BASE}/fanfics/${id}/rating`,
      { rating: newRating }, { headers: { Authorization: token } })
      .then((response) => {
        setFanficRating(response.data.rating);
      })
      .catch((error) => {
        setUserRate(oldRating);
        console.error(error);
        if (error.response?.status === 403) {
          // TODO implement logout
          // logout();
        }
      });
  };

  return (
    <Grid className={classes.root} item lg={4} md={4}>
      <Card>
        <CardHeader
          action={canChange() && (
          <IconButton aria-label="settings" onClick={handleMenu}>
            <MoreVertIcon />
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              id="menu-appbar"
              keepMounted
              onClose={handleClose}
              open={!!anchorEl}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem>Изменить</MenuItem>
              <MenuItem onClick={deleteFanfic}>Удалить</MenuItem>
            </Menu>
          </IconButton>
          )}
          avatar={(
            <Avatar aria-label="recipe" className={classes.avatar}>
              { firstName.substr(0, 1) }
            </Avatar>
              )}
          subheader={Moment(updateAt).format('D MMM YYYY H:m')}
          title={`${firstName} ${lastName}`}
        />

        <CardActionArea>
          <CardContent key={id}>
            <Typography className={classes.title} component="h2" gutterBottom variant="h5">
              {trimText(title, 40)}
            </Typography>
            <Typography className={classes.description} color="textSecondary" component="p" variant="body2">
              {trimText(description, 170)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.footerIcons}>
          <IconButton aria-label="add to favorites" onClick={onLikeClick}>
            {!isFanficLiked && <FavoriteBorderIcon />}
            {isFanficLiked && <FavoriteIcon />}
            <span style={{ fontSize: 18 }}>
              {fanficLikes}
            </span>
          </IconButton>
          <IconButton aria-label="add to favorites" onClick={onBookmarkClick}>
            {isFanficBookmarked && <BookmarkIcon />}
            {!isFanficBookmarked && <BookmarkBorderIcon />}
          </IconButton>
          <Box borderColor="transparent" component="fieldset">
            <Rating
              name={`fanfic-${id}-rating`}
              onChange={onRate}
              value={userRate}
            />
            <span style={{ fontSize: 18 }}>{fanficRating}</span>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
};

Fanfic.defaultProps = {
  isLiked: false,
  isBookmarked: false,
  rate: null,
  rating: null,
};

Fanfic.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  userId: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  isLiked: PropTypes.bool,
  likes: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  isBookmarked: PropTypes.bool,
  rating: PropTypes.number,
  rate: PropTypes.number,
  updateAt: PropTypes.string.isRequired,
};

export default Fanfic;
