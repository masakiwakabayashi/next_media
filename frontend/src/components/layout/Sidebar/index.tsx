import * as React from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image'

export default function Sidebar() {

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
        <Box
          sx={{
            display: 'grid',
            gridAutoFlow: 'row',
            gap: '20px',
            justifyItems: 'center',
          }}
        >
            <Box
              sx={{
                width: "100%", // 正方形の幅
                height: 300,
                overflow: 'hidden', // コンテンツのはみ出しを隠す
                // backgroundColor: "blue"
              }}
            >
              <Image
                src="/test.jpg"
                width={500}
                height={500}
                alt="Picture of the author"
              />
            </Box>
            <Box
              sx={{
                width: "100%", // 正方形の幅
                height: 300,
                overflow: 'hidden', // コンテンツのはみ出しを隠す
                // backgroundColor: "blue"
              }}
            >
              <Image
                src="/test.jpg"
                width={500}
                height={500}
                alt="Picture of the author"
              />
            </Box>
            <Box
              sx={{
                width: "100%", // 正方形の幅
                height: 300,
                overflow: 'hidden', // コンテンツのはみ出しを隠す
                // backgroundColor: "blue"
              }}
            >
              <Image
                src="/test.jpg"
                width={500}
                height={500}
                alt="Picture of the author"
              />
            </Box>





        </Box>
    </Box>
  );
}
