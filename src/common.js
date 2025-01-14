const EXE_EXTENSION = Object.freeze({
  linux: '',
  darwin: '',
  win32: '.exe',
});

const PLATFORM_ZIP = Object.freeze({
  linux: 'monolithcode_linux.zip',
  darwin: 'monolithcode_mac.zip',
  win32: 'monolithcode_win.zip',
});

const getExeExtension = () => (Object.prototype.hasOwnProperty.call(EXE_EXTENSION, process.platform) ? EXE_EXTENSION[process.platform] : '');

// https://stackoverflow.com/a/34749873
const isObject = (item) => {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
const mergeDeep = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports.PLATFORM_ZIP = PLATFORM_ZIP;
  module.exports.getExeExtension = getExeExtension;
  module.exports.isObject = isObject;
  module.exports.mergeDeep = mergeDeep;
}
