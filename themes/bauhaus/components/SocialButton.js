import { siteConfig } from '@/lib/config'

/**
 * Bauhaus 社交按钮
 * 更大更显眼的设计
 */
const SocialButton = () => {
  const socialLinks = [
    { key: 'CONTACT_GITHUB', icon: 'fab fa-github', label: 'GitHub' },
    { key: 'CONTACT_TWITTER', icon: 'fab fa-twitter', label: 'Twitter' },
    { key: 'CONTACT_EMAIL', icon: 'fas fa-envelope', label: 'Email' },
    { key: 'CONTACT_BILIBILI', icon: 'fab fa-bilibili', label: 'Bilibili' },
    { key: 'CONTACT_WEIBO', icon: 'fab fa-weibo', label: 'Weibo' },
    { key: 'CONTACT_TELEGRAM', icon: 'fab fa-telegram', label: 'Telegram' },
    { key: 'CONTACT_LINKEDIN', icon: 'fab fa-linkedin', label: 'LinkedIn' },
    { key: 'CONTACT_INSTAGRAM', icon: 'fab fa-instagram', label: 'Instagram' },
    { key: 'CONTACT_YOUTUBE', icon: 'fab fa-youtube', label: 'YouTube' },
    { key: 'CONTACT_XIAOHONGSHU', icon: 'fas fa-heart', label: '小红书' }
  ]

  const activeSocials = socialLinks.filter(s => siteConfig(s.key))

  if (activeSocials.length === 0) return null

  // 为每个社交按钮分配颜色
  const colors = ['#E53935', '#FDD835', '#1E88E5']

  return (
    <div className='flex items-center justify-center flex-wrap gap-4'>
      {activeSocials.map((social, index) => {
        const color = colors[index % 3]
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
            className='group flex flex-col items-center'
            aria-label={social.label}>
            {/* 图标按钮 */}
            <div 
              className='w-14 h-14 flex items-center justify-center border-2 text-[#FAFAFA] transition-all duration-300 hover:scale-110'
              style={{ borderColor: color }}
            >
              <i className={`${social.icon} text-xl group-hover:scale-110 transition-transform`} />
            </div>
            {/* 标签 */}
            <span className='mt-2 text-xs text-[#9E9E9E] group-hover:text-[#FAFAFA] transition-colors'>
              {social.label}
            </span>
          </a>
        )
      })}
    </div>
  )
}

export default SocialButton
