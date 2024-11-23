import * as React from 'react';
import Link from 'next/link'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Tag } from '@/components/ui/Tag'

type BlogPostCardProps = {
  // children: ReactNode;
  title: string,
  description: string,
  imagePath: string,
  url: string,
  tags: string[],
}

export const BlogPostCard = (props: BlogPostCardProps) => {
  const { title, description, imagePath, url, tags } = props;

  return (
    <Card
      sx={{
        // maxWidth: 545
      }}
    >
      <Link href={url} target="_blank" style={{ textDecoration: 'none' }}>
        {/* <CardMedia
          component="img"
          alt="image"
          height="140"
          image={imagePath}
        /> */}
        <CardContent>
          <Box
            sx={{
              display: "flex",
            }}
          >
            {tags.map((tag, index) => (
              <Box
                key={index}
                mx={1}
              >
                <Tag name={tag} />
              </Box>
            ))}
          </Box>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            my={2}
            sx={{
              color: "black",
              textDecoration: 'none !important'
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textDecorationLine: 'none',
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}
