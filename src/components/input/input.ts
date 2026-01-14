import { baseStyles } from '@/styles/shared.styles';
import { html, LitElement, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { inputStyles } from './input.styles';
import { emit, generateId } from '@/utils';
import { live } from 'lit/directives/live.js';
import { classMap } from 'lit/directives/class-map.js';

export type InputSize = 'small' | 'medium' | 'large';
export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';

/**
 * @element hy-input
 * @description 输入框组件
 *
 * @slot prefix - 前缀内容
 * @slot suffix - 后缀内容
 *
 * @fires hy-input - 输入时触发
 * @fires hy-change - 值改变时触发
 * @fires hy-focus - 获得焦点时触发
 * @fires hy-blur - 失去焦点时触发
 * @fires hy-clear - 清除时触发
 */
@customElement('hy-input')
export class HyInput extends LitElement {
  static override styles = [baseStyles, inputStyles];

  /** 输入框值 */
  @property({ type: String })
  value = '';

  /** 输入框类型 */
  @property({ type: String })
  type: InputType = 'text';

  /** 输入框尺寸 */
  @property({ type: String })
  size: InputSize = 'medium';

  /** 占位符 */
  @property({ type: String })
  placeholder = '';

  /** 标签文本 */
  @property({ type: String })
  label = '';

  /** 是否禁用 */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** 是否只读 */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /** 是否显示清除按钮 */
  @property({ type: Boolean })
  clearable = false;

  /** 是否显示密码可见按钮 */
  @property({ type: Boolean, attribute: 'show-password' })
  showPassword = false;

  /** 是否必填 */
  @property({ type: Boolean, reflect: true })
  required = false;

  /** 帮助文本 */
  @property({ type: String, attribute: 'help-text' })
  helpText = '';

  /** 错误信息 */
  @property({ type: String, attribute: 'error-message' })
  errorMessage = '';

  /** 最大长度 */
  @property({ type: Number })
  maxlength?: number;

  /** 最小长度 */
  @property({ type: Number })
  minlength?: number;

  /** 是否显示字数统计 */
  @property({ type: Boolean, attribute: 'show-count' })
  showCount = false;

  /** 自动聚焦 */
  @property({ type: Boolean })
  autofocus = false;

  /** 输入框名称 */
  @property({ type: String })
  name = '';

  @query('.input')
  private inputElement!: HTMLInputElement;

  @state()
  private hasFocus = false;

  @state()
  private passwordVisible = false;

  private inputId = generateId('input');

  override render() {
    const hasError = !!this.errorMessage;
    const hasValue = this.value.length > 0;

    const containerClasses = {
      'input-container': true,
      [`input-container--${this.size}`]: true,
      'input-container--disabled': this.disabled,
      'input-container--focused': this.hasFocus,
      'input-container--error': hasError,
    };

    const inputType = this.type === 'password' && this.passwordVisible ? 'text' : this.type;

    return html`
      <div class="inpt-wrapper">
        ${this.label
          ? html`<label class="input-label ${this.required ? 'input-label--required' : ''}"
              >${this.label}</label
            >`
          : nothing}

        <div class=${classMap(containerClasses)} part="container">
          <span class="input-prefix">
            <slot name="prefix"></slot>
          </span>

          <input
            id=${this.inputId}
            class="input"
            part="input"
            type=${inputType}
            .value=${live(this.value)}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            ?autofocus=${this.autofocus}
            maxlength=${this.maxlength || nothing}
            minlength=${this.minlength || nothing}
            name=${this.name || nothing}
            @input=${this.handleInput}
            @change=${this.handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          />

          ${this.clearable && hasValue && !this.disabled && !this.readonly
            ? html`
                <button type="button" class="input-clear" @click=${this.handleClear} tabindex="-1">
                  ✕
                </button>
              `
            : nothing}
          ${this.showPassword && this.type === 'password'
            ? html`
                <button
                  type="button"
                  class="input-clear"
                  @click=${this.togglePassword}
                  tabindex="-1"
                >
                  ${this.passwordVisible ? '👁' : '👁‍🗨'}
                </button>
              `
            : nothing}

          <span class="input-suffix">
            <slot name="suffix"></slot>
          </span>
        </div>

        ${this.showCount && this.maxlength
          ? html` <div class="input-count">${this.value.length} / ${this.maxlength}</div> `
          : nothing}
        ${hasError
          ? html`<span class="input-error">${this.errorMessage}</span>`
          : this.helpText
            ? html`<span class="input-help">${this.helpText}</span>`
            : nothing}
      </div>
    `;
  }

  private handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    emit(this, 'input', { value: this.value });
  }

  private handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    emit(this, 'change', { value: this.value });
  }

  private handleFocus() {
    this.hasFocus = true;
    emit(this, 'focus');
  }

  private handleBlur() {
    this.hasFocus = false;
    emit(this, 'blur');
  }

  private handleClear() {
    this.value = '';
    emit(this, 'clear');
    emit(this, 'input', { value: '' });
    emit(this, 'change', { value: '' });
    this.focus();
  }

  private togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  /** 聚焦输入框 */
  override focus(options?: FocusOptions) {
    this.inputElement?.focus(options);
  }

  /** 失焦输入框 */
  override blur() {
    this.inputElement?.blur();
  }

  /** 选中输入框内容 */
  select() {
    this.inputElement?.select();
  }

  /** 设置选择范围 */
  setSelectionRange(start: number, end: number, direction?: 'forward' | 'backward' | 'none') {
    this.inputElement?.setSelectionRange(start, end, direction);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hy-input': HyInput;
  }
}
