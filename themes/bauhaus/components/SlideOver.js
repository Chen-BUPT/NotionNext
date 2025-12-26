import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useImperativeHandle, useState } from 'react'

/**
 * Bauhaus 移动端侧边抽屉
 * 全屏覆盖、几何装饰
 */
const SlideOver = ({ cRef, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { customMenu, locale } = useGlobal()

  useImperativeHandle(cRef, () => ({
    toggleSlideOvers: () => setIsOpen(!isOpen)
  }))

  const defaultLinks = [
    { name: locale.NAV.INDEX, href: '/' },
    { name: locale.COMMON.CATEGORY, href: '/category' },
    { name: locale.COMMON.TAGS, href: '/tag' },
    { name: locale.NAV.ARCHIVE, href: '/archive' }
  ]

  const links = customMenu || defaultLinks

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50'>
      {/* 背景遮罩 */}
      <div 
        className='absolute inset-0 bg-[#212121] bg-opacity-90'
        onClick={() => setIsOpen(false)}
      />

      {/* 侧边栏内容 */}
      <div className='absolute right-0 top-0 h-full w-80 bg-[#FAFAFA] dark:bg-[#212121] border-l-2 border-[#212121] dark:border-[#FAFAFA]'>
        {/* 顶部装饰 */}
        <div className='h-1 flex'>
          <div className='flex-1 bg-[#E53935]' />
          <div className='flex-1 bg-[#FDD835]' />
          <div className='flex-1 bg-[#1E88E5]' />
        </div>

        {/* 关闭按钮 */}
        <div className='flex justify-end p-4'>
          <button
            onClick={() => setIsOpen(false)}
            className='w-10 h-10 flex items-center justify-center border-2 border-[#212121] dark:border-[#FAFAFA]'
            aria-label='Close menu'>
            <svg className='w-5 h-5' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
              <line x1='6' y1='6' x2='18' y2='18' />
              <line x1='6' y1='18' x2='18' y2='6' />
            </svg>
          </button>
        </div>

        {/* 菜单列表 */}
        <nav className='px-6 py-8 space-y-6'>
          {links.map((link, index) => (
            <SmartLink key={index} href={link.href || link.to}>
              <div 
                onClick={() => setIsOpen(false)}
                className='flex items-center space-x-4 group'>
                {/* 几何标记 */}
                <div 
                  className='w-3 h-3 transition-transform group-hover:scale-150'
                  style={{ 
                    backgroundColor: ['#E53935', '#FDD835', '#1E88E5'][index % 3]
                  }}
                />
                <span className='text-xl font-bold uppercase tracking-wider text-[#212121] dark:text-[#FAFAFA] group-hover:text-[#1E88E5] dark:group-hover:text-[#FDD835] transition-colors'>
                  {link.name || link.title}
                </span>
              </div>
            </SmartLink>
          ))}
        </nav>

        {/* 底部几何装饰 */}
        <div className='absolute bottom-8 left-6 right-6'>
          <div className='flex justify-center space-x-4'>
            <div className='w-8 h-8 rounded-full border-2 border-[#E53935]' />
            <div className='w-8 h-8 border-2 border-[#FDD835]' style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
            <div className='w-8 h-8 border-2 border-[#1E88E5]' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SlideOver
