/* eslint-disable react/no-unknown-property */
/**
 * Bauhaus 主题样式
 * 包豪斯设计：纯净色彩、几何形状、无阴影、锐利边缘
 */
const Style = () => {
  return (
    <style jsx global>{`
      /* 基础样式 */
      #theme-bauhaus {
        --bauhaus-red: #E53935;
        --bauhaus-yellow: #FDD835;
        --bauhaus-blue: #1E88E5;
        --bauhaus-black: #212121;
        --bauhaus-white: #FAFAFA;
        --bauhaus-gray: #9E9E9E;
      }

      #theme-bauhaus {
        font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
        background-color: var(--bauhaus-white);
        color: var(--bauhaus-black);
      }

      .dark #theme-bauhaus {
        background-color: var(--bauhaus-black);
        color: var(--bauhaus-white);
      }

      /* 几何形状装饰 */
      .bauhaus-circle {
        border-radius: 50%;
      }

      .bauhaus-triangle {
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
      }

      .bauhaus-square {
        border-radius: 0;
      }

      /* 色块 */
      .bauhaus-red { background-color: var(--bauhaus-red); }
      .bauhaus-yellow { background-color: var(--bauhaus-yellow); }
      .bauhaus-blue { background-color: var(--bauhaus-blue); }
      .bauhaus-black { background-color: var(--bauhaus-black); }
      .bauhaus-white { background-color: var(--bauhaus-white); }

      /* 文字色 */
      .text-bauhaus-red { color: var(--bauhaus-red); }
      .text-bauhaus-yellow { color: var(--bauhaus-yellow); }
      .text-bauhaus-blue { color: var(--bauhaus-blue); }

      /* 边框 */
      .border-bauhaus-black {
        border: 2px solid var(--bauhaus-black);
      }

      .dark .border-bauhaus-black {
        border-color: var(--bauhaus-white);
      }

      /* 滚动条 - 极简风格 */
      #theme-bauhaus ::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }

      #theme-bauhaus ::-webkit-scrollbar-thumb {
        background: var(--bauhaus-black);
      }

      .dark #theme-bauhaus ::-webkit-scrollbar-thumb {
        background: var(--bauhaus-white);
      }

      #theme-bauhaus ::-webkit-scrollbar-track {
        background: transparent;
      }

      /* 卡片 - 无阴影、锐利边缘 */
      .bauhaus-card {
        background: var(--bauhaus-white);
        border: 2px solid var(--bauhaus-black);
        transition: transform 300ms ease;
      }

      .dark .bauhaus-card {
        background: #2a2a2a;
        border-color: var(--bauhaus-white);
      }

      .bauhaus-card:hover {
        transform: translateY(-4px);
      }

      /* 按钮 */
      .bauhaus-btn {
        background: var(--bauhaus-black);
        color: var(--bauhaus-white);
        border: none;
        padding: 12px 24px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 2px;
        transition: all 300ms ease;
      }

      .dark .bauhaus-btn {
        background: var(--bauhaus-white);
        color: var(--bauhaus-black);
      }

      .bauhaus-btn:hover {
        background: var(--bauhaus-blue);
        color: var(--bauhaus-white);
      }

      .bauhaus-btn-red:hover { background: var(--bauhaus-red); }
      .bauhaus-btn-yellow:hover { background: var(--bauhaus-yellow); color: var(--bauhaus-black); }

      /* 标题 - 几何字体风格 */
      .bauhaus-title {
        font-weight: 900;
        letter-spacing: -0.02em;
        line-height: 1.1;
      }

      /* 网格系统 */
      .bauhaus-grid {
        display: grid;
        gap: 24px;
      }

      /* 分隔线 */
      .bauhaus-divider {
        height: 2px;
        background: var(--bauhaus-black);
      }

      .dark .bauhaus-divider {
        background: var(--bauhaus-white);
      }

      /* 标签 */
      .bauhaus-tag {
        display: inline-block;
        padding: 4px 12px;
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        border: 2px solid currentColor;
      }

      /* 动画 */
      @keyframes bauhaus-rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      @keyframes bauhaus-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      .bauhaus-animate-rotate {
        animation: bauhaus-rotate 20s linear infinite;
      }

      .bauhaus-animate-pulse {
        animation: bauhaus-pulse 2s ease-in-out infinite;
      }

      /* 选中文本 */
      #theme-bauhaus ::selection {
        background: var(--bauhaus-yellow);
        color: var(--bauhaus-black);
      }
    `}</style>
  )
}

export { Style }
