import { createTheme } from '@mui/material/styles'

export const Theme = createTheme({
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 0,
          margin: 12,
          '&:last-child': {
            paddingBottom: 0,
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#50bcdf',
    },
  },
})
