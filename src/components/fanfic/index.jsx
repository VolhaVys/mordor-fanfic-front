import React, { useState } from 'react';
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

import axios from 'axios';
import { useSelector } from 'react-redux';
import { useStyles } from './styled';
import { getToken } from '../../redux/selectors/selector';

const Fanfic = ({
  id, title, description, isLiked, likes, user: { firstName, lastName, id: userId },
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(2);
  const [isFanficLiked, setIsFanficLiked] = useState(isLiked);
  const [fanficLikes, setFanficLikes] = useState(likes);
  const token = useSelector(getToken);
  const [selectedFanficIDs, setSelectedFanficIDs] = useState([]);
  const [fanfics, setFanfics] = useState([]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLikeClick = () => {
    console.log(userId);
    const method = isFanficLiked ? 'unlike' : 'like';
    axios.put(`${process.env.REACT_APP_API_BASE}/fanfics/${id}/${method}`,
      {}, { headers: { Authorization: token } })
      .then((response) => {
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

  const deleteFanfics = () => {
    axios.delete(`${process.env.REACT_APP_API_BASE}/fanfics`,
      { headers: { Authorization: token }, data: selectedFanficIDs })
      .then((response) => {
        // eslint-disable-next-line no-underscore-dangle
        setFanfics(fanfics.filter((f) => !selectedFanficIDs.includes(f._id)));
      }).catch((error) => {
        console.error(error);
        if (error.response?.status === 403) {
          console.error(error);
        }
      });
  };

  return (
    <Grid item lg={4} md={4}>
      <Card className={classes.root}>
        <CardHeader
          action={(
            <IconButton aria-label="settings">
              <MoreVertIcon onClick={handleMenu} />
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
                <MenuItem onClick={deleteFanfics}>Удалить</MenuItem>
              </Menu>
            </IconButton>
                        )}
          avatar={(
            <Avatar aria-label="recipe" className={classes.avatar}>
              { firstName.substr(0, 1) }
            </Avatar>
                        )}
                        // subheader="September 14, 2016"
          title={`${firstName} ${lastName}`}
        />
        {/* <CardMedia */}
        {/*  className={classes.media} */}
        {/*  image="/static/images/cards/contemplative-reptile.jpg" */}
        {/*  title="Contemplative Reptile" */}
        {/* /> */}

        <CardActionArea>
          <CardContent key={id}>
            <Typography component="h2" gutterBottom variant="h5">
              {title}
            </Typography>
            <Typography color="textSecondary" component="p" variant="body2">
              {description}
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
          <IconButton aria-label="add to favorites">
            <BookmarkBorderIcon />
          </IconButton>
          <Box borderColor="transparent" component="fieldset">
            <Rating
              name="simple-controlled"
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              value={value}
            />
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
};

Fanfic.defaultProps = {
  isLiked: false,
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
};

export default Fanfic;
