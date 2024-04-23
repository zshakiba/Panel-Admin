import React, { useState } from 'react'
import { CloseOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Form, Input, Card, Upload, Row, Col, Select, Typography } from 'antd'
import { Alltext } from 'src/assets/AllText'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAddWeblog } from 'src/hooks/useAdd'
import toast from 'react-hot-toast'
import { handleResponse } from 'src/utils'
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

const AddForm = () => {
  let token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const location = useLocation()
  const categories = location.state?.categories
  const { executeMutation, loading, error } = useAddWeblog()

  const [isImageUploaded, setIsImageUploaded] = useState(false)
  const [editorContent, setEditorContent] = useState('<p>Hello from CKEditor 5!</p>')

  const handleEditorChange = data => {
    setEditorContent(data)
  }

  let [buttonClicked, setButtonClicked] = useState(false)

  const handleImageUpload = ({ fileList }) => {
    if (fileList.length > 0) {
      setIsImageUploaded(true)
    } else {
      setIsImageUploaded(false)
    }
  }

  const handleFormSubmit = async values => {
    console.log(values);
    setButtonClicked(true)
    if (editorContent === '') {
      toast.error('Please add weblog content')
      return // Exit early if there are no items
    }
    if (!token) {
      navigate('/login')
      toast.error('Please login first')
      return // Exit early if there's no token
    }

    try {
      const newValues = { values, editorContent }
      const result = await executeMutation(newValues)
      handleResponse(result, navigate)
    } catch (error) {
      console.log(error)
      toast.error(`Error: ${error}`)
    }
  }

  return (
    <>
      <Card
        title={'ایجاد وبلاگ'}
        extra={
          <ArrowLeftOutlined
            onClick={() => {
              navigate('/weblog')
            }}
          />
        }
      >
        <Text>برای ایجاد وبلاگ لطفا فرم زیر را پر کنید:</Text>
        <Card
          style={{
            marginTop: '10px',
            border: '1px solid rgba(0, 0, 21, 0.2)',
            borderRadius: '7px',
          }}
        >
          <Form
            id='cardFormList'
            form={form}
            onFinish={handleFormSubmit}
            initialValues={{
              // items: [], // Initialize items as an empty array
              dirimage: [], // Initialize dirimage with an empty array
            }}
          >
            <Row gutter={24}>
              <Col className='gutter-row' xs={24} sm={8} md={8} lg={8}>
                <Form.Item
                  name='dirimage'
                  getValueFromEvent={normFile}
                  rules={[
                    {
                      required: true,
                      message: Alltext.aboutUs.validationMessage.nameRequiredRequired,
                    },
                  ]}
                >
                  <Upload
                    action={'https://backend.toppteamm.ir/public'}
                    listType='picture-card'
                    maxCount={1}
                    fileList1={form.getFieldValue('dirimage')}
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
                <Form.Item
                  label={Alltext.weblog.title}
                  name='title'
                  style={{ marginTop: '45px' }}
                  rules={[
                    {
                      required: true,
                      message: Alltext.aboutUs.validationMessage.nameRequiredRequired,
                    },
                  ]}
                >
                  <Input placeholder={Alltext.weblog.title} />
                </Form.Item>
              </Col>
              <Col className='gutter-row' xs={24} sm={8} md={8} lg={8}>
                <Form.Item
                  name='categoryWeblog'
                  rules={[
                    {
                      required: true,
                      message: Alltext.aboutUs.validationMessage.nameRequiredRequired,
                    },
                  ]}
                >
                  <Select style={{ marginTop: '45px' }}>
                    {categories.map(cat => (
                      <Select.Option key={cat.id} value={cat.id} label={cat.title}>
                        {cat.title}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24} justify='end' style={{ marginTop: '10px' }}>
              <Col className='gutter-row' xs={24} sm={24} md={24} lg={24}>
                <TextEditor onChange={handleEditorChange} />
              </Col>
            </Row>
            <div
              style={{
                border: '1px solid blue',
                borderRadius: '5px',
                marginTop: '20px',
                padding: '10px',
              }}
              dangerouslySetInnerHTML={{ __html: editorContent }}
            ></div>

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

export default AddForm
