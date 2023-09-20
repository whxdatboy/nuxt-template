export function prepareSpecs(arr) {
    if (!Array.isArray(arr)) {
        console.warn('[prepareSpecs] Specs response is not an Array! Got ' + arr);
        return {};
    }

    const specs = {};
    arr.forEach(spec => {
        specs[spec.name] = spec.choices ? spec.choices : spec.ranges ? spec.ranges : spec.range;
    });
    return specs;
}
