import { Link, NavLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';

import peterLimzLogo from '../../assets/peter-limz-logo.svg';

function Header() {
  return (
    <Box sx={{ padding: '1rem' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <div style={{ flex: 1 }}>
            <Link to="/">
              <img src={peterLimzLogo} alt="Peter Limz Logo" style={{ height: '90px' }} />
            </Link>
          </div>

          <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1, gap: '1rem' }}>
            <Button component={NavLink} to="/recipes">
              Receitas
            </Button>
            <Button component={NavLink} to="/ingredients">
              Ingredientes
            </Button>
          </Box>
          <Box sx={{ flex: 1 }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
