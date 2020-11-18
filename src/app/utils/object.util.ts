/**
 * set object value with point separated property string
 * @param obj object
 * @param property property
 * @param value value
 */
export function setObjectValue(obj: object, property: string, value: any): void {
  let target = obj;
  const properties = property.split('.');

  properties.forEach((p, i) => {
    if (i !== properties.length - 1) {
      target = target[p] || {};
    } else {
      target[p] = value;
    }
  });
}

/**
 * return specific value of the data
 * @param data object data
 * @param property data property string
 */
export function getObjectValue<T = any>(data: any, property: string): T {
  const keys = property.split('.');
  const lastIndex = keys.length - 1;
  let target = data;

  keys.forEach((key, index) => {
    target = target[key];

    if (index !== lastIndex && !target) {
      target = {} as any;
    }
  });

  return target;
}

/**
 * change none array items to array
 * @param items items
 */
export function noneArrayToArray<T = any>(items: any): T[] {
  if (!items.length) {
    return items;
  }

  const list = [];
  let index = 0;

  while (index < items.length) {
    list.push(items[index]);
    index++;
  }

  return list;
}
