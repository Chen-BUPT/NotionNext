import { useEffect } from 'react'

/**
 * Bauhaus 点击特效
 * 点击时随机显示三原色几何图形：红色圆形、黄色三角、蓝色方块
 */
const ClickEffect = () => {
  useEffect(() => {
    const shapes = [
      { type: 'circle', color: '#E53935' },    // 红色圆形
      { type: 'triangle', color: '#FDD835' },  // 黄色三角
      { type: 'square', color: '#1E88E5' }     // 蓝色方块
    ]

    const handleClick = (e) => {
      const shape = shapes[Math.floor(Math.random() * shapes.length)]
      const el = document.createElement('div')
      
      // 基础样式
      el.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        transform: translate(-50%, -50%);
        animation: bauhaus-click 0.6s ease-out forwards;
      `

      // 根据形状类型设置样式
      if (shape.type === 'circle') {
        el.style.width = '20px'
        el.style.height = '20px'
        el.style.borderRadius = '50%'
        el.style.backgroundColor = shape.color
      } else if (shape.type === 'triangle') {
        el.style.width = '0'
        el.style.height = '0'
        el.style.borderLeft = '12px solid transparent'
        el.style.borderRight = '12px solid transparent'
        el.style.borderBottom = `20px solid ${shape.color}`
        el.style.backgroundColor = 'transparent'
      } else if (shape.type === 'square') {
        el.style.width = '18px'
        el.style.height = '18px'
        el.style.backgroundColor = shape.color
      }

      document.body.appendChild(el)

      // 动画结束后移除元素
      setTimeout(() => {
        el.remove()
      }, 600)
    }

    // 添加动画样式
    const style = document.createElement('style')
    style.textContent = `
      @keyframes bauhaus-click {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(2) rotate(180deg) translateY(-30px);
        }
      }
    `
    document.head.appendChild(style)

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      style.remove()
    }
  }, [])

  return null
}

export default ClickEffect
