import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '@/styles/shared.styles';
import { cardStyles } from './card.styles';
import { emit } from '@/utils';

export type CardVariant = 'outlined' | 'elevated' | 'filled';

/**
 * @element hy-card
 * @description 卡片组件
 *
 * @slot - 卡片主体内容
 * @slot cover - 封面图片
 * @slot header - 自定义头部
 * @slot extra - 头部右侧额外内容
 * @slot footer - 底部内容
 *
 * @fires click - 点击卡片时触发（需设置 clickable）
 */
@customElement('hy-card')
export class HyCard extends LitElement {
  static override styles = [baseStyles, cardStyles];

  /** 卡片标题 */
  @property({ type: String })
  cardTitle = '';

  /** 卡片副标题 */
  @property({ type: String })
  subtitle = '';

  /** 卡片变体 */
  @property({ type: String, reflect: true })
  variant: CardVariant = 'elevated';

  /** 是否显示悬浮效果 */
  @property({ type: Boolean })
  hoverable = false;

  /** 是否可点击 */
  @property({ type: Boolean })
  clickable = false;

  /** 是否加载中 */
  @property({ type: Boolean })
  loading = false;

  /** 是否无内边距 */
  @property({ type: Boolean, attribute: 'no-padding' })
  noPadding = false;

  private hasHeaderSlot = false;
  private hasCoverSlot = false;
  private hasFooterSlot = false;

  override render() {
    const classes = {
      card: true,
      [`card--${this.variant}`]: true,
      'card--hoverable': this.hoverable,
      'card--clickable': this.clickable,
      'card--loading': this.loading,
      'card--no-padding': this.noPadding,
    };

    const showHeader = this.cardTitle || this.subtitle || this.hasHeaderSlot;

    return html`
      <div
        class=${classMap(classes)}
        part="card"
        @click=${this.handleClick}
        role=${this.clickable ? 'button' : nothing}
        tabindex=${this.clickable ? 0 : nothing}
      >
        ${this.loading
          ? html`
              <div class="card__loading-overlay">
                <div class="card__spinner"></div>
              </div>
            `
          : nothing}

        <div class="card__cover">
          <slot name="cover" @slotchange=${this.handleCoverSlotChange}></slot>
        </div>

        ${showHeader
          ? html`
              <div class="card__header" part="header">
                <slot name="header" @slotchange=${this.handleHeaderSlotChange}>
                  <div class="card__header-content">
                    ${this.cardTitle
                      ? html`<h3 class="card__title">${this.cardTitle}</h3>`
                      : nothing}
                    ${this.subtitle
                      ? html`<p class="card__subtitle">${this.subtitle}</p>`
                      : nothing}
                  </div>
                </slot>
                <div class="card__extra">
                  <slot name="extra"></slot>
                </div>
              </div>
            `
          : nothing}

        <div class="card__body" part="body">
          <slot></slot>
        </div>

        <div class="card__footer" part="footer">
          <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
        </div>
      </div>
    `;
  }

  private handleClick(event: MouseEvent) {
    if (this.clickable && !this.loading) {
      emit(this, 'click', { originalEvent: event });
    }
  }

  private handleHeaderSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    this.hasHeaderSlot = slot.assignedNodes().length > 0;
    this.requestUpdate();
  }

  private handleCoverSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    this.hasCoverSlot = slot.assignedNodes().length > 0;
    this.requestUpdate();
  }

  private handleFooterSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    this.hasFooterSlot = slot.assignedNodes().length > 0;
    this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hy-card': HyCard;
  }
}
