import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    background: 'linear-gradient(45deg,  rgba(66, 183, 245,0.8) 0%,rgba(66, 245, 189,0.4) 100%)',
    maxWidth: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: '200px',

  },
  heading: {
    fontSize: '45px',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  container_heading: {

  },
  container_button: {
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: '30px',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  button: {
    width: '190px',
    padding: '10px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '15px',
      width: '100%',
    },
  },
}));
