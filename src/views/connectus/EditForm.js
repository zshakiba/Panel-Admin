import React, { useEffect, useState } from 'react'
import { Form, Input, Row, Col, Divider } from 'antd'
import { Alltext } from 'src/assets/AllText'
import SubmitButton from 'src/components/SubmitButton'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { emailRegex, handleResponse } from 'src/utils'
import { useEditConnectus } from 'src/hooks/useEdit'

function EditForm ({ selectedItem }) {
  let token = localStorage.getItem('token')
  let [form] = Form.useForm()
  const navigate = useNavigate()

  let [buttonDisabled, setButtonDisabled] = useState(true)
  let [buttonClicked, setButtonClicked] = useState(false)

  const { executeMutation, loading, error } = useEditConnectus()

  useEffect(() => {
    if (selectedItem) {
      form.setFieldsValue({
        dirimage: selectedItem.dirimage,
        title: selectedItem.title,
      })
    }
  }, [selectedItem, form])

  let handleFormItemChange = () => {
    setButtonDisabled(form.getFieldsError().some(field => field.errors.length > 0))
  }

  let handleFormSubmit = async values => {
    console.log(values);
    setButtonClicked(true)
    
  
    if (!token) {
      navigate('/login')
      toast.error('Please login first')
      return // Exit early if there's no token
    }

    try {
      const result = await executeMutation({ ...values })
      handleResponse(result)
    } catch (error) {
      toast.error(`Error: ${error}`)
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
          <Col xs={24} sm={12} md={12} lg={12} className='gutter-row'>
            <Form.Item
              name='email'
              label={Alltext.connectUs.email}
              rules={[
                { required: true, message: Alltext.connectUs.validationMessage.emailRequired },
                { pattern: emailRegex, message: Alltext.connectUs.validationMessage.emailFormatInvalid },
              ]}
            >
              <Input placeholder={Alltext.connectUs.email} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} className='gutter-row'>
            <Form.Item
              name='response'
              label={Alltext.connectUs.response}
              rules={[{ required: true, message: Alltext.connectUs.validationMessage.responseRequired }]}
            >
              <Input placeholder={Alltext.connectUs.response} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24} justify="end">
          <Col xs={24} sm={12} md={12} lg={12} className='gutter-row'>
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
