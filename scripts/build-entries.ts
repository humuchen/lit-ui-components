import { resolve, dirname, basename } from 'path';
import { readdirSync, statSync, existsSync } from 'fs';

export interface ScanOptions {
  /** 入口文件名 */
  entryFileName?: string;
  /** 扫描深度 */
  depth?: number;
  /** 忽略的目录 */
  ignore?: string[];
  /** 只包含的目录 */
  include?: string[];
}

export interface BuildEntriesOptions extends ScanOptions {
  /** 源码目录 */
  srcDir: string;
  /** 组件目录名 */
  componentsDir?: string;
  /** 额外扫描的目录 */
  extraDirs?: string[];
}

/**
 * 扫描目录获取入口文件
 */
export function scanDirectory(
  baseDir: string,
  prefix: string = '',
  options: ScanOptions = {}
): Record<string, string> {
  const {
    entryFileName = 'index.ts',
    depth = 1,
    ignore = ['__tests__', '__mocks__', 'node_modules'],
    include,
  } = options;

  const entries: Record<string, string> = {};

  function scan(dir: string, currentPrefix: string, currentDepth: number) {
    if (!existsSync(dir) || currentDepth > depth) return;

    const items = readdirSync(dir);

    items.forEach((item) => {
      // 检查是否忽略
      if (ignore.includes(item)) return;
      // 检查是否只包含特定目录
      if (include && currentDepth === 0 && !include.includes(item)) return;

      const itemPath = resolve(dir, item);
      
      if (!statSync(itemPath).isDirectory()) return;

      const entryFile = resolve(itemPath, entryFileName);
      const entryKey = currentPrefix ? `${currentPrefix}/${item}/index` : `${item}/index`;

      if (existsSync(entryFile)) {
        entries[entryKey] = entryFile;
      }

      // 递归
      scan(itemPath, currentPrefix ? `${currentPrefix}/${item}` : item, currentDepth + 1);
    });
  }

  scan(baseDir, prefix, 0);
  return entries;
}

/**
 * 构建入口配置
 */
export function buildEntries(options: BuildEntriesOptions): Record<string, string> {
  const {
    srcDir,
    componentsDir = 'components',
    extraDirs = [],
    ...scanOptions
  } = options;

  const entries: Record<string, string> = {};

  // 主入口
  const mainEntry = resolve(srcDir, 'index.ts');
  if (existsSync(mainEntry)) {
    entries['index'] = mainEntry;
  }

  // 组件入口
  const componentsDirPath = resolve(srcDir, componentsDir);
  if (existsSync(componentsDirPath)) {
    const componentsIndex = resolve(componentsDirPath, 'index.ts');
    if (existsSync(componentsIndex)) {
      entries[`${componentsDir}/index`] = componentsIndex;
    }

    const componentEntries = scanDirectory(componentsDirPath, componentsDir, {
      ...scanOptions,
      depth: 2,
    });
    Object.assign(entries, componentEntries);
  }

  // 额外目录
  extraDirs.forEach((dir) => {
    const dirPath = resolve(srcDir, dir);
    const indexPath = resolve(dirPath, 'index.ts');

    if (existsSync(indexPath)) {
      entries[`${dir}/index`] = indexPath;
    }

    const subEntries = scanDirectory(dirPath, dir, scanOptions);
    Object.assign(entries, subEntries);
  });

  return entries;
}

/**
 * 创建 Vite 入口配置
 */
export function createViteEntries(rootDir: string) {
  return buildEntries({
    srcDir: resolve(rootDir, 'src'),
    componentsDir: 'components',
    extraDirs: ['utils', 'hooks', 'directives', 'styles'],
    ignore: ['__tests__', '__mocks__', 'test', 'tests'],
  });
}
