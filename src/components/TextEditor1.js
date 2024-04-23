import React, { useEffect, useState } from 'react'
// import "./styles.css";
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import Froala from 'react-froala-wysiwyg'
import 'froala-editor/js/languages/fa.js'
import { useEditorUploadImage } from 'src/hooks/useAdd'
import { gql, useMutation } from '@apollo/client'

const defaultContent = ``
const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
      status
      message
      pathimage
    }
  }
`
const froalaEditorConfig = {
  language: 'fa',
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
  },
  // imageUpload: function (file, insertImage, uploadImage) {
  //   console.log("ccccccccccccccc");
  //   console.log({ file, insertImage, uploadImage })
  //   uploadImage({ variables: { file } })
  //     .then(({ data }) => {
  //       const imageUrl = data.uploadImage.url
  //       insertImage(imageUrl)
  //     })
  //     .catch(error => {
  //       console.error('Error uploading image:', error)
  //     })
  // },
  events: {
    'image.beforeUpload': function (images) {
      console.log(images);
      images.forEach((image) => {
        const file = image.blob; // Access the file object
        console.log(file); // Log the file object to the console
      });
    },
  },
}
const TextEditor = ({ onChange, defaultContent }) => {
  const [content, setContent] = useState(defaultContent || '')
  const [uploadImage] = useMutation(UPLOAD_IMAGE)
  // console.log('uploadImage:', uploadImage)

  const onModelChange = model => {
    setContent(model)
    onChange(model)
  }

  // const customImageUpload = (file, insertImage) => {
  //   froalaEditorConfig.imageUpload(file, insertImage, uploadImage)
  // }

  return (
    <div className='App'>
      <Froala
        model={content}
        onModelChange={onModelChange}
        tag='textarea'
        config={{
          ...froalaEditorConfig,
          // imageUpload: customImageUpload,
        }}
      ></Froala>
    </div>
  )
}

export default TextEditor

