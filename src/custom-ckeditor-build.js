const ClassicEditor = require( '@ckeditor/ckeditor5-build-classic' );
const Alignment = require( '@ckeditor/ckeditor5-alignment/src/alignment' );
const BlockQuote = require( '@ckeditor/ckeditor5-block-quote/src/blockquote' );
const Code = require( '@ckeditor/ckeditor5-basic-styles/src/code' );
const CodeBlock = require( '@ckeditor/ckeditor5-code-block/src/codeblock' );
const Image = require( '@ckeditor/ckeditor5-image/src/image' );
const ImageCaption = require( '@ckeditor/ckeditor5-image/src/imagecaption' );
const ImageStyle = require( '@ckeditor/ckeditor5-image/src/imagestyle' );
const ImageToolbar = require( '@ckeditor/ckeditor5-image/src/imagetoolbar' );
const ImageUpload = require( '@ckeditor/ckeditor5-image/src/imageupload' );

ClassicEditor.builtinPlugins = [
    ...ClassicEditor.builtinPlugins,
    Alignment,
    BlockQuote,
    Code,
    CodeBlock,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload
];

ClassicEditor.defaultConfig = {
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'alignment',
            'outdent',
            'indent',
            '|',
            'blockQuote',
            'code',
            'codeBlock',
            '|',
            'imageUpload',
            'insertTable',
            'mediaEmbed',
            '|',
            'undo',
            'redo'
        ]
    },
    image: {
        toolbar: [
            'imageTextAlternative',
            'imageStyle:full',
            'imageStyle:side'
        ]
    }
};

module.exports = ClassicEditor;
