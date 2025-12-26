import { useGlobal } from '@/lib/global'

/**
 * Bauhaus 搜索按钮
 * 几何图标设计
 */
const SearchButton = props => {
  const { searchModal } = useGlobal()

  const handleClick = () => {
    if (searchModal?.current) {
      searchModal.current.openSearch()
    }
  }

  return (
    <button
      onClick={handleClick}
      className='w-10 h-10 flex items-center justify-center border-2 border-[#212121] dark:border-[#FAFAFA] hover:bg-[#212121] hover:text-[#FAFAFA] dark:hover:bg-[#FAFAFA] dark:hover:text-[#212121] transition-colors'
      aria-label='Search'>
      {/* 几何化搜索图标 */}
      <svg 
        className='w-5 h-5' 
        viewBox='0 0 24 24' 
        fill='none' 
        stroke='currentColor' 
        strokeWidth='2'>
        <circle cx='10' cy='10' r='6' />
        <line x1='14.5' y1='14.5' x2='20' y2='20' />
      </svg>
    </button>
  )
}

export default SearchButton
