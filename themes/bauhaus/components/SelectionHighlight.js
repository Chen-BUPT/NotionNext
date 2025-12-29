import { useEffect } from 'react'

/**
 * Bauhaus 自定义选中高亮
 * 使用下划线代替背景色，避免遮挡其他行
 */
const SelectionHighlight = () => {
  useEffect(() => {
    let highlightLayer = null

    const createHighlightLayer = () => {
      if (!highlightLayer) {
        highlightLayer = document.createElement('div')
        highlightLayer.id = 'bauhaus-selection-layer'
        highlightLayer.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9998;
        `
        document.body.appendChild(highlightLayer)
      }
      return highlightLayer
    }

    const updateHighlight = () => {
      const layer = createHighlightLayer()
      layer.innerHTML = ''

      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
        return
      }

      const range = selection.getRangeAt(0)
      const rects = range.getClientRects()

      for (let i = 0; i < rects.length; i++) {
        const rect = rects[i]
        if (rect.width === 0 || rect.height === 0) continue

        const underline = document.createElement('div')
        underline.style.cssText = `
          position: fixed;
          left: ${rect.left}px;
          top: ${rect.bottom - 3}px;
          width: ${rect.width}px;
          height: 3px;
          background: #FDD835;
          pointer-events: none;
        `
        layer.appendChild(underline)
      }
    }

    const clearHighlight = () => {
      if (highlightLayer) {
        highlightLayer.innerHTML = ''
      }
    }

    document.addEventListener('selectionchange', updateHighlight)
    document.addEventListener('mouseup', updateHighlight)
    document.addEventListener('keyup', updateHighlight)
    document.addEventListener('click', clearHighlight)

    return () => {
      document.removeEventListener('selectionchange', updateHighlight)
      document.removeEventListener('mouseup', updateHighlight)
      document.removeEventListener('keyup', updateHighlight)
      document.removeEventListener('click', clearHighlight)
      highlightLayer?.remove()
    }
  }, [])

  return null
}

export default SelectionHighlight
