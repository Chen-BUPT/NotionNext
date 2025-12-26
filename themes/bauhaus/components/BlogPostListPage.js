import { siteConfig } from '@/lib/config'
import BlogPostCard from './BlogPostCard'
import PaginationNumber from './PaginationNumber'

/**
 * Bauhaus 文章列表 - 分页模式
 * 网格布局、几何装饰
 */
const BlogPostListPage = props => {
  const { posts, page, postCount, siteInfo } = props
  const postsPerPage = siteConfig('POSTS_PER_PAGE')
  const totalPage = Math.ceil(postCount / postsPerPage)

  if (!posts || posts.length === 0) {
    return <BlogPostListEmpty />
  }

  return (
    <div className='space-y-12'>
      {/* 文章网格 */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {posts.map((post, index) => (
          <BlogPostCard
            key={post.id}
            index={index}
            post={post}
            showSummary={true}
            siteInfo={siteInfo}
          />
        ))}
      </div>

      {/* 分页 */}
      {totalPage > 1 && (
        <PaginationNumber page={page} totalPage={totalPage} />
      )}
    </div>
  )
}

/**
 * 空状态
 */
function BlogPostListEmpty() {
  return (
    <div className='flex flex-col items-center justify-center py-20 space-y-6'>
      {/* 几何装饰 */}
      <div className='flex space-x-4'>
        <div className='w-8 h-8 rounded-full bg-[#E53935] opacity-50' />
        <div className='w-8 h-8 bg-[#FDD835] opacity-50' style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <div className='w-8 h-8 bg-[#1E88E5] opacity-50' />
      </div>
      <p className='text-xl font-bold text-[#9E9E9E] uppercase tracking-wider'>
        No Posts Found
      </p>
    </div>
  )
}

export default BlogPostListPage
