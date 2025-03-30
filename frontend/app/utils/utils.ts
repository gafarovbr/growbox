
export function getValueFromRequestString(str: string) {
  const cleanedStr = str.slice(1, -1).replace(/\\"/g, '"');
  const valueIndex = cleanedStr.indexOf('"value":') + 8;
  const substringAfterValue = cleanedStr.substring(valueIndex);
  const value = substringAfterValue.split(',')[0].trim();

  return value;
}

