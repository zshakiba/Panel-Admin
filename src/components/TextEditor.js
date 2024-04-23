import React, { useEffect, useState } from 'react'
// import "./styles.css";
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import Froala from 'react-froala-wysiwyg'
import 'froala-editor/js/languages/fa.js'
import { useEditorUploadImage } from 'src/hooks/useAdd'

const defaultContent = ``

const froalaEditorConfig = {
  // Other configuration options remain the same
  language: 'fa', // Set the language to Persian
  toolbarButtons: {
    moreText: {
      buttons: [
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'fontFamily',
        'fontSize',
        'textColor',
        'backgroundColor',
        'inlineClass',
        'inlineStyle',
        'clearFormatting',
      ],
      align: 'left',
      buttonsVisible: 3,
    },
    moreParagraph: {
      buttons: [
        'alignLeft',
        'alignCenter',
        'formatOLSimple',
        'alignRight',
        'alignJustify',
        'formatOL',
        'formatUL',
        'outdent',
        'indent',
        'quote',
      ],
      align: 'left',
      buttonsVisible: 3,
    },
    moreRich: {
      buttons: [
        'insertLink',
        'insertImage',
        'insertVideo',
        'insertFile',
        'insertTable',
        'emoticons',
        'fontAwesome',
        'specialCharacters',
        'embedly',
        'insertHR',
      ],
      align: 'left',
      buttonsVisible: 3,
    },
    moreMisc: {
      buttons: [
        'undo',
        'redo',
        'fullscreen',
        'print',
        'getPDF',
        'spellChecker',
        'selectAll',
        'html',
        'help',
      ],
      align: 'right',
      buttonsVisible: 3,
    },
    // Add a custom toolbar section for the code button
    // codeSection: {
    //   buttons: ['codeView'],
    //   align: 'right',
    //   buttonsVisible: 1
    // }
  },
  imageUpload: function(file, insertImage) {
    // Here, 'file' is the File object representing the image
    // You can now process this file object as needed

    // For demonstration, let's log the file object
    console.log(file,insertImage);

    // Example: Insert the image into the editor using a placeholder URL
    // You would typically upload the file to your server and use the returned URL
    // insertImage('http://example.com/path/to/placeholder-image.jpg');
 },
  // events: {
  //   'image.beforeUpload': function (images) {
  //     console.log('image.beforeUpload', images)
  //     // Return false if you want to stop the image upload.
  //   },
  //   'image.uploaded': function (response) {
  //     console.log('image.uploaded', response)
  //     // Image was uploaded to the server.
  //   },
  //   'image.inserted': function ($img, response) {
  //     console.log('image.inserted', $img, response)
  //     // Image was inserted in the editor.
  //   },
  //   'image.replaced': function ($img, response) {
  //     console.log('image.replaced', $img, response)
  //     // Image was replaced in the editor.
  //   },
  //   'image.error': function (error, response) {
  //     console.log('image.error', response)
  //     // Bad link.
  //   },
  // },
  // imageUploadURL: '/your-image-upload-endpoint',
  // Optionally, specify additional parameters to send with the upload request
  imageUploadParams: {
    // Example: Additional parameters
    // 'key': 'value'
  },
  // Optionally, specify the request type (default is 'POST')
  imageUploadMethod: 'POST',
  // Optionally, specify the response type (default is 'json')
  // imageUploadResponseKey: 'url',
}

const TextEditor = ({ onChange, defaultContent }) => {
  const [content, setContent] = useState(defaultContent || '')
  const { executeMutation, loading, error } = useEditorUploadImage()

  const onModelChange = model => {
    // console.log(model);
    setContent(model)
    onChange(model)
  }

  return (
    <div className='App'>
      <Froala
        model={content}
        onModelChange={onModelChange}
        tag='textarea'
        config={froalaEditorConfig}
      ></Froala>
    </div>
  )
}

export default TextEditor
