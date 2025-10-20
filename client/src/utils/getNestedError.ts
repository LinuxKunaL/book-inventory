export const getNestedError = (errors: any, path: string) => {
  const normalizedPath = path.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');

  return normalizedPath
    .split('.')
    .reduce((acc, key) => acc?.[key], errors);
};
