import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link, NavLink } from 'react-router-dom';
import peterLimzLogo from '../../assets/peter-limz-logo.svg';

function Header() {
  return (
    <Box sx={{ padding: '1rem' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ gap: '1rem' }}>
          <div style={{ flexGrow: 1 }}>
            <Link to="/">
              <img src={peterLimzLogo} alt="Peter Limz Logo" style={{ height: '90px' }} />
            </Link>
          </div>

          <Button component={NavLink} to="/recipes">
            Recipes
          </Button>
          <Button component={NavLink} to="/ingredients">
            Ingredients
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
