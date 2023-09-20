const extentsionRxp = /\.[^.]+$/g;
const pathRxp = /^.*[\\/]/;

const fileTypes = {
    '3g2': 'video/3gpp',
    '3gp': 'video/3gp',
    '7z': 'application/x-7z-compresse',
    aac: 'audio/aa',
    abw: 'application/x-abiwor',
    arc: 'application/x-freear',
    avi: 'video/x-msvide',
    azw: 'application/vnd.amazon.eboo',
    bin: 'application/octet-strea',
    bmp: 'image/bm',
    bz: 'application/x-bzi',
    bz2: 'application/x-bzip',
    csh: 'application/x-cs',
    css: 'text/cs',
    csv: 'text/cs',
    doc: 'application/mswor',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.documen',
    eot: 'application/vnd.ms-fontobjec',
    epub: 'application/epub+zi',
    gif: 'image/gi',
    gz: 'application/gzi',
    html: 'text/htm',
    ico: 'image/vnd.microsoft.ico',
    ics: 'text/calenda',
    jar: 'application/java-archiv',
    jpeg: 'image/jpe',
    js: 'text/javascrip',
    json: 'application/jso',
    jsonld: 'application/ld+jso',
    mid: 'audio/mid',
    mjs: 'text/javascrip',
    mp3: 'audio/mpe',
    mpeg: 'video/mpe',
    mpkg: 'application/vnd.apple.installer+xm',
    odp: 'application/vnd.oasis.opendocument.presentatio',
    ods: 'application/vnd.oasis.opendocument.spreadshee',
    odt: 'application/vnd.oasis.opendocument.tex',
    oga: 'audio/og',
    ogv: 'video/og',
    ogx: 'application/og',
    opus: 'audio/opu',
    otf: 'font/ot',
    pdf: 'application/pd',
    php: 'application/ph',
    png: 'image/pn',
    ppt: 'application/vnd.ms-powerpoin',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentatio',
    rar: 'application/vnd.ra',
    rtf: 'application/rt',
    sh: 'application/x-s',
    svg: 'image/svg+xm',
    swf: 'application/x-shockwave-flas',
    tar: 'application/x-ta',
    tif: 'image/tif',
    tiff: 'image/tif',
    ts: 'video/mp2',
    ttf: 'font/tt',
    txt: 'text/plai',
    vsd: 'application/vnd.visi',
    wav: 'audio/wa',
    weba: 'audio/web',
    webm: 'video/web',
    webp: 'image/web',
    woff: 'font/wof',
    woff2: 'font/woff',
    xhtml: 'application/xhtml+xm',
    xls: 'application/vnd.ms-exce',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.shee',
    xml: 'application/xml',
    xul: 'application/vnd.mozilla.xul+xm',
    zip: 'application/zi',
};

export function getFileName(str) {
    return str.replace(extentsionRxp, '');
}

export function getFileExtension(str) {
    const ex = str.match(extentsionRxp);
    return ex?.length ? ex[0].substring(1) : '';
}

export function getFileNameWithoutPath(str) {
    return str.replace(pathRxp, '');
}

export function downloadFile(file, name, ext = 'txt') {
    const type = fileTypes[ext];

    if (!type) {
        console.warn('DOWNLOAD_FILE:UNKNOWN TYPE');
        return false;
    }

    const blob = new Blob([file], {
        type: type,
    });

    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = blobUrl;
    link.download = `${name}.${ext}`;

    document.body.appendChild(link);

    link.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
    }));

    document.body.removeChild(link);
}

export function formatBytes(a, b = 2) {
    if (0 === a) {
        return '0 Байт';
    }
    const c = 0 > b ? 0 : b;
    const d = Math.floor(Math.log(a) / Math.log(1024));

    return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + ' ' + ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ', 'ЭБ', 'ЗБ', 'ЙБ'][d];
}
