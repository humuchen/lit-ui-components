import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('hy-checkbox')
export class HyCheckbox extends LitElement {}

declare global {
  interface HTMLElementTagNameMap {
    'hy-checkbox': HyCheckbox;
  }
}
