import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'

/**
 * Bauhaus 顶部菜单
 * 极简水平导航、几何悬停效果
 */
const MenuListTop = props => {
  const { customMenu } = props
  const { locale } = useGlobal()

  const defaultLinks = [
    { name: locale.NAV.INDEX, href: '/' },
    { name: locale.COMMON.CATEGORY, href: '/category' },
    { name: locale.COMMON.TAGS, href: '/tag' },
    { name: locale.NAV.ARCHIVE, href: '/archive' }
  ]

  const links = customMenu || defaultLinks

  return (
    <nav className='flex items-center space-x-1'>
      {links.map((link, index) => (
        <SmartLink key={index} href={link.href || link.to}>
          <span className='relative px-4 py-2 text-sm font-bold uppercase tracking-wider text-[#212121] dark:text-[#FAFAFA] hover:text-[#1E88E5] dark:hover:text-[#FDD835] transition-colors group'>
            {link.name || link.title}
            {/* 底部装饰线 */}
            <span className='absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#E53935] group-hover:w-full group-hover:left-0 transition-all duration-300' />
          </span>
        </SmartLink>
      ))}
    </nav>
  )
}

export default MenuListTop
