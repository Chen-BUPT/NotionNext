import { useGlobal } from '@/lib/global'
import { useCallback, useEffect, useRef, useState } from 'react'
import throttle from 'lodash.throttle'
import BlogPostCard from './BlogPostCard'
import { siteConfig } from '@/lib/config'

/**
 * Bauhaus 文章列表 - 无限滚动模式
 */
const BlogPostListScroll = props => {
  const { posts, siteInfo } = props
  const postsPerPage = siteConfig('POSTS_PER_PAGE')
  const [displayedPosts, setDisplayedPosts] = useState(posts?.slice(0, postsPerPage) || [])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(posts?.length > postsPerPage)
  const loadingRef = useRef(false)

  const loadMore = useCallback(() => {
    if (loadingRef.current || !hasMore) return
    loadingRef.current = true

    const nextPage = page + 1
    const start = page * postsPerPage
    const end = start + postsPerPage
    const newPosts = posts?.slice(start, end) || []

    if (newPosts.length > 0) {
      setDisplayedPosts(prev => [...prev, ...newPosts])
      setPage(nextPage)
      setHasMore(end < posts?.length)
    } else {
      setHasMore(false)
    }

    loadingRef.current = false
  }, [page, posts, postsPerPage, hasMore])

  const handleScroll = useCallback(
    throttle(() => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight

      if (scrollTop + clientHeight >= scrollHeight - 500) {
        loadMore()
      }
    }, 200),
    [loadMore]
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    setDisplayedPosts(posts?.slice(0, postsPerPage) || [])
    setPage(1)
    setHasMore(posts?.length > postsPerPage)
  }, [posts, postsPerPage])

  if (!displayedPosts || displayedPosts.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-20'>
        <p className='text-xl font-bold text-[#9E9E9E] uppercase tracking-wider'>
          No Posts Found
        </p>
      </div>
    )
  }

  return (
    <div className='space-y-12'>
      {/* 文章网格 */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {displayedPosts.map((post, index) => (
          <BlogPostCard
            key={post.id}
            index={index}
            post={post}
            showSummary={true}
            siteInfo={siteInfo}
          />
        ))}
      </div>

      {/* 加载状态 */}
      {hasMore && (
        <div className='flex justify-center py-8'>
          <div className='flex space-x-2'>
            <div className='w-3 h-3 bg-[#E53935] animate-pulse' />
            <div className='w-3 h-3 bg-[#FDD835] animate-pulse delay-100' />
            <div className='w-3 h-3 bg-[#1E88E5] animate-pulse delay-200' />
          </div>
        </div>
      )}

      {!hasMore && displayedPosts.length > 0 && (
        <div className='text-center py-8'>
          <span className='text-sm text-[#9E9E9E] uppercase tracking-wider'>
            — End —
          </span>
        </div>
      )}
    </div>
  )
}

export default BlogPostListScroll
