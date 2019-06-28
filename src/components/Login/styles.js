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
  dialogButton: {
    margin: theme.spacing(),
  },
  icon: {
    marginRight: theme.spacing(4),
    fontSize: theme.spacing(4),
  },
  small: {
    marginRight: theme.spacing(2),
    fontSize: theme.spacing(3),
  },
  flex: {display: 'flex'},

});

export default withStyles(styles);
