import { css } from 'lit';

// 全局 CSS 变量定义（light 主题）
export const baseStyles = css`
  :host {
    font-family: var(--hy-font-family);
    box-sizing: border-box;
  }

  /* 组件内部样式 */
  :host {
    display: inline-block;
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
