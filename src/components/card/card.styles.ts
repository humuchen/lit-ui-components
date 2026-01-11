import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
  }

  .card {
    background-color: var(--hy-bg-color);
    border-radius: var(--hy-radius-lg);
    overflow: hidden;
    transition: all var(--hy-transition-normal);
  }

  /* 变体 */
  .card--outlined {
    border: 1px solid var(--hy-border-color);
  }

  .card--elevated {
    box-shadow: var(--hy-shadow-md);
  }

  .card--filled {
    background-color: var(--hy-bg-secondary);
  }

  /* 悬浮效果 */
  .card--hoverable:hover {
    box-shadow: var(--hy-shadow-lg);
    transform: translateY(-2px);
  }

  /* 可点击 */
  .card--clickable {
    cursor: pointer;
  }

  .card--clickable:active {
    transform: scale(0.99);
  }

  /* 头部 */
  .card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--hy-spacing-lg);
    border-bottom: 1px solid var(--hy-border-color);
  }

  .card__header-content {
    display: flex;
    flex-direction: column;
    gap: var(--hy-spacing-xs);
  }

  .card__title {
    margin: 0;
    font-size: var(--hy-font-size-lg);
    font-weight: 600;
    color: var(--hy-text-color);
  }

  .card__subtitle {
    margin: 0;
    font-size: var(--hy-font-size-sm);
    color: var(--hy-text-secondary);
  }

  .card__extra {
    flex-shrink: 0;
  }

  /* 封面 */
  .card__cover {
    width: 100%;
    overflow: hidden;
  }

  .card__cover ::slotted(img) {
    width: 100%;
    height: auto;
    display: block;
  }

  /* 内容 */
  .card__body {
    padding: var(--hy-spacing-lg);
  }

  .card--no-padding .card__body {
    padding: 0;
  }

  /* 底部 */
  .card__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--hy-spacing-sm);
    padding: var(--hy-spacing-md) var(--hy-spacing-lg);
    border-top: 1px solid var(--hy-border-color);
  }

  /* 加载状态 */
  .card--loading {
    position: relative;
    pointer-events: none;
  }

  .card__loading-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 1;
  }

  .card__spinner {
    width: 24px;
    height: 24px;
    border: 2px solid var(--hy-border-color);
    border-top-color: var(--hy-primary-color);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
