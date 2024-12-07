import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image'

// SNS icon
import { XShareButton } from '@/features/snsShare/components/XShareButton';
import { FacebookShareButton } from '@/features/snsShare/components/FacebookShareButton';
import { InstagramShareButton } from '@/features/snsShare/components/InstagramShareButton';


const page = () => {
  return (
    <div>
      {/* タグ */}
      <Stack direction="row" spacing={1}>
        <Chip label="TypeScript" color="primary" />
        <Chip label="Next.js" color="primary" />
        <Chip label="React" color="primary" />
        <Chip label="Go" color="primary" />
        <Chip label="Google Cloud" color="primary" />
      </Stack>
      {/* タイトル */}
      <Box my={2}>
        <Typography variant="h2" component="h2">
          記事のタイトル
        </Typography>
      </Box>
      {/* アイキャッチ */}
      <Box
        sx={{
          overflow: 'hidden', // コンテンツのはみ出しを隠す
        }}
      >
        <Image
          src="/test.jpg"
          width="800"
          height="500"
          alt="Picture of the author"
        />
      </Box>
      {/* 目次 */}
      <Box></Box>
      {/* 本文 */}
      <Box>
        <Box my={2}>
          親譲りの無鉄砲で小供の時から損ばかりしている。
          小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。
          なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。
          新築の二階から首を出していたら、同級生の一人が冗談に、いくら威張っても、そこから飛び降りる事は出来まい。
          弱虫やーい。と囃したからである。小使に負ぶさって帰って来た時、
          おやじが大きな眼をして二階ぐらいから飛び降りて腰を抜かす奴があるかと云ったから、この次は抜かさずに飛んで見せますと答えた。（青空文庫より）
        </Box>
        <Box my={2}>
          親譲りの無鉄砲で小供の時から損ばかりしている。
          小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。
          なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。
          新築の二階から首を出していたら、同級生の一人が冗談に、いくら威張っても、そこから飛び降りる事は出来まい。
          弱虫やーい。と囃したからである。小使に負ぶさって帰って来た時、
          おやじが大きな眼をして二階ぐらいから飛び降りて腰を抜かす奴があるかと云ったから、この次は抜かさずに飛んで見せますと答えた。（青空文庫より）
        </Box>
        <Box my={2}>
          親譲りの無鉄砲で小供の時から損ばかりしている。
          小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。
          なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。
          新築の二階から首を出していたら、同級生の一人が冗談に、いくら威張っても、そこから飛び降りる事は出来まい。
          弱虫やーい。と囃したからである。小使に負ぶさって帰って来た時、
          おやじが大きな眼をして二階ぐらいから飛び降りて腰を抜かす奴があるかと云ったから、この次は抜かさずに飛んで見せますと答えた。（青空文庫より）
        </Box>
      </Box>
      {/* SNSシェアボタン */}
      <Box
        display="flex"
        justifyContent="center" // 中央揃え
        gap={2}                // 要素間の間隔（テーマのspacing単位）
      >
        <XShareButton />
        <FacebookShareButton />
        <InstagramShareButton />
      </Box>



      {/* 執筆者プロフィール */}





      {/* 関連記事 */}
    </div>
  );
}

export default page;
