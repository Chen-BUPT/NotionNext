import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useEffect, useRef } from 'react'
import SearchInput from './SearchInput'

/**
 * Bauhaus 风格搜索导航页
 * 显示搜索框、分类和标签
 */
export default function SearchNav(props) {
  const { tagOptions, categoryOptions } = props
  const cRef = useRef(null)
  const { locale } = useGlobal()

  useEffect(() => {
    cRef?.current?.focus()
  }, [])

  return (
    <div className='space-y-8'>
      {/* 搜索框 */}
      <SearchInput cRef={cRef} {...props} />

      {/* 分类 */}
      <div className='border-2 border-[#212121] dark:border-[#FAFAFA] p-6'>
        <div className='flex items-center space-x-3 mb-6'>
          <div className='w-3 h-3 bg-[#FDD835]' />
          <h3 className='text-xl font-bold text-[#212121] dark:text-[#FAFAFA] uppercase tracking-wider'>
            {locale.COMMON.CATEGORY}
          </h3>
        </div>
        <div className='flex flex-wrap gap-3'>
          {categoryOptions?.map((category, index) => (
            <SmartLink key={category.name} href={`/category/${category.name}`}>
              <span className='inline-flex items-center space-x-2 px-4 py-2 border-2 border-[#212121] dark:border-[#FAFAFA] text-[#212121] dark:text-[#FAFAFA] hover:bg-[#212121] hover:text-[#FAFAFA] dark:hover:bg-[#FAFAFA] dark:hover:text-[#212121] transition-colors'>
                <span
                  className='w-2 h-2'
                  style={{ backgroundColor: ['#E53935', '#FDD835', '#1E88E5'][index % 3] }}
                />
                <span>{category.name}</span>
                <span className='text-[#9E9E9E]'>({category.count})</span>
              </span>
            </SmartLink>
          ))}
        </div>
      </div>

      {/* 标签 */}
      <div className='border-2 border-[#212121] dark:border-[#FAFAFA] p-6'>
        <div className='flex items-center space-x-3 mb-6'>
          <div className='w-3 h-3 bg-[#1E88E5]' />
          <h3 className='text-xl font-bold text-[#212121] dark:text-[#FAFAFA] uppercase tracking-wider'>
            {locale.COMMON.TAGS}
          </h3>
        </div>
        <div className='flex flex-wrap gap-2'>
          {tagOptions?.map((tag, index) => (
            <SmartLink key={tag.name} href={`/tag/${tag.name}`}>
              <span className='inline-block px-3 py-1 text-sm border border-[#212121] dark:border-[#FAFAFA] text-[#212121] dark:text-[#FAFAFA] hover:bg-[#1E88E5] hover:text-[#FAFAFA] hover:border-[#1E88E5] transition-colors'>
                #{tag.name}
              </span>
            </SmartLink>
          ))}
        </div>
      </div>
    </div>
  )
}
