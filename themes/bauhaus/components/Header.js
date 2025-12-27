import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import MenuListTop from './MenuListTop'
import SearchButton from './SearchButton'
import SlideOver from './SlideOver'

/**
 * Bauhaus 主题顶部导航
 * 设计理念：水平线条、几何元素、极简布局
 */
const Header = props => {
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const slideOverRef = useRef()

  const toggleMenu = () => {
    slideOverRef?.current?.toggleSlideOvers()
  }

  const handleScroll = useCallback(
    throttle(() => {
      setIsScrolled(window.scrollY > 10)
    }, 100),
    []
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <>
      {/* 占位高度 */}
      <div className='h-16' />

      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300
          ${isScrolled 
            ? 'bg-[#FAFAFA] dark:bg-[#212121] border-b-2 border-[#212121] dark:border-[#FAFAFA]' 
            : 'bg-transparent'
          }`}>
        
        {/* 顶部装饰条 - 三原色 */}
        <div className='absolute top-0 left-0 right-0 h-1 flex'>
          <div className='flex-1 bg-[#E53935]' />
          <div className='flex-1 bg-[#FDD835]' />
          <div className='flex-1 bg-[#1E88E5]' />
        </div>

        <nav className='h-full max-w-6xl mx-auto px-6 flex items-center justify-between'>
          {/* Logo */}
          <Logo {...props} />

          {/* 中间菜单 - 桌面端 */}
          <div className='hidden lg:flex items-center space-x-8'>
            <MenuListTop {...props} />
          </div>

          {/* 右侧工具栏 */}
          <div className='flex items-center space-x-4'>
            <SearchButton {...props} />
            
            {/* 移动端菜单按钮 - 几何图形 */}
            <button
              onClick={toggleMenu}
              className='lg:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1.5'
              aria-label='Menu'>
              <span className='w-6 h-0.5 bg-[#212121] dark:bg-[#FAFAFA]' />
              <span className='w-6 h-0.5 bg-[#212121] dark:bg-[#FAFAFA]' />
              <span className='w-6 h-0.5 bg-[#212121] dark:bg-[#FAFAFA]' />
            </button>
          </div>
        </nav>

        {/* 移动端侧边栏 */}
        <SlideOver cRef={slideOverRef} {...props} />
      </header>
    </>
  )
}

export default Header
