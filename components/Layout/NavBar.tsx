import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle';

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ display: { sm: 'block' } }}
          >
            Quest Board
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: 'flex' } }}>
            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              aria-haspopup='true'
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
