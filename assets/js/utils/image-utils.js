/* eslint-disable */
export function createMapper(map) {
    return (key) => {
        return key ? map[key] || key : map.missingValue;
    };
}

export function createOperationsGenerator({ formatter, keyMap, joinWith = '/', valueMap } = {}) {
    if (!formatter) {
        formatter = (key, value) => `${key}:${value}`;
    }
    if (keyMap && typeof keyMap !== 'function') {
        keyMap = createMapper(keyMap);
    }
    const map = valueMap || {};

    Object.keys(map)
        .forEach((valueKey) => {
            if (typeof map[valueKey] !== 'function') {
                map[valueKey] = createMapper(map[valueKey]);
            }
        });

    return (modifiers = {}) => {
        const operations = Object.entries(modifiers)
            .filter(([, value]) => typeof value !== 'undefined')
            .map(([key, value]) => {
                const mapper = map[key];
                if (typeof mapper === 'function') {
                    value = mapper(modifiers[key]);
                }

                key = typeof keyMap === 'function' ? keyMap(key) : key;

                return formatter(key, value);
            });

        return operations.join(joinWith);
    };
}

/* eslint-enable */

export function getObjectFitSize(contains, containerWidth, containerHeight, width, height) {
    const doRatio = width / height;
    const cRatio = containerWidth / containerHeight;
    let targetWidth = 0;
    let targetHeight = 0;
    const test = contains ? doRatio > cRatio : doRatio < cRatio;

    if (test) {
        targetWidth = containerWidth;
        targetHeight = targetWidth / doRatio;
    } else {
        targetHeight = containerHeight;
        targetWidth = targetHeight * doRatio;
    }

    return {
        width: targetWidth,
        height: targetHeight,
        x: (containerWidth - targetWidth) / 2,
        y: (containerHeight - targetHeight) / 2,
    };
}
