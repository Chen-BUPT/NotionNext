import { useEffect } from 'react'

/**
 * Bauhaus 点击特效
 * Less is More - 简约几何扩散
 */
const ClickEffect = () => {
  useEffect(() => {
    const colors = ['#E53935', '#FDD835', '#1E88E5']

    const handleClick = (e) => {
      const color = colors[Math.floor(Math.random() * colors.length)]
      const el = document.createElement('div')
      
      el.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 8px;
        height: 8px;
        background: ${color};
        transform: translate(-50%, -50%);
        animation: bauhaus-expand 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      `

      document.body.appendChild(el)

      setTimeout(() => el.remove(), 400)
    }

    const style = document.createElement('style')
    style.id = 'bauhaus-click-style'
    style.textContent = `
      @keyframes bauhaus-expand {
        0% {
          opacity: 0.8;
          transform: translate(-50%, -50%) scale(1);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(6);
        }
      }
    `
    document.head.appendChild(style)

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      document.getElementById('bauhaus-click-style')?.remove()
    }
  }, [])

  return null
}

export default ClickEffect
