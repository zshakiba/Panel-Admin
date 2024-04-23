import React, { useEffect, useState } from 'react'
import { Form, Input, Space, Row, Col, Divider } from 'antd'
import { Alltext } from 'src/assets/AllText'
import SubmitButton from 'src/components/SubmitButton'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import UploadComponent from 'src/components/UploadComponent'
import { emailRegex, handleResponse } from 'src/utils'
import { useEditAboutus } from 'src/hooks/useEdit'

function EditForm ({ selectedItem }) {
  let token = localStorage.getItem('token')
  let [form] = Form.useForm()
  let [buttonDisabled, setButtonDisabled] = useState(true)
  let [buttonClicked, setButtonClicked] = useState(false)
  let [fileList, setFileList] = useState([])
  const navigate = useNavigate()

  const { executeMutation, loading, error } = useEditAboutus()

  useEffect(() => {
    form.setFieldsValue({ file: fileList })
  })
  let handleFormItemChange = () => {
    setButtonDisabled(form.getFieldsError().some(field => field.errors.length > 0))
  }

  let handleFormSubmit = async values => {
    setButtonClicked(true)
    if (token) {
      try {
        const result = await executeMutation({ ...values, file: fileList, selectedItem })
        handleResponse(result)
      } catch (error) {
        toast.error(`Error: ${error}`)
      }
    } else if (!token) {
      navigate('/login')
      toast.error(`please login first`)
    }
  }

  return (
    <div>
      <Divider style={{ marginTop: '0' }} />
      <Form
        form={form}
        layout='vertical'
        onFinish={handleFormSubmit}
        autoComplete='off'
        initialValues={selectedItem}
        onFieldsChange={handleFormItemChange}
      >
        <Row gutter={24}>
          <Col className='gutter-row' xs={24} sm={8} md={8} lg={8}>
            <Form.Item name='dirimage'>
              <UploadComponent multiple={false} fileList={fileList} setFileList={setFileList} />
            </Form.Item>
          </Col>
          <Col className='gutter-row' xs={24} sm={16} md={16} lg={16}>
            <Form.Item
              name='name'
              label={Alltext.aboutUs.name}
              rules={[{ required: true, message: Alltext.aboutUs.validationMessage.nameRequired }]}
            >
              <Input placeholder={Alltext.aboutUs.name} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col className='gutter-row' xs={24} sm={8} md={8} lg={8}>
            <Form.Item
              name='email'
              label={Alltext.aboutUs.email}
              rules={[
                { required: true, message: Alltext.aboutUs.validationMessage.emailRequired },
                {
                  pattern: emailRegex,
                  message: Alltext.aboutUs.validationMessage.emailFormatInvalid,
                },
              ]}
            >
              <Input placeholder={Alltext.aboutUs.email} />
            </Form.Item>
          </Col>
          <Col className='gutter-row' xs={24} sm={16} md={16} lg={16}>
            <Form.Item
              name='explain'
              label={Alltext.aboutUs.explain}
              rules={[
                { required: true, message: Alltext.aboutUs.validationMessage.explainRequired },
              ]}
            >
              <Input placeholder={Alltext.aboutUs.explain} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12} justify='end'>
          <Col className='gutter-row' xs={24} sm={12} md={12} lg={12}>
            <Form.Item>
              <SubmitButton
                disabled={buttonDisabled}
                text={Alltext.edit}
                buttonClicked={buttonClicked}
                loading={loading}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default EditForm
