// 设置的时候需要将 对象转成字符串
export const setLocal = (key, value) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
};

// 获取本地的值 需要转化成对象
export const getLocal = (key) => {
  let value = localStorage.getItem(key);
  if (!value) return;
  if (value.includes("[") || value.includes("{")) {
    return JSON.parse(value);
  } else {
    return localStorage.getItem(key) || "";
  }
};

// clear local存储
export const removeLocal = (key) => {
  localStorage.removeItem(key);
};

window.setLocal = setLocal;
window.getLocal = getLocal;
window.removeLocal = removeLocal;
