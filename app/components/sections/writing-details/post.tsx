import type { RichTextProps } from '@graphcms/rich-text-react-renderer'
import { PostSectionBlock } from './post-block'
import { LikeHeart } from '~/components/shared/like-heart'
import { useParams } from 'react-router'

export const Post = ({
  intro,
  body,
}: {
  intro?: string | null
  body?: RichTextProps['content']
}) => {
  const params = useParams()
  return (
    <main className="w-full pt-6 pb-20">
      <p className="mb-10 border-b pb-10 font-heading text-base font-light italic">
        {intro}
      </p>

      <div className="space-y-10">
        {body && <PostSectionBlock body={body} />}
        <LikeHeart slug={params.postId ?? ''} />
      </div>
    </main>
  )
}
