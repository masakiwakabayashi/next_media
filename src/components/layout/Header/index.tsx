import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function HeaderNavigation() {
  // const [value, setValue] = React.useState(0);

  return (
    <Box justifyContent="left" display="flex">
      <BottomNavigation
        showLabels
        // value={value}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} sx={{ px: 5 }} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} sx={{ px: 5 }} />
        <BottomNavigationAction label="Bookmarks" icon={<BookmarksIcon />} sx={{ px: 5 }} />
        <BottomNavigationAction label="Mypage" icon={<AccountCircleIcon />} sx={{ px: 5 }} />





      </BottomNavigation>
    </Box>
  );
}
