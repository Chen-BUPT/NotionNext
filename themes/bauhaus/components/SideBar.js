import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import dynamic from 'next/dynamic'
import CONFIG from '../config'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

/**
 * Bauhaus 侧边栏
 * 几何装饰、极简信息展示
 */
const SideBar = props => {
  const { latestPosts, categories, tags, notice } = props
  const showLatest = siteConfig('BAUHAUS_SIDEBAR_LATEST_POSTS', true, CONFIG)
  const showCategories = siteConfig('BAUHAUS_SIDEBAR_CATEGORIES', true, CONFIG)
  const showTags = siteConfig('BAUHAUS_SIDEBAR_TAGS', true, CONFIG)

  return (
    <aside className='space-y-8 w-full lg:w-72'>
      {/* 公告 */}
      {notice && (
        <SidebarSection title='Notice' color='#E53935'>
          <div className='text-sm text-[#212121] dark:text-[#FAFAFA] text-center'>
            <NotionPage post={notice} />
          </div>
        </SidebarSection>
      )}

      {/* 最新文章 */}
      {showLatest && latestPosts?.length > 0 && (
        <SidebarSection title='Latest' color='#FDD835'>
          <div className='space-y-4'>
            {latestPosts.slice(0, 5).map((post, index) => (
              <SmartLink key={post.id} href={`/${post.slug}`}>
                <div className='group flex items-start space-x-3'>
                  <span className='text-xs font-mono text-[#9E9E9E] mt-1'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className='text-sm text-[#212121] dark:text-[#FAFAFA] group-hover:text-[#1E88E5] dark:group-hover:text-[#FDD835] transition-colors line-clamp-2'>
                    {post.title}
                  </span>
                </div>
              </SmartLink>
            ))}
          </div>
        </SidebarSection>
      )}

      {/* 分类 */}
      {showCategories && categories?.length > 0 && (
        <SidebarSection title='Categories' color='#1E88E5'>
          <div className='space-y-2'>
            {categories.slice(0, 8).map(category => (
              <SmartLink key={category.name} href={`/category/${category.name}`}>
                <div className='flex items-center justify-between group'>
                  <span className='text-sm text-[#212121] dark:text-[#FAFAFA] group-hover:text-[#1E88E5] dark:group-hover:text-[#FDD835] transition-colors'>
                    {category.name}
                  </span>
                  <span className='text-xs font-mono text-[#9E9E9E]'>
                    {category.count}
                  </span>
                </div>
              </SmartLink>
            ))}
          </div>
        </SidebarSection>
      )}

      {/* 标签 */}
      {showTags && tags?.length > 0 && (
        <SidebarSection title='Tags' color='#FDD835'>
          <div className='flex flex-wrap gap-2'>
            {tags.slice(0, 15).map(tag => (
              <SmartLink key={tag.name} href={`/tag/${tag.name}`}>
                <span className='inline-block px-2 py-1 text-xs font-bold border border-[#212121] dark:border-[#FAFAFA] text-[#212121] dark:text-[#FAFAFA] hover:bg-[#212121] hover:text-[#FAFAFA] dark:hover:bg-[#FAFAFA] dark:hover:text-[#212121] transition-colors'>
                  {tag.name}
                </span>
              </SmartLink>
            ))}
          </div>
        </SidebarSection>
      )}
    </aside>
  )
}

/**
 * 侧边栏区块
 */
function SidebarSection({ title, color, children }) {
  return (
    <div className='border-2 border-[#212121] dark:border-[#FAFAFA]'>
      {/* 标题栏 */}
      <div className='flex items-center space-x-3 p-4 border-b-2 border-[#212121] dark:border-[#FAFAFA]'>
        <div className='w-3 h-3' style={{ backgroundColor: color }} />
        <h3 className='text-sm font-black uppercase tracking-wider text-[#212121] dark:text-[#FAFAFA]'>
          {title}
        </h3>
      </div>
      {/* 内容 */}
      <div className='p-4'>
        {children}
      </div>
    </div>
  )
}

export default SideBar
