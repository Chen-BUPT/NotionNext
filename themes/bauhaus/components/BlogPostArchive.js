import SmartLink from '@/components/SmartLink'

/**
 * Bauhaus 归档文章组
 * 时间线设计、几何标记
 */
const BlogPostArchive = ({ posts, archiveTitle }) => {
  if (!posts || posts.length === 0) return null

  return (
    <div className='mb-12'>
      {/* 年份标题 */}
      <div className='flex items-center space-x-4 mb-6'>
        <div className='w-4 h-4 bg-[#E53935]' />
        <h2 className='text-3xl font-black text-[#212121] dark:text-[#FAFAFA]'>
          {archiveTitle}
        </h2>
        <div className='flex-1 h-0.5 bg-[#212121] dark:bg-[#FAFAFA] opacity-20' />
      </div>

      {/* 文章列表 */}
      <div className='space-y-4 pl-8 border-l-2 border-[#212121] dark:border-[#FAFAFA] border-opacity-20'>
        {posts.map((post, index) => (
          <SmartLink key={post.id} href={`/${post.slug}`}>
            <div className='group flex items-start space-x-4 -ml-[9px]'>
              {/* 时间线节点 */}
              <div 
                className='w-4 h-4 flex-shrink-0 mt-1 transition-transform group-hover:scale-125'
                style={{ 
                  backgroundColor: ['#E53935', '#FDD835', '#1E88E5'][index % 3]
                }}
              />
              
              {/* 文章信息 */}
              <div className='flex-1'>
                <h3 className='font-bold text-[#212121] dark:text-[#FAFAFA] group-hover:text-[#1E88E5] dark:group-hover:text-[#FDD835] transition-colors'>
                  {post.title}
                </h3>
                <time className='text-xs text-[#9E9E9E] font-mono'>
                  {post.publishDay}
                </time>
              </div>
            </div>
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

export default BlogPostArchive
