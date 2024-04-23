import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Upload, Typography } from 'antd'
import { toast } from 'react-hot-toast'
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { handleResponse } from 'src/utils'
import { useAddBanner } from 'src/hooks/useAdd'
import { Alltext } from 'src/assets/AllText'
const { Text } = Typography

const ImageUploader = ({ Banners }) => {
  const [fileList, setFileList] = useState([])
  const [idprivate, setIdprivate] = useState('1')
  const [buttonClicked, setButtonClicked] = useState(false)

  const { executeMutation, loading, error } = useAddBanner()

  useEffect(() => {
    const hasBanner1 = Banners.some(banner => banner.idprivate === '1')
    const hasBanner2 = Banners.some(banner => banner.idprivate === '2')

    if (hasBanner1 && hasBanner2) {
      setIdprivate(null)
    } else if (hasBanner1) {
      setIdprivate('2')
    } else if (hasBanner2) {
      setIdprivate('1')
    } else {
      setIdprivate('1')
    }
  }, [Banners])

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList)
  }

  const handleCreate = async () => {
    if (Banners.length >= 2) {
      toast.error('You can have 2 banners only. Delete a banner for creating new.')
      return
    }

    const files = []
    setButtonClicked(true)

    fileList.forEach(file => {
      files.push(file.originFileObj)
    })

    try {
      const result = await executeMutation({ file: files, idprivate })
      handleResponse(result)
    } catch (error) {
      toast.error(`Error: ${error}`)
    }
  }

  return (
    <>
      <Row gutter={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Col className='gutter-row'>
          <Upload
            disabled={Banners.length >= 2}
            multiple
            name='file'
            listType='picture-card'
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false}
          >
            <button
              style={{ border: 0, background: 'none' }}
              type='button'
              disabled={Banners.length >= 2}
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>{Alltext.upload}</div>
            </button>
          </Upload>
        </Col>
        <Col className='gutter-row' xs={24} sm={16} md={16} lg={16}>
          {Banners.length == 2 && (
            <Text
              type='danger'
              style={{
                display: 'flex', // Enable Flexbox
                justifyContent: 'center', // Center horizontally
                alignItems: 'center', // Center vertically
                border: '2px solid #ccc',
                borderRadius: '10px',
                padding: '10px',
                textAlign: 'center',
              }}
            >
              حداکثر می توانید 2 بنر داشته باشید. برای ایجاد بنر جدید لطفا بنری را حذف کنید.
            </Text>
          )}
        </Col>
      </Row>

      {loading && buttonClicked && (
        <Button type='primary' style={{ marginTop: 20, width: '100px' }} disabled>
          <LoadingOutlined />
        </Button>
      )}

      {!loading && !buttonClicked && idprivate && (
        <Button
          type='primary'
          style={{ marginTop: 20, width: '100px' }}
          onClick={handleCreate}
          disabled={fileList.length === 0}
        >
          {Alltext.upload}
        </Button>
      )}
    </>
  )
}

export default ImageUploader
