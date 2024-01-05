/* eslint-disable import/prefer-default-export */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
const pages: any = import.meta.glob('./pages/**/*.tsx', { eager: true });

const routes: any[] = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes('$')
    ? fileName.replace('$', ':')
    : fileName.replace(/\/index/, '');

  routes.push({
    path: fileName === 'index' ? '/' : `/${normalizedPathName.toLowerCase()}`,
    Element: pages[path].default,
    loader: pages[path]?.loader,
    action: pages[path]?.action,
    ErrorBoundary: pages[path]?.ErrorBoundary,
  });
}

export { routes };
