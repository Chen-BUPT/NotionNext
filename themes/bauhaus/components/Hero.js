import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import CONFIG from '../config'

/**
 * Bauhaus Hero 区域
 * 个人信息 + 社交媒体 + 几何构图
 */
const Hero = props => {
  const { allNavPages } = props
  const router = useRouter()

  const AUTHOR = siteConfig('AUTHOR')
  const BIO = siteConfig('BIO')

  const handleRandomPost = () => {
    if (allNavPages?.length > 0) {
      const randomIndex = Math.floor(Math.random() * allNavPages.length)
      router.push(`/${allNavPages[randomIndex]?.slug}`)
    }
  }

  return (
    <section className='relative min-h-[70vh] flex items-center overflow-hidden bg-[#FAFAFA] dark:bg-[#212121]'>
      {/* 背景几何装饰 */}
      <GeometricBackground />

      {/* 主内容 */}
      <div className='relative z-10 max-w-6xl mx-auto px-6 py-16 w-full'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* 左侧 - 个人信息 */}
          <div className='space-y-6'>
            {/* 作者名称 */}
            <h1 className='text-5xl md:text-7xl font-black tracking-tighter text-[#212121] dark:text-[#FAFAFA] leading-none'>
              {AUTHOR}
            </h1>

            {/* 简介 */}
            {BIO && (
              <p className='text-xl md:text-2xl text-[#9E9E9E]'>
                {BIO}
              </p>
            )}

            {/* 社交媒体 */}
            <div className='pt-4'>
              <SocialLinks />
            </div>

            {/* 按钮组 */}
            <div className='flex flex-wrap gap-4 pt-4'>
              <SmartLink href='/archive'>
                <button className='px-8 py-4 bg-[#212121] dark:bg-[#FAFAFA] text-[#FAFAFA] dark:text-[#212121] font-bold uppercase tracking-widest hover:bg-[#1E88E5] hover:text-[#FAFAFA] transition-colors'>
                  探索文章
                </button>
              </SmartLink>
              <button 
                onClick={handleRandomPost}
                className='px-8 py-4 border-2 border-[#212121] dark:border-[#FAFAFA] text-[#212121] dark:text-[#FAFAFA] font-bold uppercase tracking-widest hover:bg-[#E53935] hover:border-[#E53935] hover:text-[#FAFAFA] transition-colors'>
                随机阅读
              </button>
            </div>
          </div>

          {/* 右侧几何构图 */}
          <div className='hidden lg:block relative h-[400px]'>
            <GeometricComposition />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * 社交媒体链接
 */
function SocialLinks() {
  const socialLinks = [
    { key: 'CONTACT_GITHUB', icon: 'fab fa-github', label: 'GitHub', color: '#E53935' },
    { key: 'CONTACT_TWITTER', icon: 'fab fa-twitter', label: 'Twitter', color: '#1E88E5' },
    { key: 'CONTACT_EMAIL', icon: 'fas fa-envelope', label: 'Email', color: '#FDD835' },
    { key: 'CONTACT_BILIBILI', icon: 'fab fa-bilibili', label: 'Bilibili', color: '#E53935' },
    { key: 'CONTACT_WEIBO', icon: 'fab fa-weibo', label: 'Weibo', color: '#E53935' },
    { key: 'CONTACT_TELEGRAM', icon: 'fab fa-telegram', label: 'Telegram', color: '#1E88E5' },
    { key: 'CONTACT_LINKEDIN', icon: 'fab fa-linkedin', label: 'LinkedIn', color: '#1E88E5' },
    { key: 'CONTACT_INSTAGRAM', icon: 'fab fa-instagram', label: 'Instagram', color: '#E53935' },
    { key: 'CONTACT_YOUTUBE', icon: 'fab fa-youtube', label: 'YouTube', color: '#E53935' },
    { key: 'CONTACT_XIAOHONGSHU', icon: 'fas fa-heart', label: '小红书', color: '#E53935' }
  ]

  const activeSocials = socialLinks.filter(s => siteConfig(s.key))

  if (activeSocials.length === 0) return null

  return (
    <div className='flex flex-wrap gap-3'>
      {activeSocials.map((social) => {
        const isEmail = social.key === 'CONTACT_EMAIL'
        const href = isEmail 
          ? `mailto:${atob(siteConfig(social.key))}` 
          : siteConfig(social.key)

        return (
          <a
            key={social.key}
            href={href}
            target={isEmail ? '_self' : '_blank'}
            rel='noopener noreferrer'
            className='group flex items-center space-x-2 px-4 py-2 border-2 border-[#212121] dark:border-[#FAFAFA] hover:text-[#FAFAFA] transition-all duration-300'
            style={{ '--hover-bg': social.color }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = social.color}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            aria-label={social.label}>
            <i className={`${social.icon} text-lg`} />
            <span className='text-sm font-bold uppercase tracking-wider'>{social.label}</span>
          </a>
        )
      })}
    </div>
  )
}

/**
 * 背景几何装饰
 */
function GeometricBackground() {
  return (
    <div className='absolute inset-0 overflow-hidden opacity-10 dark:opacity-5'>
      {/* 大圆 */}
      <div className='absolute -top-20 -right-20 w-96 h-96 rounded-full border-[40px] border-[#E53935]' />
      {/* 斜线 */}
      <div className='absolute top-1/2 left-0 w-full h-1 bg-[#212121] dark:bg-[#FAFAFA] transform -rotate-12' />
      {/* 小方块 */}
      <div className='absolute bottom-20 left-20 w-32 h-32 bg-[#1E88E5]' />
    </div>
  )
}

/**
 * 几何构图 - 包豪斯风格
 */
function GeometricComposition() {
  return (
    <div className='relative w-full h-full'>
      {/* 大圆 - 红色 */}
      <div className='absolute top-0 right-0 w-64 h-64 rounded-full bg-[#E53935] bauhaus-animate-pulse' />
      
      {/* 三角形 - 黄色 */}
      <div 
        className='absolute bottom-0 left-0 w-48 h-48 bg-[#FDD835]'
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
      />
      
      {/* 正方形 - 蓝色 */}
      <div className='absolute top-1/2 left-1/4 w-40 h-40 bg-[#1E88E5] transform -translate-y-1/2' />
      
      {/* 线条装饰 */}
      <div className='absolute top-20 left-0 w-full h-1 bg-[#212121] dark:bg-[#FAFAFA]' />
      <div className='absolute bottom-32 right-0 w-2/3 h-1 bg-[#212121] dark:bg-[#FAFAFA]' />
      
      {/* 小圆 - 黑色轮廓 */}
      <div className='absolute bottom-20 right-20 w-20 h-20 rounded-full border-4 border-[#212121] dark:border-[#FAFAFA]' />
      
      {/* 小方块 - 黑色 */}
      <div className='absolute top-32 left-10 w-12 h-12 bg-[#212121] dark:bg-[#FAFAFA]' />
    </div>
  )
}

export default Hero
