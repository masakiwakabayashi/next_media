'use client'

import Image from 'next/image'
import { useState } from 'react'

type Props = {
  src: string
  alt: string
}

export default function PostThumbnail({ src, alt }: Props) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setImgSrc('/no_image.png')}
      />
    </div>
  )
}
