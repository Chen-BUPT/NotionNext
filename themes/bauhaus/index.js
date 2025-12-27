/**
 * Bauhaus 主题
 * 
 * 设计哲学：
 * - 「形式追随功能」：每个视觉元素都必须有其目的
 * - 「少即是多」：摒弃装饰，追求本质
 * - 艺术与工艺的统一：美观与实用并重
 * 
 * 色彩体系：三原色（红、黄、蓝）+ 中性色（黑、白、灰）
 * 几何形状：圆形、三角形、正方形
 * 
 * 开启方式：在 blog.config.js 中将 THEME 设置为 'bauhaus'
 */

import Comment from '@/components/Comment'
import LoadingCover from '@/components/LoadingCover'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import BlogPostArchive from './components/BlogPostArchive'
import BlogPostListPage from './components/BlogPostListPage'
import BlogPostListScroll from './components/BlogPostListScroll'
import Catalog from './components/Catalog'
import ClickEffect from './components/ClickEffect'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import { NoticeBar } from './components/NoticeBar'
import PostAdjacent from './components/PostAdjacent'
import PostHeader from './components/PostHeader'
import { PostLock } from './components/PostLock'
import SearchNav from './components/SearchNav'
import SideBar from './components/SideBar'
import CONFIG from './config'
import { Style } from './style'

/**
 * 基础布局
 */
const LayoutBase = props => {
  const { children, slotTop } = props
  const { fullWidth } = useGlobal()
  const router = useRouter()
  const isHome = router.pathname === '/'

  const showLoading = siteConfig('BAUHAUS_LOADING_COVER', true, CONFIG)

  return (
    <div id='theme-bauhaus' className='min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#212121]'>
      <Style />
      <ClickEffect />
      
      {/* 顶部导航 */}
      <Header {...props} />

      {/* 通知横幅 + Hero 区域 - 仅首页 */}
      {isHome && (
        <>
          <NoticeBar />
          <Hero {...props} />
        </>
      )}

      {/* 主内容区 */}
      <main className={`flex-grow w-full ${fullWidth ? '' : 'max-w-6xl'} mx-auto px-6 py-12`}>
        {slotTop}
        <div className={`${fullWidth ? '' : 'lg:flex lg:space-x-12'}`}>
          {/* 主内容 */}
          <div className='flex-1 min-w-0'>
            {children}
          </div>
          
          {/* 侧边栏 - 非全宽模式 */}
          {!fullWidth && (
            <div className='hidden lg:block'>
              <SideBar {...props} />
            </div>
          )}
        </div>
      </main>

      {/* 页脚 */}
      <Footer />

      {/* 加载遮罩 */}
      {showLoading && <LoadingCover />}
    </div>
  )
}

/**
 * 首页
 */
const LayoutIndex = props => {
  return (
    <div>
      {/* 区块标题 */}
      <SectionTitle title='Latest Posts' color='#E53935' />
      
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </div>
  )
}

/**
 * 文章列表
 */
const LayoutPostList = props => {
  return (
    <div>
      <SectionTitle title='All Posts' color='#1E88E5' />
      
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </div>
  )
}

/**
 * 搜索页
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  return (
    <div>
      <SectionTitle 
        title={currentSearch ? `Search: ${currentSearch}` : 'Search'} 
        color='#FDD835' 
      />
      
      {!currentSearch ? (
        <SearchNav {...props} />
      ) : (
        <>
          {siteConfig('POST_LIST_STYLE') === 'page' ? (
            <BlogPostListPage {...props} />
          ) : (
            <BlogPostListScroll {...props} />
          )}
        </>
      )}
    </div>
  )
}

/**
 * 归档页
 */
const LayoutArchive = props => {
  const { archivePosts } = props

  return (
    <div>
      <SectionTitle title='Archive' color='#E53935' />
      
      {Object.keys(archivePosts).map(archiveTitle => (
        <BlogPostArchive
          key={archiveTitle}
          posts={archivePosts[archiveTitle]}
          archiveTitle={archiveTitle}
        />
      ))}
    </div>
  )
}

/**
 * 文章详情页
 */
