import '../src/styles/theme.css';
// 导入所有组件
import '../src/index.ts';
import { useTheme } from '../src/composables/index';

const { getTheme, setTheme } = useTheme();

// 主题切换功能
function getInitialTheme(): string {
  const configProvider = document.querySelector('hy-config-provider') as any;
  const htmlTheme = document.documentElement.getAttribute('data-theme');
  return configProvider?.theme || htmlTheme || 'light';
}

let currentTheme = getInitialTheme();
let isToggling = false;

function createRipple(x: number, y: number) {
  const ripple = document.createElement('div');
  ripple.className = 'theme-ripple';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.style.width = '20px';
  ripple.style.height = '20px';
  ripple.style.backgroundColor = currentTheme === 'light' ? '#6366f1' : '#818cf8';
  ripple.style.marginLeft = '-10px';
  ripple.style.marginTop = '-10px';

  document.body.appendChild(ripple);

  requestAnimationFrame(() => {
    ripple.classList.add('active');
  });

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

function toggleTheme(e: MouseEvent) {
  if (isToggling) return;
  isToggling = true;

  const x = e.clientX;
  const y = e.clientY;

  createRipple(x, y);

  setTimeout(() => {
    const newTheme = getTheme() === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    const themeSwitcher = document.getElementById('themeSwitcher');
    if (themeSwitcher) {
      themeSwitcher.textContent = newTheme === 'light' ? '切换到深色' : '切换到亮色';
    }

    isToggling = false;
  }, 300);
}

// 添加事件监听示例
document.addEventListener('DOMContentLoaded', () => {
  currentTheme = getInitialTheme();

  // 主题切换按钮
  const themeSwitcher = document.getElementById('themeSwitcher');
  if (themeSwitcher) {
    themeSwitcher.textContent = currentTheme === 'light' ? '切换到深色' : '切换到亮色';
    themeSwitcher.addEventListener('click', toggleTheme);
  }

  // Button 点击事件
  // document.querySelectorAll('hy-button').forEach((button) => {
  //   button.addEventListener('click', (event: Event) => {
  //     console.log('Button clicked:', event);
  //   });
  // });

  // Input 事件
  document.querySelectorAll('hy-input').forEach((input) => {
    input.addEventListener('input', (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log('Input value:', customEvent.detail?.value);
    });
  });

  // Card 点击事件
  // document.querySelectorAll('hy-card[clickable]').forEach((card) => {
  //   card.addEventListener('click', () => {
  //     alert('Card clicked!');
  //   });
  // });
});
