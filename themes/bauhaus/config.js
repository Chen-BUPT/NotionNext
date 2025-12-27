/**
 * Bauhaus 主题配置
 * 包豪斯设计哲学：形式追随功能，少即是多
 */
const CONFIG = {
  // 色彩体系 - 包豪斯三原色
  BAUHAUS_PRIMARY_RED: '#E53935',
  BAUHAUS_PRIMARY_YELLOW: '#FDD835',
  BAUHAUS_PRIMARY_BLUE: '#1E88E5',
  BAUHAUS_NEUTRAL_BLACK: '#212121',
  BAUHAUS_NEUTRAL_WHITE: '#FAFAFA',
  BAUHAUS_NEUTRAL_GRAY: '#9E9E9E',

  // 首页顶部通知条滚动内容，如不需要可以留空 []
  BAUHAUS_NOTICE_BAR: [
    { title: '欢迎来到我的博客', url: '/' },
    { title: '探索更多精彩内容', url: '/archive' }
  ],

  // 首页配置
  BAUHAUS_HERO_ENABLE: true,
  BAUHAUS_HERO_TITLE: 'BAUHAUS',
  BAUHAUS_HERO_SUBTITLE: 'Form Follows Function',
  BAUHAUS_HERO_DESCRIPTION: '形式追随功能 · 少即是多',

  // 几何装饰
  BAUHAUS_GEOMETRIC_SHAPES: true,

  // 网格系统
  BAUHAUS_GRID_COLS: 12,

  // 文章列表
  BAUHAUS_POST_LIST_STYLE: 'grid', // grid | list
  BAUHAUS_POST_COVER: true,
  BAUHAUS_POST_SUMMARY: true,

  // 侧边栏
  BAUHAUS_SIDEBAR_ENABLE: true,
  BAUHAUS_SIDEBAR_LATEST_POSTS: true,
  BAUHAUS_SIDEBAR_CATEGORIES: true,
  BAUHAUS_SIDEBAR_TAGS: true,

  // 页脚
  BAUHAUS_FOOTER_GEOMETRIC: true,

  // 动效 - 包豪斯强调静态与动态的平衡
  BAUHAUS_ANIMATION_ENABLE: true,
  BAUHAUS_ANIMATION_DURATION: '300ms',

  // 加载遮罩
  BAUHAUS_LOADING_COVER: true
}

export default CONFIG
