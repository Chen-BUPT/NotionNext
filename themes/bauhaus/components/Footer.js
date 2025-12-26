import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import CopyRightDate from '@/components/CopyRightDate'
import PoweredBy from '@/components/PoweredBy'
import { siteConfig } from '@/lib/config'

/**
 * Bauhaus 页脚
 * 极简设计，个人信息已移至 Hero
 */
const Footer = () => {
  const BEI_AN = siteConfig('BEI_AN')
  const BEI_AN_LINK = siteConfig('BEI_AN_LINK')
  const AUTHOR = siteConfig('AUTHOR')

  return (
    <footer className='relative mt-20'>
      {/* 几何装饰带 */}
      <div className='h-16 flex'>
        <div className='flex-1 bg-[#E53935]' />
        <div className='flex-1 bg-[#FDD835]' />
        <div className='flex-1 bg-[#1E88E5]' />
      </div>

      {/* 底部信息 */}
      <div className='bg-[#212121] text-[#FAFAFA] py-8'>
        <div className='max-w-6xl mx-auto px-6'>
          <div className='flex flex-col md:flex-row justify-between items-center text-sm text-[#9E9E9E] space-y-4 md:space-y-0'>
            <div className='flex items-center space-x-2'>
              <CopyRightDate />
              <span>·</span>
              <span className='font-bold text-[#FAFAFA]'>{AUTHOR}</span>
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
          <div className='text-center mt-6 text-xs tracking-[0.3em] uppercase text-[#9E9E9E]'>
            Form Follows Function
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
