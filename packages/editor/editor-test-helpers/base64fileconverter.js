import * as tslib_1 from "tslib";
var HAS_BASE64_FILE_SUPPORT = typeof File !== 'undefined' &&
    typeof FileReader !== 'undefined' &&
    typeof FileList !== 'undefined' &&
    typeof Blob !== 'undefined';
var getPasteFiles = function (clipboardData) {
    if (!clipboardData) {
        return [];
    }
    var items = Array.prototype.reduce.call(clipboardData.items || clipboardData.files, function (filesArr, item) {
        if (item.kind === 'file') {
            filesArr.push(item.getAsFile());
        }
        return filesArr;
    }, []);
    return tslib_1.__spread(items);
};
var Converter = /** @class */ (function () {
    function Converter(supportedTypes, maxFileSizeInBytes) {
        this.HAS_BASE64_FILE_SUPPORT = HAS_BASE64_FILE_SUPPORT;
        this.supportedTypes = supportedTypes;
        this.maxFileSizeInBytes = maxFileSizeInBytes;
    }
    Converter.prototype.convert = function (files, fn, errFn) {
        var _this = this;
        if (fn === void 0) { fn = function (base64src) { }; }
        if (errFn === void 0) { errFn = function (file) { }; }
        if (files && files[0]) {
            files.forEach(function (file) {
                var mimeType = file.type;
                if (file.size > _this.maxFileSizeInBytes ||
                    !_this.supportedTypes.some(function (fileType) { return mimeType.indexOf(fileType) !== -1; })) {
                    errFn(file);
                }
                var reader = new FileReader();
                reader.onerror = function (e) {
                    errFn(file);
                };
                var onLoadBinaryString = function (readerEvt) {
                    var binarySrc = btoa(readerEvt.target.result);
                    fn("data:" + mimeType + ";base64," + binarySrc);
                };
                var onLoadDataUrl = function (readerEvt) {
                    fn(readerEvt.target.result);
                };
                if ('readAsDataURL' in reader) {
                    reader.onload = onLoadDataUrl;
                    reader.readAsDataURL(file);
                }
                else {
                    // `readAsDataURL` exists on the Type so TS things this will never occur and
                    // marks `reader: never`. In reality, not all browsers support `readAsDataURL`
                    // hence we perform this check, and recast to appease Typechecking.
                    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL#Browser_compatibility
                    var fileReader = reader;
                    fileReader.onload = onLoadBinaryString;
                    fileReader.readAsBinaryString(file);
                }
            });
        }
    };
    return Converter;
}());
export { Converter };
export function dropHandler(converter, e, fn) {
    if (!converter.HAS_BASE64_FILE_SUPPORT ||
        !(e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length)) {
        return false;
    }
    var files = Array.prototype.slice.call(e.dataTransfer.files);
    converter.convert(files, function (src) { return fn({ src: src }); });
    return true;
}
export function pasteHandler(converter, e, fn) {
    var pastedFiles = getPasteFiles(e.clipboardData);
    if (!converter.HAS_BASE64_FILE_SUPPORT || !pastedFiles.length) {
        return false;
    }
    if (pastedFiles.length) {
        converter.convert(pastedFiles, function (src) {
            fn({ src: src });
        });
        return true;
    }
    return false;
}
//# sourceMappingURL=base64fileconverter.js.map