import * as React from 'react';
import Link from 'next/link'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type BlogPostCardProps = {
  // children: ReactNode;
  title: string,
  description: string,
  imagePath: string,
  url: string,
}

export const BlogPostCard = (props: BlogPostCardProps) => {
  const { title, description, imagePath, url } = props;

  return (
    <Card sx={{ maxWidth: 545 }}>
      <Link href={url} target="_blank">
        <CardMedia
          component="img"
          alt="image"
          height="140"
          image={imagePath}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}
