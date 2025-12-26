import { useEffect, useState } from 'react'
import throttle from 'lodash.throttle'

/**
 * Bauhaus 文章目录
 * 极简线条设计
 */
const Catalog = ({ toc }) => {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const handleScroll = throttle(() => {
      const headings = document.querySelectorAll('h1[id], h2[id], h3[id]')
      let currentId = ''

      headings.forEach(heading => {
        const rect = heading.getBoundingClientRect()
        if (rect.top <= 100) {
          currentId = heading.id
        }
      })

      setActiveId(currentId)
    }, 100)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!toc || toc.length === 0) return null

  const handleClick = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className='border-2 border-[#212121] dark:border-[#FAFAFA]'>
      {/* 标题 */}
      <div className='flex items-center space-x-3 p-4 border-b-2 border-[#212121] dark:border-[#FAFAFA]'>
        <div className='w-3 h-3 bg-[#1E88E5]' />
        <span className='text-sm font-black uppercase tracking-wider text-[#212121] dark:text-[#FAFAFA]'>
          Contents
        </span>
      </div>

      {/* 目录列表 */}
      <div className='p-4 max-h-96 overflow-y-auto'>
        <ul className='space-y-2'>
          {toc.map((item, index) => (
            <li
              key={index}
              style={{ paddingLeft: `${(item.indentLevel || 0) * 12}px` }}>
              <button
                onClick={() => handleClick(item.id)}
                className={`text-left text-sm transition-colors w-full truncate
                  ${activeId === item.id
                    ? 'text-[#1E88E5] dark:text-[#FDD835] font-bold'
                    : 'text-[#9E9E9E] hover:text-[#212121] dark:hover:text-[#FAFAFA]'
                  }`}>
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Catalog
