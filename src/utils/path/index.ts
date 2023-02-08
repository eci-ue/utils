
export const isAbsolute = function(path: string): boolean {
  return path.charAt(0) === '/';
};

function normalizeArray(paths: string[]) {
  const res: string[] = [];
  for(const value of paths) {
    // 过滤空数据
    if (!value || value === ".") {
      continue;
    }
    if (value === "..") {
      if (res.length > 0 && res[res.length - 1] !== "..") {
        res.pop();
      }
    } else {
      res.push(value);
    }
  }
  return res;
}

export const normalize = function(path: string): string {
  const isabsolute = isAbsolute(path);
  const trailingSlash = path && path[path.length - 1] === '/';
  let value = normalizeArray(path.split("/")).join("/");
  if (!value) {
    return ".";
  }
  if (value && trailingSlash) {
    value += "/";
  }
  if (isabsolute) {
    value = `/${value}`;
  }
  return value;
}


export const join = function(...args: string[]): string {
  return normalize(args.join("/"))
}