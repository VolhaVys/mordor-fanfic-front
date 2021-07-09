import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  table: {
    height: 400,
    width: '100%',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));
