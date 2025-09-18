import { useState, useEffect } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import styles from './SearchBar.module.css';

function SearchBar({ initialValue = '', onSubmit }) {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleSearch = async (event) => {
    event.preventDefault();

    onSubmit(searchTerm);
  };

  return (
    <Box component="form" onSubmit={handleSearch} className={styles.searchContainer}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for recipes..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}

export default SearchBar;
