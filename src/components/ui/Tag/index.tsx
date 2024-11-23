import { ReactNode } from "react";
import * as React from 'react';
import { Box } from '@mui/system';

type TagProps = {
  name: ReactNode;
}

export const Tag = (props: TagProps) => {
  const { name } = props;

  return (
    <Box
      sx={{
        borderRadius: "20px",
        backgroundColor: "cyan",
      }}
      px={2}
      py={1}
    >
      {name}
    </Box>
  );
}
