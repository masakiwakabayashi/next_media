'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = {
  src: string | null
  alt: string
}

const STORAGE_BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/post-images/`
  : null

// image_path はシード等の public/ 配下の相対パス（"/images/..."）、
// blob:/data: のプレビュー、または Supabase Storage 上のオブジェクトキーのいずれか。
// ローカルパス以外は next/image の最適化プロキシを経由させない
// （ローカル環境の Supabase はループバックIPのため next/image がブロックする）。
function resolveSrc(src: string | null): string {
  if (!src) return '/no_image.png'
  if (src.startsWith('/') || src.startsWith('blob:') || src.startsWith('data:') || src.startsWith('http')) {
    return src
  }
  return STORAGE_BASE_URL ? `${STORAGE_BASE_URL}${src}` : '/no_image.png'
}

export default function EyecatchImage({ src, alt }: Props) {
  const [imgSrc, setImgSrc] = useState(() => resolveSrc(src))

  useEffect(() => {
    setImgSrc(resolveSrc(src))
  }, [src])

  return (
    <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg">
      <Image
        key={src}
        src={imgSrc}
        alt={alt}
        fill
        unoptimized={!imgSrc.startsWith('/')}
        className="object-cover"
        onError={() => setImgSrc('/no_image.png')}
      />
    </div>
  )
}
