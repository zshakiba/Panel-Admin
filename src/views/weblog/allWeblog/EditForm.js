import React, { useState } from 'react'
import { CloseOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Form, Input, Card, Upload, Row, Col, Select, Typography } from 'antd'
import { Alltext } from 'src/assets/AllText'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { handleResponse } from 'src/utils'
import { useEditWeblog } from 'src/hooks/useEdit'
import SubmitButton from 'src/components/SubmitButton'
import TextEditor from 'src/components/TextEditor1'

const { TextArea } = Input
const { Text } = Typography

const normFile = e => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

const EditForm = () => {
  let token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const location = useLocation()

  const categories = location.state?.categories
  const selectedItem = location.state?.selectedItem

  const { executeMutation, loading, error } = useEditWeblog()
  const [editorContent, setEditorContent] = useState('')

  const handleEditorChange = data => {
    setEditorContent(data)
  }
  const initialValues = {
    title: selectedItem.title,
    categoryWeblog: selectedItem.categoryWeblog,
    content: selectedItem.content,
  }
  console.log(selectedItem)
  const [isImageUploaded, setIsImageUploaded] = useState(false)

  let [buttonClicked, setButtonClicked] = useState(false)

  const handleImageUpload = ({ fileList }) => {
    if (fileList.length > 0) {
      setIsImageUploaded(true)
    } else {
      setIsImageUploaded(false)
    }
  }

  let handleFormSubmit = async values => {
    setButtonClicked(true)
    const selectedCategory = categories.find(category => category.title === values.categoryWeblog)
    if (selectedCategory) {
      values.categoryWeblog = selectedCategory.title
    } else {
      toast.error('Error: Category not found')
      return
    }

    if (!token) {
      navigate('/login')
      toast.error(`Please login first`)
    } else if (categories) {
      try {
        const result = await executeMutation({ values, selectedItem })
        handleResponse(result, navigate)
      } catch (error) {
        toast.error(`Error: ${error}`)
      }
    }
  }

  return (
    <>
      <Card
        title={'ویرایش وبلاگ'}
        extra={
          <ArrowLeftOutlined
            onClick={() => {
              navigate('/weblog')
            }}
          />
        }
      >
        <Text>برای ویرایش وبلاگ لطفا فرم زیر را پر کنید:</Text>
        <Card
          style={{
            marginTop: '10px',
            border: '1px solid rgba(0, 0, 21, 0.2)',
            borderRadius: '7px',
          }}
        >
          <Form
            form={form}
            onFinish={handleFormSubmit}
            initialValues={initialValues}
            id='cardFormList'
          >
            <Row gutter={24}>
              <Col className='gutter-row' xs={24} sm={8} md={8} lg={8}>
                <Form.Item name='dirimage' getValueFromEvent={normFile}>
                  <Upload
                    // action={'https://backend.toppteamm.ir/graphql'}
                    listType='picture-card'
                    maxCount={1}
                    fileList={form.getFieldValue('dirimage')}
                    onChange={handleImageUpload}
                  >
                    {!isImageUploaded && (
                      <button style={{ border: 0, background: 'none' }} type='button'>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>{Alltext.upload}</div>
                      </button>
                    )}
                  </Upload>
                </Form.Item>
              </Col>
              <Col className='gutter-row' xs={24} sm={8} md={8} lg={8}>
                <Form.Item label={Alltext.weblog.title} name='title' style={{ marginTop: '45px' }}>
                  <Input placeholder={Alltext.weblog.title} />
                </Form.Item>
              </Col>
              <Col className='gutter-row' xs={24} sm={8} md={8} lg={8}>
                <Form.Item name='categoryWeblog'>
                  <Select style={{ marginTop: '45px' }}>
                    {categories.map(cat => (
                      <Select.Option key={cat.title} value={cat.title} label={cat.title}>
                        {cat.title}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24} justify='end' style={{ marginTop: '10px' }}>
              <Col className='gutter-row' xs={24} sm={24} md={24} lg={24}>
                <TextEditor onChange={handleEditorChange} defaultContent={selectedItem.content} />
              </Col>
            </Row>

            <Row gutter={24} justify='end' style={{ marginTop: '10px' }}>
              <Col className='gutter-row' xs={24} sm={12} md={12} lg={12}>
                <Form.Item>
                  <SubmitButton
                    disabled={false}
                    text={Alltext.add}
                    buttonClicked={buttonClicked}
                    loading={loading}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Card>
    </>
  )
}

export default EditForm
