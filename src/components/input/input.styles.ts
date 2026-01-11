import { css } from 'lit';

export const inputStyles = css`
  :host {
    display: block;
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--hy-spacing-xs);
  }

  .input-label {
    font-size: var(--hy-font-size-sm);
    font-weight: 500;
    color: var(--hy-text-color);
  }

  .input-label--required::after {
    content: ' *';
    color: var(--hy-danger-color);
  }

  .input-container {
    display: flex;
    align-items: center;
    gap: var(--hy-spacing-sm);
    padding: var(--hy-spacing-sm) var(--hy-spacing-md);
    border: 1px solid var(--hy-border-color);
    border-radius: var(--hy-radius-md);
    background-color: var(--hy-bg-color);
    transition: all var(--hy-transition-fast);
  }

  .input-container:hover:not(.input-container--disabled) {
    border-color: var(--hy-primary-color);
  }

  .input-container:focus-within:not(.input-container--disabled) {
    border-color: var(--hy-primary-color);
    box-shadow: 0 0 0 3px var(--hy-primary-light);
  }

  .input-container--error {
    border-color: var(--hy-danger-color);
  }

  .input-container--error:focus-within {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
  }

  .input-container--disabled {
    background-color: var(--hy-bg-secondary);
    cursor: not-allowed;
  }

  .input {
    flex: 1;
    border: none;
    outline: none;
    font-family: inherit;
    font-size: var(--hy-font-size-sm);
    color: var(--hy-text-color);
    background: transparent;
    min-width: 0;
  }

  .input::placeholder {
    color: var(--hy-text-disabled);
  }

  .input:disabled {
    cursor: not-allowed;
    color: var(--hy-text-disabled);
  }

  /* 尺寸 */
  .input-container--small {
    padding: var(--hy-spacing-xs) var(--hy-spacing-sm);
  }

  .input-container--small .input {
    font-size: var(--hy-font-size-xs);
  }

  .input-container--large {
    padding: var(--hy-spacing-md) var(--hy-spacing-lg);
  }

  .input-container--large .input {
    font-size: var(--hy-font-size-md);
  }

  /* 前缀后缀 */
  .input-prefix,
  .input-suffix {
    display: flex;
    align-items: center;
    color: var(--hy-text-secondary);
  }

  /* 清除按钮 */
  .input-clear {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--hy-text-secondary);
    border-radius: 50%;
    transition: all var(--hy-transition-fast);
  }

  .input-clear:hover {
    background-color: var(--hy-bg-secondary);
    color: var(--hy-text-color);
  }

  /* 帮助文本和错误信息 */
  .input-help,
  .input-error {
    font-size: var(--hy-font-size-xs);
  }

  .input-help {
    color: var(--hy-text-secondary);
  }

  .input-error {
    color: var(--hy-danger-color);
  }

  /* 字数统计 */
  .input-count {
    font-size: var(--hy-font-size-xs);
    color: var(--hy-text-secondary);
    text-align: right;
  }
`;
