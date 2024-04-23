import React from 'react'
import { Upload } from 'antd'
import UploadButton from './UploadButton'

const UploadComponent = ({ fileList, setFileList, multiple }) => {
  const handleFileChange = ({ fileList }) => {
    const updatedFileList = multiple ? fileList : fileList.slice(-1)
    setFileList(updatedFileList)
  }

  return (
    <Upload
      listType='picture-card'
      fileList={fileList}
      multiple={multiple}
      onChange={handleFileChange}
      beforeUpload={() => false} // Prevent auto upload
    >
      {!multiple && fileList.length >= 1 ? null : <UploadButton />}
    </Upload>
  )
}

export default UploadComponent
