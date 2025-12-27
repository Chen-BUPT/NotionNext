import { useRouter } from 'next/router'
import { useImperativeHandle, useRef, useState } from 'react'
import { useGlobal } from '@/lib/global'

let lock = false

/**
 * Bauhaus 风格搜索输入框
 * 几何边框设计
 */
const SearchInput = props => {
  const { currentSearch, cRef, className } = props
  const [onLoading, setLoadingState] = useState(false)
  const router = useRouter()
  const searchInputRef = useRef()
  const { locale } = useGlobal()

  useImperativeHandle(cRef, () => {
    return {
      focus: () => {
        searchInputRef?.current?.focus()
      }
    }
  })

  const handleSearch = () => {
    const key = searchInputRef.current.value
    if (key && key !== '') {
      setLoadingState(true)
      router.push({ pathname: '/search/' + key }).then(() => {
        setLoadingState(false)
      })
    } else {
      router.push({ pathname: '/' })
    }
  }

  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      handleSearch()
    } else if (e.keyCode === 27) {
      cleanSearch()
    }
  }

  const cleanSearch = () => {
    searchInputRef.current.value = ''
    setShowClean(false)
  }

  const [showClean, setShowClean] = useState(false)

  const updateSearchKey = val => {
    if (lock) return
    searchInputRef.current.value = val
    setShowClean(!!val)
  }

  function lockSearchInput() {
    lock = true
  }

  function unLockSearchInput() {
    lock = false
  }

  return (
    <div className={`flex w-full border-2 border-[#212121] dark:border-[#FAFAFA] bg-[#FAFAFA] dark:bg-[#212121] ${className || ''}`}>
      <input
        ref={searchInputRef}
        type='text'
        className='outline-none w-full text-base px-5 py-3 bg-transparent text-[#212121] dark:text-[#FAFAFA] placeholder-[#9E9E9E]'
        onKeyUp={handleKeyUp}
        onCompositionStart={lockSearchInput}
        onCompositionUpdate={lockSearchInput}
        onCompositionEnd={unLockSearchInput}
        placeholder={locale.SEARCH.ARTICLES}
        onChange={e => updateSearchKey(e.target.value)}
        defaultValue={currentSearch || ''}
      />

      {showClean && (
        <button
          className='px-3 text-[#9E9E9E] hover:text-[#E53935] transition-colors'
          onClick={cleanSearch}
          aria-label='Clear'>
          <svg className='w-5 h-5' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2' fill='none'>
            <line x1='6' y1='6' x2='18' y2='18' />
            <line x1='6' y1='18' x2='18' y2='6' />
          </svg>
        </button>
      )}

      <button
        className='px-5 bg-[#212121] dark:bg-[#FAFAFA] text-[#FAFAFA] dark:text-[#212121] hover:bg-[#1E88E5] hover:text-[#FAFAFA] transition-colors'
        onClick={handleSearch}
        aria-label='Search'>
        {onLoading ? (
          <svg className='w-5 h-5 animate-spin' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <circle cx='12' cy='12' r='10' strokeDasharray='32' strokeDashoffset='12' />
          </svg>
        ) : (
          <svg className='w-5 h-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <circle cx='10' cy='10' r='6' />
            <line x1='14.5' y1='14.5' x2='20' y2='20' />
          </svg>
        )}
      </button>
    </div>
  )
}

export default SearchInput
