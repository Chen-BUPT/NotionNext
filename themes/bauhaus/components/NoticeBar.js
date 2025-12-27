import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import Swipe from './Swipe'

/**
 * Bauhaus 风格通知横幅
 * 几何设计 + 三原色装饰
 */
export function NoticeBar() {
  let notices = siteConfig('BAUHAUS_NOTICE_BAR', null, CONFIG)
  const { locale } = useGlobal()
  
  if (typeof notices === 'string') {
    notices = JSON.parse(notices)
  }
  if (!notices || notices?.length === 0) {
    return <></>
  }

  return (
    <div className='max-w-6xl w-full mx-auto flex h-12 mb-6 px-6 font-bold'>
      <div className='group cursor-pointer bg-[#FAFAFA] dark:bg-[#212121] border-2 border-[#212121] dark:border-[#FAFAFA] hover:border-[#1E88E5] dark:hover:border-[#FDD835] transition-colors w-full h-full flex items-center justify-between px-5'>
        {/* 左侧几何装饰 */}
        <div className='flex items-center space-x-2'>
          <div className='w-3 h-3 bg-[#E53935]' />
          <span className='whitespace-nowrap text-[#212121] dark:text-[#FAFAFA] uppercase tracking-wider text-sm'>
            {locale.COMMON.NOW || 'Notice'}
          </span>
        </div>
        
        {/* 中间滚动内容 */}
        <div className='w-full h-full text-[#212121] dark:text-[#FAFAFA] hover:text-[#1E88E5] dark:hover:text-[#FDD835] flex justify-center items-center transition-colors'>
          <Swipe items={notices} />
        </div>
        
        {/* 右侧几何装饰 */}
        <div className='flex items-center space-x-1'>
          <div className='w-2 h-2 bg-[#FDD835]' />
          <div className='w-2 h-2 bg-[#1E88E5]' />
        </div>
      </div>
    </div>
  )
}

export default NoticeBar
