export const scriptsList = [];

export const handleSetHeadSrc = scriptItem => {
    const script = document.createElement('script');
    script.type = 'text/javascript';

    if (scriptItem.async) {
        script.async = true;
    }

    script.src = scriptItem.src;
    document.head.appendChild(script);
};

export const handleSetHeadScript = (scriptItem, idx) => {
    const script = document.createElement('script');
    if (scriptItem.async) {
        script.async = true;
    }

    script.text = scriptItem.innerHTML;
    script.id = `script_${idx}`;
    document.head.appendChild(script);
    const found = document.querySelector(`script[id="script_${idx}"]`);

    if (found) {
        found.removeAttribute('id');
        found.parentNode.insertBefore(script, found);
    }
};

export const handleAddScripts = (array = scriptsList) => {
    if (!array?.length) {
        return;
    }
    array.forEach((scriptItem, id) => {
        if (scriptItem.src) {
            handleSetHeadSrc(scriptItem);
        } else if (scriptItem.innerHTML) {
            handleSetHeadScript(scriptItem, id);
        }
    });
};
