import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'

/**
 * Bauhaus 上一篇/下一篇文章导航
 * 几何化卡片设计
 */
const PostAdjacent = ({ prev, next }) => {
  const { locale } = useGlobal()

  if (!prev && !next) return null

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-12'>
      {/* 上一篇 */}
      {prev ? (
        <SmartLink href={`/${prev.slug}`}>
          <div className='group border-2 border-[#212121] dark:border-[#FAFAFA] p-6 hover:-translate-y-1 transition-transform'>
            <div className='flex items-center space-x-2 mb-3'>
              <div className='w-2 h-2 bg-[#E53935]' />
              <span className='text-xs font-bold uppercase tracking-wider text-[#9E9E9E]'>
                {locale.POST.PREV_POST || 'Previous'}
              </span>
            </div>
            <h4 className='font-bold text-[#212121] dark:text-[#FAFAFA] group-hover:text-[#1E88E5] dark:group-hover:text-[#FDD835] transition-colors line-clamp-2'>
              ← {prev.title}
            </h4>
          </div>
        </SmartLink>
      ) : (
        <div />
      )}

      {/* 下一篇 */}
      {next ? (
        <SmartLink href={`/${next.slug}`}>
          <div className='group border-2 border-[#212121] dark:border-[#FAFAFA] p-6 hover:-translate-y-1 transition-transform text-right'>
            <div className='flex items-center justify-end space-x-2 mb-3'>
              <span className='text-xs font-bold uppercase tracking-wider text-[#9E9E9E]'>
                {locale.POST.NEXT_POST || 'Next'}
              </span>
              <div className='w-2 h-2 bg-[#1E88E5]' />
            </div>
            <h4 className='font-bold text-[#212121] dark:text-[#FAFAFA] group-hover:text-[#1E88E5] dark:group-hover:text-[#FDD835] transition-colors line-clamp-2'>
              {next.title} →
            </h4>
          </div>
        </SmartLink>
      ) : (
        <div />
      )}
    </div>
  )
}

export default PostAdjacent
