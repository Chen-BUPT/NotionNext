import { useGlobal } from '@/lib/global'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import { useState } from 'react'

/**
 * Bauhaus 顶部菜单
 * 极简水平导航、几何悬停效果，支持子菜单
 */
const MenuListTop = props => {
  const { customMenu } = props
  const { locale } = useGlobal()

  const defaultLinks = [
    { name: locale.NAV.INDEX, href: '/', show: true },
    { name: locale.COMMON.CATEGORY, href: '/category', show: true },
    { name: locale.COMMON.TAGS, href: '/tag', show: true },
    { name: locale.NAV.ARCHIVE, href: '/archive', show: true }
  ]

  const links = siteConfig('CUSTOM_MENU') ? customMenu : defaultLinks

  return (
    <nav className='flex items-center space-x-1'>
      {links?.map((link, index) => (
        link && link.show && <MenuItem key={index} link={link} />
      ))}
    </nav>
  )
}

/**
 * 菜单项组件，支持子菜单
 */
const MenuItem = ({ link }) => {
  const [show, setShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

  return (
    <div
      className='relative'
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}>
      {/* 不含子菜单 */}
      {!hasSubMenu && (
        <SmartLink href={link.href || link.to} target={link?.target}>
          <span className='relative px-4 py-2 text-sm font-bold uppercase tracking-wider text-[#212121] dark:text-[#FAFAFA] hover:text-[#1E88E5] dark:hover:text-[#FDD835] transition-colors group'>
            {link.name || link.title}
            <span className='absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#E53935] group-hover:w-full group-hover:left-0 transition-all duration-300' />
          </span>
        </SmartLink>
      )}

      {/* 含子菜单的按钮 */}
      {hasSubMenu && (
        <div className='relative px-4 py-2 text-sm font-bold uppercase tracking-wider text-[#212121] dark:text-[#FAFAFA] hover:text-[#1E88E5] dark:hover:text-[#FDD835] transition-colors cursor-pointer group'>
          <span className='flex items-center space-x-1'>
            <span>{link.name || link.title}</span>
            <svg className={`w-3 h-3 transition-transform ${show ? 'rotate-180' : ''}`} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <polyline points='6 9 12 15 18 9' />
            </svg>
          </span>
          <span className='absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#E53935] group-hover:w-full group-hover:left-0 transition-all duration-300' />
          {/* 安全区域 */}
          {show && <div className='absolute w-full h-4 -bottom-2 left-0' />}
        </div>
      )}

      {/* 子菜单下拉 */}
      {hasSubMenu && (
        <ul
          className={`${show ? 'visible opacity-100 top-full' : 'invisible opacity-0 top-12'} 
            absolute left-0 z-50 min-w-[160px] border-2 border-[#212121] dark:border-[#FAFAFA] 
            bg-[#FAFAFA] dark:bg-[#212121] transition-all duration-200`}>
          {/* 顶部三原色装饰 */}
          <div className='h-0.5 flex'>
            <div className='flex-1 bg-[#E53935]' />
            <div className='flex-1 bg-[#FDD835]' />
            <div className='flex-1 bg-[#1E88E5]' />
          </div>
          {link.subMenus.map((subLink, index) => (
            <li key={index}>
              <SmartLink href={subLink.href} target={subLink?.target}>
                <div className='flex items-center space-x-2 px-4 py-2 text-sm text-[#212121] dark:text-[#FAFAFA] hover:bg-[#212121] hover:text-[#FAFAFA] dark:hover:bg-[#FAFAFA] dark:hover:text-[#212121] transition-colors'>
                  <span
                    className='w-2 h-2'
                    style={{ backgroundColor: ['#E53935', '#FDD835', '#1E88E5'][index % 3] }}
                  />
                  <span>{subLink.title || subLink.name}</span>
                </div>
              </SmartLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MenuListTop
