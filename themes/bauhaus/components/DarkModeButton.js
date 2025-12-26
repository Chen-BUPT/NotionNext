import { useGlobal } from '@/lib/global'

/**
 * Bauhaus 暗色模式切换按钮
 * 几何图标：圆形代表太阳/月亮
 */
const DarkModeButton = () => {
  const { isDarkMode, updateDarkMode } = useGlobal()

  const handleToggle = () => {
    updateDarkMode(!isDarkMode)
  }

  return (
    <button
      onClick={handleToggle}
      className='w-10 h-10 flex items-center justify-center border-2 border-[#212121] dark:border-[#FAFAFA] hover:bg-[#212121] hover:text-[#FAFAFA] dark:hover:bg-[#FAFAFA] dark:hover:text-[#212121] transition-colors'
      aria-label='Toggle dark mode'>
      {isDarkMode ? (
        // 太阳 - 圆形 + 射线
        <svg className='w-5 h-5' viewBox='0 0 24 24' fill='currentColor'>
          <circle cx='12' cy='12' r='5' />
          <rect x='11' y='1' width='2' height='4' />
          <rect x='11' y='19' width='2' height='4' />
          <rect x='1' y='11' width='4' height='2' />
          <rect x='19' y='11' width='4' height='2' />
        </svg>
      ) : (
        // 月亮 - 圆形缺口
        <svg className='w-5 h-5' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z' />
        </svg>
      )}
    </button>
  )
}

export default DarkModeButton
