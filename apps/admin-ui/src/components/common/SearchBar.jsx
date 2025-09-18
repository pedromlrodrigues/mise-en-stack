import { useState, useEffect } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

function SearchBar({ initialValue = '', onSubmit, itemNounPlural = 'items' }) {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleSearch = async (event) => {
    event.preventDefault();

    onSubmit(searchTerm);
  };

  const dynamicPlaceholder = `Search for ${itemNounPlural}...`;
  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '60vw' }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder={dynamicPlaceholder}
        value={searchTerm || ''}
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
