import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'

/**
 * Bauhaus 文章头部
 * 大标题、几何装饰、极简信息
 */
const PostHeader = props => {
  const { post, siteInfo } = props

  if (!post) return null

  return (
    <div className='relative mb-12'>
      {/* 封面图 */}
      {post.pageCoverThumbnail && (
        <div className='relative h-64 md:h-96 mb-8 overflow-hidden'>
          <LazyImage
            src={post.pageCoverThumbnail}
            alt={post.title}
            className='w-full h-full object-cover'
          />
          {/* 几何装饰覆盖 */}
          <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAFAFA] dark:from-[#212121] to-transparent' />
          <div className='absolute bottom-4 right-4 flex space-x-2'>
            <div className='w-4 h-4 bg-[#E53935]' />
            <div className='w-4 h-4 bg-[#FDD835]' />
            <div className='w-4 h-4 bg-[#1E88E5]' />
          </div>
        </div>
      )}

      {/* 文章信息 */}
      <div className='max-w-4xl mx-auto px-6'>
        {/* 分类 */}
        {post.category && (
          <SmartLink href={`/category/${post.category}`}>
            <span className='inline-block px-4 py-1 mb-4 text-xs font-bold uppercase tracking-wider bg-[#1E88E5] text-[#FAFAFA]'>
              {post.category}
            </span>
          </SmartLink>
        )}

        {/* 标题 */}
        <h1 className='text-4xl md:text-6xl font-black text-[#212121] dark:text-[#FAFAFA] leading-tight mb-6'>
          {post.title}
        </h1>

        {/* 元信息 */}
        <div className='flex flex-wrap items-center gap-4 text-sm text-[#9E9E9E] uppercase tracking-wider'>
          <time>{post.publishDay}</time>
          {post.lastEditedDay && post.lastEditedDay !== post.publishDay && (
            <>
              <span>·</span>
              <span>Updated {post.lastEditedDay}</span>
            </>
          )}
        </div>

        {/* 分隔线 */}
        <div className='mt-8 h-0.5 bg-[#212121] dark:bg-[#FAFAFA]' />
      </div>
    </div>
  )
}

export default PostHeader
