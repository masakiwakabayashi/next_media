import * as React from 'react';
import Box from '@mui/material/Box';


export default function Sidebar() {

  return (
    <Box
      component="aside"
      sx={{
        flex: 2, // 2:8 の割合を設定
        backgroundColor: '#f4f4f4',
        display: 'flex',
        flexDirection: 'column',
        // boxShadow: 1,
      }}
    >
      <Box sx={{ flexGrow: 1, p: 2 }}>
        サイドバーのコンテンツ
      </Box>
    </Box>
  );
}
