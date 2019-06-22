import {withStyles} from '@material-ui/styles';

const styles = theme => ({
  root: {
    maxWidth: 420,
  },
  button: {
    width: 300,
    marginBottom: theme.spacing(2),
    justifyContent: 'left',
  },
  icon: {
    marginRight: theme.spacing(4),
    fontSize: theme.spacing(4),
  }
});

export default withStyles(styles);
