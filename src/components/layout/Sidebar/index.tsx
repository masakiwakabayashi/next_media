import * as React from 'react';
import Box from '@mui/material/Box';


export default function Sidebar() {

  return (
    <Box
      component="aside"
      sx={{
        flex: 3, // サイドバーの幅
        backgroundColor: '#f4f4f4',
        display: 'flex',
        flexDirection: 'column',
        // boxShadow: 1,
        margin: "20px 0"
      }}
    >
      <Box sx={{ flexGrow: 1, p: 2 }}>
        サイドバーのコンテンツ
      </Box>
    </Box>
  );
}
