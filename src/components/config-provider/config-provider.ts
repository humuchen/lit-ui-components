import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { configContext, type ConfigState } from '@/context/config-context';
import { baseStyles } from '@/styles/shared.styles';
import { configProviderStyles } from './config-provider.styles';
import { provide } from '@lit/context';

@customElement('hy-config-provider')
export class ConfigProvider extends LitElement {
  static override styles = [baseStyles, configProviderStyles];
  @property({ type: String, reflect: true })
  theme = 'light';
  @property({ type: String, reflect: true })
  locale = 'zh-CN';

  @provide({ context: configContext })
  private _config: ConfigState = { theme: 'light', locale: 'zh-CN' };
  override willUpdate(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('theme') || changedProperties.has('locale')) {
      this._updateConfig();
    }
  }
  private _updateConfig() {
    this._config = {
      theme: this.theme,
      locale: this.locale,
    };
  }
  override render() {
    return html`<slot></slot>`;
  }

  override connectedCallback() {
    super.connectedCallback();
    this._applyTheme();
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('theme')) {
      this._applyTheme();
    }
  }
  private _applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'hy-config-provider': ConfigProvider;
  }
}
