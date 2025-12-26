import { siteConfig } from '@/lib/config'

/**
 * Bauhaus 社交按钮
 * 几何化图标设计
 */
const SocialButton = () => {
  const socialLinks = [
    { key: 'CONTACT_GITHUB', icon: 'github', label: 'GitHub' },
    { key: 'CONTACT_TWITTER', icon: 'twitter', label: 'Twitter' },
    { key: 'CONTACT_EMAIL', icon: 'email', label: 'Email' },
    { key: 'CONTACT_BILIBILI', icon: 'bilibili', label: 'Bilibili' },
    { key: 'CONTACT_WEIBO', icon: 'weibo', label: 'Weibo' }
  ]

  const activeSocials = socialLinks.filter(s => siteConfig(s.key))

  if (activeSocials.length === 0) return null

  return (
    <div className='flex items-center justify-center space-x-4'>
      {activeSocials.map(social => (
        <a
          key={social.key}
          href={social.key === 'CONTACT_EMAIL' ? `mailto:${atob(siteConfig(social.key))}` : siteConfig(social.key)}
          target='_blank'
          rel='noopener noreferrer'
          className='w-10 h-10 flex items-center justify-center border-2 border-[#FAFAFA] text-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-[#212121] transition-colors'
          aria-label={social.label}>
          <SocialIcon type={social.icon} />
        </a>
      ))}
    </div>
  )
}

/**
 * 几何化社交图标
 */
function SocialIcon({ type }) {
  const iconClass = 'w-5 h-5'
  
  switch (type) {
    case 'github':
      return <i className={`fab fa-github ${iconClass}`} />
    case 'twitter':
      return <i className={`fab fa-twitter ${iconClass}`} />
    case 'email':
      return <i className={`fas fa-envelope ${iconClass}`} />
    case 'bilibili':
      return <i className={`fab fa-bilibili ${iconClass}`} />
    case 'weibo':
      return <i className={`fab fa-weibo ${iconClass}`} />
    default:
      return <i className={`fas fa-link ${iconClass}`} />
  }
}

export default SocialButton
