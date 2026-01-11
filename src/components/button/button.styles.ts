import { css } from 'lit';

export const buttonStyles = css`
  :host {
    display: inline-block;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--hy-spacing-sm);
    padding: var(--hy-spacing-sm) var(--hy-spacing-lg);
    border: none;
    border-radius: var(--hy-radius-md);
    font-family: inherit;
    font-size: var(--hy-font-size-sm);
    font-weight: 500;
    line-height: 1.5;
    cursor: pointer;
    transition: all var(--hy-transition-fast);
    white-space: nowrap;
    user-select: none;
  }

  /* 变体样式 */
  .button--primary {
    background-color: var(--hy-primary-color);
    color: white;
  }

  .button--primary:hover {
    background-color: var(--hy-primary-hover);
  }

  .button--primary:active {
    background-color: var(--hy-primary-active);
  }

  .button--secondary {
    background-color: var(--hy-bg-secondary);
    color: var(--hy-text-color);
  }

  .button--secondary:hover {
    background-color: var(--hy-border-color);
  }

  .button--outline {
    background-color: transparent;
    border: 1px solid var(--hy-primary-color);
    color: var(--hy-primary-color);
  }

  .button--outline:hover {
    background-color: var(--hy-primary-light);
  }

  .button--ghost {
    background-color: transparent;
    color: var(--hy-primary-color);
  }

  .button--ghost:hover {
    background-color: var(--hy-primary-light);
  }

  .button--danger {
    background-color: var(--hy-danger-color);
    color: white;
  }

  .button--danger:hover {
    background-color: #dc2626;
  }

  /* 尺寸样式 */
  .button--small {
    padding: var(--hy-spacing-xs) var(--hy-spacing-md);
    font-size: var(--hy-font-size-xs);
  }

  .button--medium {
    padding: var(--hy-spacing-sm) var(--hy-spacing-lg);
    font-size: var(--hy-font-size-sm);
  }

  .button--large {
    padding: var(--hy-spacing-md) var(--hy-spacing-xl);
    font-size: var(--hy-font-size-md);
  }

  /* 状态样式 */
  .button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .button--loading {
    position: relative;
    pointer-events: none;
  }

  .button--loading .button__content {
    visibility: hidden;
  }

  .button__spinner {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  .button--block {
    width: 100%;
  }

  .button--round {
    border-radius: var(--hy-radius-full);
  }

  .button--circle {
    border-radius: 50%;
    padding: var(--hy-spacing-sm);
    aspect-ratio: 1;
  }

  /* 焦点样式 */
  .button:focus-visible {
    outline: 2px solid var(--hy-primary-color);
    outline-offset: 2px;
  }

  /* 图标插槽 */
  ::slotted([slot="prefix"]),
  ::slotted([slot="suffix"]) {
    display: flex;
    align-items: center;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