const LayoutSlug = props => {
  const { post, lock, validPassword, prev, next } = props
  const { locale } = useGlobal()
  const router = useRouter()

  // 404 处理
  useEffect(() => {
    if (!post) {
      const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
      setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector('#article-wrapper #notion-article')
          if (!article) {
            router.push('/404')
          }
        }
      }, waiting404)
    }
  }, [post, router])

  const commentEnable =
    siteConfig('COMMENT_TWIKOO_ENV_ID') ||
    siteConfig('COMMENT_WALINE_SERVER_URL') ||
    siteConfig('COMMENT_VALINE_APP_ID') ||
    siteConfig('COMMENT_GISCUS_REPO') ||
    siteConfig('COMMENT_CUSDIS_APP_ID') ||
    siteConfig('COMMENT_UTTERRANCES_REPO') ||
    siteConfig('COMMENT_GITALK_CLIENT_ID')

  return (
    <div className='max-w-4xl mx-auto'>
      {/* 文章锁 */}
      {lock && <PostLock validPassword={validPassword} />}

      {!lock && post && (
        <article id='article-wrapper' itemScope itemType='https://schema.org/Article'>
          {/* 文章头部 */}
          <PostHeader {...props} />

          {/* 文章内容 */}
          <section className='prose prose-lg dark:prose-invert max-w-none px-6'>
            <NotionPage post={post} />
          </section>

          {/* 分享 */}
          <div className='px-6 my-8'>
            <ShareBar post={post} />
          </div>

          {/* 上下篇导航 */}
          <div className='px-6'>
            <PostAdjacent prev={prev} next={next} />
          </div>

          {/* 评论区 */}
          {commentEnable && (
            <div className='px-6 mt-12 pt-8 border-t-2 border-[#212121] dark:border-[#FAFAFA]'>
              <SectionTitle title={locale.COMMON.COMMENTS} color='#1E88E5' />
              <Comment frontMatter={post} />
            </div>
          )}
        </article>
      )}
    </div>
  )
}

/**
 * 404 页面
 */
const Layout404 = props => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] space-y-8'>
      {/* 几何装饰 */}
      <div className='flex space-x-6'>
        <div className='w-16 h-16 rounded-full bg-[#E53935] animate-pulse' />
        <div className='w-16 h-16 bg-[#FDD835] animate-pulse' style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <div className='w-16 h-16 bg-[#1E88E5] animate-pulse' />
      </div>

      {/* 404 文字 */}
      <h1 className='text-9xl font-black text-[#212121] dark:text-[#FAFAFA]'>
        404
      </h1>

      <p className='text-xl text-[#9E9E9E] uppercase tracking-wider'>
        Page Not Found
      </p>

      {/* 返回首页 */}
      <SmartLink href='/'>
        <button className='px-8 py-4 bg-[#212121] dark:bg-[#FAFAFA] text-[#FAFAFA] dark:text-[#212121] font-bold uppercase tracking-widest hover:bg-[#1E88E5] hover:text-[#FAFAFA] transition-colors'>
          Back to Home
        </button>
      </SmartLink>
    </div>
  )
}

/**
 * 分类列表页
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  const { locale } = useGlobal()

  return (
    <div>
      <SectionTitle title={locale.COMMON.CATEGORY} color='#FDD835' />
      
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {categoryOptions?.map((category, index) => (
          <SmartLink key={category.name} href={`/category/${category.name}`}>
            <div className='group border-2 border-[#212121] dark:border-[#FAFAFA] p-6 hover:-translate-y-1 transition-transform'>
              <div 
                className='w-4 h-4 mb-4'
                style={{ backgroundColor: ['#E53935', '#FDD835', '#1E88E5'][index % 3] }}
              />
              <h3 className='font-bold text-[#212121] dark:text-[#FAFAFA] group-hover:text-[#1E88E5] dark:group-hover:text-[#FDD835] transition-colors'>
                {category.name}
              </h3>
              <span className='text-sm text-[#9E9E9E]'>
                {category.count} posts
              </span>
            </div>
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

/**
 * 标签列表页
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()

  return (
    <div>
      <SectionTitle title={locale.COMMON.TAGS} color='#1E88E5' />
      
      <div className='flex flex-wrap gap-3'>
        {tagOptions?.map((tag, index) => (
          <SmartLink key={tag.name} href={`/tag/${tag.name}`}>
            <span 
              className='inline-flex items-center space-x-2 px-4 py-2 border-2 border-[#212121] dark:border-[#FAFAFA] font-bold text-[#212121] dark:text-[#FAFAFA] hover:bg-[#212121] hover:text-[#FAFAFA] dark:hover:bg-[#FAFAFA] dark:hover:text-[#212121] transition-colors'>
              <span 
                className='w-2 h-2'
                style={{ backgroundColor: ['#E53935', '#FDD835', '#1E88E5'][index % 3] }}
              />
              <span>{tag.name}</span>
              <span className='text-[#9E9E9E] text-sm'>({tag.count})</span>
            </span>
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

/**
 * 区块标题组件
 */
function SectionTitle({ title, color }) {
  return (
    <div className='flex items-center space-x-4 mb-8'>
      <div className='w-4 h-4' style={{ backgroundColor: color }} />
      <h2 className='text-2xl font-black text-[#212121] dark:text-[#FAFAFA] uppercase tracking-wider'>
        {title}
      </h2>
      <div className='flex-1 h-0.5 bg-[#212121] dark:bg-[#FAFAFA] opacity-20' />
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
