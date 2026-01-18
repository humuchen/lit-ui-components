import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '@/styles/shared.styles';
import { buttonStyles } from './button.styles';
import { emit } from '@/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * @element hy-button
 * @description 一个功能丰富的按钮组件
 *
 * @slot - 按钮文本内容
 * @slot prefix - 前置图标
 * @slot suffix - 后置图标
 *
 * @fires click - 点击按钮时触发
 * @fires focus - 按钮获得焦点时触发
 * @fires blur - 按钮失去焦点时触发
 *
 * @csspart button - 按钮元素
 * @csspart content - 内容容器
 *
 * @cssprop --button-bg - 自定义背景色
 * @cssprop --button-color - 自定义文字颜色
 */
@customElement('hy-button')
export class HyButton extends LitElement {
  static override styles = [baseStyles, buttonStyles];

  /** 按钮变体 */
  @property({ type: String, reflect: true })
  variant: ButtonVariant = 'primary';

  /** 按钮尺寸 */
  @property({ type: String, reflect: true })
  size: ButtonSize = 'medium';

  /** 按钮类型 */
  @property({ type: String })
  type: ButtonType = 'button';

  /** 是否禁用 */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** 是否加载中 */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /** 是否块级按钮 */
  @property({ type: Boolean, reflect: true })
  block = false;

  /** 是否圆角按钮 */
  @property({ type: Boolean, reflect: true })
  round = false;

  /** 是否圆形按钮 */
  @property({ type: Boolean, reflect: true })
  circle = false;

  /** 链接地址 */
  @property({ type: String })
  href?: string;

  /** 链接打开方式 */
  @property({ type: String })
  target?: string;

  @state()
  private hasFocus = false;

  override render() {
    const classes = {
      button: true,
      [`button--${this.variant}`]: true,
      [`button--${this.size}`]: true,
      'button--loading': this.loading,
      'button--block': this.block,
      'button--round': this.round,
      'button--circle': this.circle,
    };

    const content = html`
      ${this.loading ? html`<span class="button__spinner"></span>` : null}
      <span class="button__content" part="content">
        <slot name="prefix"></slot>
        <slot></slot>
        <slot name="suffix"></slot>
      </span>
    `;

    // 如果有 href，渲染为链接
    if (this.href && !this.disabled) {
      return html`
        <a
          part="button"
          class=${classMap(classes)}
          href=${this.href}
          target=${this.target || '_self'}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
        >
          ${content}
        </a>
      `;
    }

    return html`
      <button
        part="button"
        class=${classMap(classes)}
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        @click=${this.handleClick}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
        ${content}
      </button>
    `;
  }

  private handleClick(event: MouseEvent) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    emit(this, 'click', { originalEvent: event });
  }

  private handleFocus() {
    this.hasFocus = true;
    emit(this, 'focus');
  }

  private handleBlur() {
    this.hasFocus = false;
    emit(this, 'blur');
  }

  /** 聚焦按钮 */
  override focus(options?: FocusOptions) {
    const button = this.shadowRoot?.querySelector('button, a') as HTMLElement;
    button?.focus(options);
  }

  /** 失焦按钮 */
  override blur() {
    const button = this.shadowRoot?.querySelector('button, a') as HTMLElement;
    button?.blur();
  }

  /** 模拟点击 */
  override click() {
    const button = this.shadowRoot?.querySelector('button, a') as HTMLElement;
    button?.click();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hy-button': HyButton;
  }
}
