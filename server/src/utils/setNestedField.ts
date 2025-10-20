export function setNestedField(obj: any, pathStr: string, value: string) {

  const pathParts = pathStr
    .replace(/\]/g, "")
    .split("[")
    .flatMap((part) => part.split("."));

  let current = obj;
  for (let i = 0; i < pathParts.length - 1; i++) {
    const part = pathParts[i];
    const nextIsArrayIndex = /^\d+$/.test(pathParts[i + 1]);

    if (!current[part]) {
      current[part] = nextIsArrayIndex ? [] : {};
    }
    current = current[part];
  }

  const lastPart = pathParts[pathParts.length - 1];

  current[lastPart] = value;
}
