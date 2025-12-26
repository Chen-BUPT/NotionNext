import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'

/**
 * Bauhaus 分页组件
 * 几何化设计、极简数字
 */
const PaginationNumber = ({ page, totalPage }) => {
  const router = useRouter()
  const currentPage = parseInt(page) || 1

  // 生成页码数组
  const getPageNumbers = () => {
    const pages = []
    const showPages = 5
    let start = Math.max(1, currentPage - Math.floor(showPages / 2))
    let end = Math.min(totalPage, start + showPages - 1)

    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  const getPageUrl = (pageNum) => {
    const { pathname, query } = router
    if (pathname === '/') {
      return pageNum === 1 ? '/' : `/page/${pageNum}`
    }
    return `${pathname}?page=${pageNum}`
  }

  const pages = getPageNumbers()

  return (
    <div className='flex items-center justify-center space-x-2'>
      {/* 上一页 */}
      {currentPage > 1 && (
        <SmartLink href={getPageUrl(currentPage - 1)}>
          <button className='w-10 h-10 flex items-center justify-center border-2 border-[#212121] dark:border-[#FAFAFA] text-[#212121] dark:text-[#FAFAFA] hover:bg-[#212121] hover:text-[#FAFAFA] dark:hover:bg-[#FAFAFA] dark:hover:text-[#212121] transition-colors font-bold'>
            ←
          </button>
        </SmartLink>
      )}

      {/* 页码 */}
      {pages.map((pageNum, index) => (
        <SmartLink key={pageNum} href={getPageUrl(pageNum)}>
          <button
            className={`w-10 h-10 flex items-center justify-center border-2 font-bold transition-colors
              ${pageNum === currentPage
                ? 'bg-[#212121] dark:bg-[#FAFAFA] text-[#FAFAFA] dark:text-[#212121] border-[#212121] dark:border-[#FAFAFA]'
                : 'border-[#212121] dark:border-[#FAFAFA] text-[#212121] dark:text-[#FAFAFA] hover:bg-[#212121] hover:text-[#FAFAFA] dark:hover:bg-[#FAFAFA] dark:hover:text-[#212121]'
              }`}
            style={pageNum === currentPage ? { 
              backgroundColor: ['#E53935', '#FDD835', '#1E88E5'][index % 3],
              borderColor: ['#E53935', '#FDD835', '#1E88E5'][index % 3],
              color: index % 3 === 1 ? '#212121' : '#FAFAFA'
            } : {}}>
            {pageNum}
          </button>
        </SmartLink>
      ))}

      {/* 下一页 */}
      {currentPage < totalPage && (
        <SmartLink href={getPageUrl(currentPage + 1)}>
          <button className='w-10 h-10 flex items-center justify-center border-2 border-[#212121] dark:border-[#FAFAFA] text-[#212121] dark:text-[#FAFAFA] hover:bg-[#212121] hover:text-[#FAFAFA] dark:hover:bg-[#FAFAFA] dark:hover:text-[#212121] transition-colors font-bold'>
            →
          </button>
        </SmartLink>
      )}
    </div>
  )
}

export default PaginationNumber
