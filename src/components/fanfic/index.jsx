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
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import { useStyles } from '../fanfics-grid/styled';

const Fanfic = ({
  id, title, description, user: { id: userId, firstName, lastName },
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(2);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
              <MenuItem>Удалить</MenuItem>
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
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
  );
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
};

export default Fanfic;
