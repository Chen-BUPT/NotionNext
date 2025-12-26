import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import CopyRightDate from '@/components/CopyRightDate'
import PoweredBy from '@/components/PoweredBy'
import { siteConfig } from '@/lib/config'
import SocialButton from './SocialButton'

/**
 * Bauhaus 页脚
 * 几何装饰 + 极简信息
 */
const Footer = () => {
  const BEI_AN = siteConfig('BEI_AN')
  const BEI_AN_LINK = siteConfig('BEI_AN_LINK')

  return (
    <footer className='relative mt-20'>
      {/* 几何装饰带 */}
      <div className='h-24 flex'>
        <div className='flex-1 bg-[#E53935]' />
        <div className='flex-1 bg-[#FDD835]' />
        <div className='flex-1 bg-[#1E88E5]' />
      </div>

      {/* 主体内容 */}
      <div className='bg-[#212121] text-[#FAFAFA] py-12'>
        <div className='max-w-6xl mx-auto px-6'>
          {/* 上部分 - 几何图形装饰 */}
          <div className='flex justify-center space-x-8 mb-8'>
            <div className='w-12 h-12 rounded-full border-2 border-[#E53935]' />
            <div 
              className='w-12 h-12 border-2 border-[#FDD835]'
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} 
            />
            <div className='w-12 h-12 border-2 border-[#1E88E5]' />
          </div>

          {/* 社交按钮 */}
          <div className='flex justify-center mb-8'>
            <SocialButton />
          </div>

          {/* 分隔线 */}
          <div className='h-0.5 bg-[#FAFAFA] opacity-20 mb-8' />

          {/* 底部信息 */}
          <div className='flex flex-col md:flex-row justify-between items-center text-sm text-[#9E9E9E] space-y-4 md:space-y-0'>
            <div className='flex items-center space-x-2'>
              <CopyRightDate />
              <span>·</span>
              <span className='font-bold text-[#FAFAFA]'>{siteConfig('AUTHOR')}</span>
            </div>

            <div className='flex items-center space-x-4'>
              <PoweredBy />
              {BEI_AN && (
                <a href={BEI_AN_LINK} className='hover:text-[#FAFAFA] transition-colors'>
                  {BEI_AN}
                </a>
              )}
              <BeiAnGongAn />
            </div>
          </div>

          {/* Bauhaus 标语 */}
          <div className='text-center mt-8 text-xs tracking-[0.3em] uppercase text-[#9E9E9E]'>
            Form Follows Function
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
