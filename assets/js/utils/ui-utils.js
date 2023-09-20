export function getFontSize() {
    const html = window.document.documentElement;
    const style = window.getComputedStyle(html, null).getPropertyValue('font-size');
    return parseFloat(style);
}
