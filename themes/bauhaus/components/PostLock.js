import { useGlobal } from '@/lib/global'
import { useState } from 'react'

/**
 * Bauhaus 文章密码锁
 * 几何化输入框设计
 */
const PostLock = ({ validPassword }) => {
  const [password, setPassword] = useState('')
  const { locale } = useGlobal()

  const handleSubmit = (e) => {
    e.preventDefault()
    validPassword(password)
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] px-6'>
      {/* 几何装饰 */}
      <div className='flex space-x-4 mb-8'>
        <div className='w-12 h-12 rounded-full bg-[#E53935]' />
        <div className='w-12 h-12 bg-[#FDD835]' style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <div className='w-12 h-12 bg-[#1E88E5]' />
      </div>

      {/* 标题 */}
      <h2 className='text-2xl font-black text-[#212121] dark:text-[#FAFAFA] uppercase tracking-wider mb-8'>
        {locale.COMMON.ARTICLE_LOCK_TIPS || 'Password Required'}
      </h2>

      {/* 密码表单 */}
      <form onSubmit={handleSubmit} className='w-full max-w-sm space-y-4'>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter password'
          className='w-full px-4 py-3 border-2 border-[#212121] dark:border-[#FAFAFA] bg-transparent text-[#212121] dark:text-[#FAFAFA] font-mono focus:outline-none focus:border-[#1E88E5]'
        />
        <button
          type='submit'
          className='w-full px-4 py-3 bg-[#212121] dark:bg-[#FAFAFA] text-[#FAFAFA] dark:text-[#212121] font-bold uppercase tracking-wider hover:bg-[#1E88E5] hover:text-[#FAFAFA] transition-colors'>
          {locale.COMMON.SUBMIT || 'Submit'}
        </button>
      </form>
    </div>
  )
}

export { PostLock }
