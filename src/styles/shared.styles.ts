import { css } from 'lit';

// CSS 变量定义
export const baseStyles = css`
  :host {
    /* 颜色系统 */
    --hy-primary-color: #6366f1;
    --hy-primary-hover: #4f46e5;
    --hy-primary-active: #4338ca;
    --hy-primary-light: #e0e7ff;
    
    --hy-success-color: #22c55e;
    --hy-warning-color: #f59e0b;
    --hy-danger-color: #ef4444;
    --hy-info-color: #3b82f6;
    
    --hy-text-color: #1f2937;
    --hy-text-secondary: #6b7280;
    --hy-text-disabled: #9ca3af;
    
    --hy-bg-color: #ffffff;
    --hy-bg-secondary: #f3f4f6;
    --hy-border-color: #e5e7eb;
    
    /* 尺寸系统 */
    --hy-spacing-xs: 4px;
    --hy-spacing-sm: 8px;
    --hy-spacing-md: 12px;
    --hy-spacing-lg: 16px;
    --hy-spacing-xl: 24px;
    
    /* 圆角 */
    --hy-radius-sm: 4px;
    --hy-radius-md: 6px;
    --hy-radius-lg: 8px;
    --hy-radius-xl: 12px;
    --hy-radius-full: 9999px;
    
    /* 阴影 */
    --hy-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --hy-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --hy-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    
    /* 过渡 */
    --hy-transition-fast: 150ms ease;
    --hy-transition-normal: 200ms ease;
    --hy-transition-slow: 300ms ease;
    
    /* 字体 */
    --hy-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --hy-font-size-xs: 12px;
    --hy-font-size-sm: 14px;
    --hy-font-size-md: 16px;
    --hy-font-size-lg: 18px;
    --hy-font-size-xl: 20px;
    
    font-family: var(--hy-font-family);
    box-sizing: border-box;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

// 焦点样式
export const focusStyles = css`
  .focus-ring:focus-visible {
    outline: 2px solid var(--hy-primary-color);
    outline-offset: 2px;
  }
`;

// 禁用样式
export const disabledStyles = css`
  :host([disabled]) {
    pointer-events: none;
    opacity: 0.6;
  }
`;
