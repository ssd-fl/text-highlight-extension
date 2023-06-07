import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import ActionContext from '../../context';
import { ActionContextType } from '../../@types/action';

const ActionBar = () => {
  const { action, setAction } = useContext(ActionContext) as ActionContextType;

  const updateSort = () => {
    const { sort } = action;
    if (sort === 'asc') {
      setAction({
        ...action,
        sort: 'desc',
      });
    } else {
      setAction({
        ...action,
        sort: 'asc',
      });
    }
  };

  const changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAction({
      ...action,
      filter: e.target.value,
    });
  };

  return (
    <Box display={'flex'} justifyContent={'space-between'}>
      <Paper
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#404040',
          width: 300,
        }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1, fontSize: 14, color: 'white' }}
          placeholder="Search Completion"
          inputProps={{ 'aria-label': 'Search Completion' }}
          onChange={changeFilter}
        />
        <IconButton type="button" aria-label="search">
          <SearchIcon sx={{ color: 'white' }} />
        </IconButton>
      </Paper>
      <IconButton type="button" aria-label="filter" onClick={updateSort}>
        <SortIcon sx={{ color: action.sort === 'asc' ? 'white' : 'blue' }} />
      </IconButton>
    </Box>
  );
};

export default ActionBar;
