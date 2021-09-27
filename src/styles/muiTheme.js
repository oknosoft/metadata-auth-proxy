import createMuiTheme from '@material-ui/core/styles/createTheme';
import teal from '@material-ui/core/colors/blueGrey';


const theme = createMuiTheme({

  palette: {
    primary: teal, // Purple and green play nicely together.
  },

  mixins: {
    toolbar: {
      minHeight: 48,
    }
  },

  custom: {
    appbar: {
      position: 'fixed',
    }
  },

  typography: {
    useNextVariants: true,
  },

  // overrides: {
  //   MuiToolbar: {
  //     root: {
  //       minHeight: 48,
  //     },
  //   },
  //   MuiAppBar: {
  //     root: {
  //       backgroundColor: colors.lightBlack,
  //     }
  //   },
  // },

});

export default theme;

