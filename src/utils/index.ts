/**
 * 生成唯一 ID
 */
export function generateId(prefix: string = 'my'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * 类名合并工具
 */
export function classMap(classes: Record<string, boolean>): string {
  return Object.entries(classes)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(' ');
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * 事件发射器
 */
export function emit<T>(
  element: HTMLElement,
  name: string,
  detail?: T,
  options?: CustomEventInit
): CustomEvent<T> {
  const event = new CustomEvent<T>(name, {
    bubbles: true,
    composed: true,
    cancelable: true,
    detail,
    ...options,
  });
  element.dispatchEvent(event);
  return event;
}
