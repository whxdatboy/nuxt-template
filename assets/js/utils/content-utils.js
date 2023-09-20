import LazyLoad from 'vanilla-lazyload';

export function htmlToImgProxy(imgUtil, html, lazy = true, options = { width: 200, quality: 80 }) {
    if (process.browser) {
        // Parse the HTML string using a DOMParser
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Select all <img> elements and modify their src attributes
        const imgElements = doc.querySelectorAll('img');
        imgElements.forEach(img => {
            const modifiers = { ...options };

            // Modify the src attribute
            if (img?.style?.width) {
                modifiers.width = img.style.width;
            }

            const newSrc = imgUtil(img.src, modifiers);

            if (lazy) {
                const preview = imgUtil(img.src, { ...modifiers, preset: 'preview' });
                img.setAttribute('data-src', newSrc);
                img.setAttribute('src', preview);
                img.className += ' lazy';
            } else {
                img.setAttribute('src', newSrc);
            }
        });

        // Serialize the updated HTML back to a string
        if (lazy) {
            const lazyOptions = {
                use_native: false,
                unobserve_completed: true,
                unobserve_entered: true,
                threshold: 50,
            };

            const newLazyLoad = new LazyLoad(lazyOptions, doc);

            setTimeout(() => {
                newLazyLoad.update();
            }, 300);
        }
        return doc.documentElement.innerHTML;
    }

    return html;
}
