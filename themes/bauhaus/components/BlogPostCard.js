import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * Bauhaus 文章卡片
 * 锐利边缘、无阴影、几何布局、色块点缀
 */
const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  if (!post) return null

  const showCover = siteConfig('BAUHAUS_POST_COVER', true, CONFIG) && post?.pageCoverThumbnail

  // 根据索引分配不同的强调色
  const accentColors = ['#E53935', '#FDD835', '#1E88E5']
  const accentColor = accentColors[index % 3]

  return (
    <article className='group'>
      <SmartLink href={post?.href}>
        <div className='border-2 border-[#212121] dark:border-[#FAFAFA] bg-[#FAFAFA] dark:bg-[#2a2a2a] overflow-hidden hover:-translate-y-1 transition-transform duration-300'>
          {/* 顶部色条 */}
          <div className='h-1' style={{ backgroundColor: accentColor }} />

          {/* 封面图 */}
          {showCover && (
            <div className='relative h-48 overflow-hidden'>
              <LazyImage
                priority={index < 4}
                src={post.pageCoverThumbnail}
                alt={post.title}
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
              />
              {/* 几何装饰 */}
              <div 
                className='absolute bottom-4 right-4 w-8 h-8 opacity-80'
                style={{ backgroundColor: accentColor }}
              />
            </div>
          )}

          {/* 内容区 */}
          <div className='p-6 space-y-4'>
            {/* 分类 */}
            {post.category && (
              <span 
                className='inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#FAFAFA]'
                style={{ backgroundColor: accentColor }}>
                {post.category}
              </span>
            )}

            {/* 标题 */}
            <h2 className='text-xl font-black text-[#212121] dark:text-[#FAFAFA] leading-tight line-clamp-2 group-hover:text-[#1E88E5] dark:group-hover:text-[#FDD835] transition-colors'>
              {post.title}
            </h2>

            {/* 摘要 */}
            {showSummary && post.summary && (
              <p className='text-sm text-[#9E9E9E] line-clamp-2 leading-relaxed'>
                {post.summary}
              </p>
            )}

            {/* 底部信息 */}
            <div className='flex items-center justify-between pt-4 border-t border-[#212121] dark:border-[#FAFAFA] border-opacity-20'>
              <time className='text-xs font-mono text-[#9E9E9E] uppercase tracking-wider'>
                {post.publishDay}
              </time>
              
              {/* 阅读更多箭头 */}
              <span className='text-[#212121] dark:text-[#FAFAFA] font-bold text-sm uppercase tracking-wider group-hover:translate-x-1 transition-transform'>
                Read →
              </span>
            </div>
          </div>
        </div>
      </SmartLink>
    </article>
  )
}

export default BlogPostCard
