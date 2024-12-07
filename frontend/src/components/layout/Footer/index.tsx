import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Footer() {
  // const [value, setValue] = React.useState(0);


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="footer" position="static">
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="caption">
              Copyright © 2024 Masaki Wakabayashi All Rights Reserved.
            </Typography>
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
}
