import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Toolbar from '@mui/material/Toolbar';

import peterLimzLogo from '../../assets/peter-limz-logo.svg';

function Header() {
  return (
    <Box sx={{ padding: '1rem' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ gap: '2rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={peterLimzLogo} alt="Peter Limz Logo" style={{ height: '90px' }} />
          </Box>
          <Chip
            label="ADMIN"
            color="error"
            variant="filled"
            size="small"
            sx={{
              fontWeight: 'bold',
              letterSpacing: 1,
            }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
