import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    // height: 300,
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
  description: {
    height: 100,
    overflow: 'hidden',
  },
  title: {
    height: 60,
    fontSize: 22,
  },
  counter: {
    fontSize: 18,
  },
}));
