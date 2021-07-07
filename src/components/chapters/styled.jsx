import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      // width: '25ch',
      display: 'flex',
      padding: '20px, 10px',
    },
  },
  input: {
    padding: theme.spacing(3, 0, 2),
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'baseline',
    },
  },
  button: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: '10px',
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    width: '100%',
  },
  droppable: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  textMultiline: {
    width: '100%',
  },
  descriptionChapter: {
    width: '100%',
  },
}));
