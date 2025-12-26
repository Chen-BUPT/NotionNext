import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'

/**
 * Bauhaus Logo 组件
 * 几何化的品牌标识
 */
const Logo = props => {
  const { siteInfo } = props
  const title = siteConfig('TITLE') || siteInfo?.title

  return (
    <SmartLink href='/' className='flex items-center space-x-3 group'>
      {/* 几何 Logo 标记 */}
      <div className='relative w-10 h-10'>
        {/* 圆形 - 红色 */}
        <div className='absolute top-0 left-0 w-5 h-5 rounded-full bg-[#E53935] group-hover:scale-110 transition-transform' />
        {/* 三角形 - 黄色 */}
        <div 
          className='absolute bottom-0 left-0 w-5 h-5 bg-[#FDD835] group-hover:scale-110 transition-transform'
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} 
        />
        {/* 正方形 - 蓝色 */}
        <div className='absolute bottom-0 right-0 w-5 h-5 bg-[#1E88E5] group-hover:scale-110 transition-transform' />
      </div>

      {/* 站点名称 */}
      <span className='text-xl font-black tracking-tight text-[#212121] dark:text-[#FAFAFA] uppercase'>
        {title}
      </span>
    </SmartLink>
  )
}

export default Logo
