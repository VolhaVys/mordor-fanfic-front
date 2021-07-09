import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  avatar: {
    backgroundColor: '#FF0000',
  },
  footerIcons: {
    display: 'flex',
    alignItems: 'center',
  },

}));
