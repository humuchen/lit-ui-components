// 导入所有组件
import '../src/index.ts';

// 添加事件监听示例
document.addEventListener('DOMContentLoaded', () => {
  // Button 点击事件
  document.querySelectorAll('hy-button').forEach((button) => {
    button.addEventListener('hy-click', (event) => {
      console.log('Button clicked:', event);
    });
  });

  // // Input 事件
  // document.querySelectorAll('hy-input').forEach((input) => {
  //   input.addEventListener('hy-input', (event: CustomEvent) => {
  //     console.log('Input value:', event.detail.value);
  //   });
  // });

  // // Card 点击事件
  // document.querySelectorAll('hy-card[clickable]').forEach((card) => {
  //   card.addEventListener('hy-click', () => {
  //     alert('Card clicked!');
  //   });
  // });
});
