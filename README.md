# Lit-UI-Components

一个使用 Lit + TypeScript 构建的现代化 Web Components 组件库。

## 特性

- 🚀 基于 Lit 3.0，轻量高效
- 📦 支持 Tree Shaking
- 🎨 可自定义主题
- 📱 响应式设计
- ♿ 无障碍支持
- 📝 TypeScript 类型支持

## 安装

\`\`\`bash
npm install lit-ui-components
\`\`\`

## 使用

### 全量引入

\`\`\`javascript
import 'lit-ui-components';
\`\`\`

### 按需引入

\`\`\`javascript
import 'lit-ui-components/components/hy-button';
import 'lit-ui-components/components/hy-input';
\`\`\`

### 在 HTML 中使用

\`\`\`html
<hy-button variant="primary">Click me</hy-button>

<hy-input
  label="Username"
  placeholder="Enter your username"
  clearable
></hy-input>

<hy-card card-title="Card Title">
  <p>Card content here</p>
</hy-card>
\`\`\`

## 组件列表

| 组件 | 描述 |
|------|------|
| hy-button | 按钮组件 |
| hy-input | 输入框组件 |
| hy-card | 卡片组件 |

## 自定义主题

\`\`\`css
:root {
  --hy-primary-color: #your-color;
  --hy-radius-md: 8px;
}
\`\`\`

## 开发

\`\`\`bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建库
npm run build
\`\`\`

## License

MIT
