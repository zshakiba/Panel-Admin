import React, { useState, useEffect } from 'react'
import { Form, Input, Divider, Checkbox, Row, Col } from 'antd'
import { Alltext } from '../../../assets/AllText'
import SubmitButton from 'src/components/SubmitButton'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { emailRegex, handleResponse, phoneNumberRegex } from 'src/utils'
import { useEditUser } from 'src/hooks/useEdit'

function EditForm ({ selectedUser }) {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [buttonClicked, setButtonClicked] = useState(false)

  const { executeMutation, loading, error } = useEditUser()

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue({
        ...selectedUser,
        password: '',
      })
    } else {
      form.resetFields()
    }
  }, [selectedUser, form])

  const handleFormItemChange = () => {
    setButtonDisabled(form.getFieldsError().some(field => field.errors.length > 0))
  }

  const handleFormSubmit = async values => {
    const password = selectedUser.password
    setButtonClicked(true)

    if (!token) {
      navigate('/login')
      toast.error('Please login first')
      return 
    }

    try {
      const result = await executeMutation({ ...values, password, selectedUser })
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
        initialValues={selectedUser}
        onFieldsChange={handleFormItemChange}
      >
        <Row gutter={24}>
          <Col className='gutter-row' xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              name='fname'
              rules={[{ required: true, message: Alltext.users.validationMessage.nameRequiredRequired }]}
            >
              <Input placeholder={Alltext.users.name} />
            </Form.Item>
          </Col>
          <Col className='gutter-row' xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              name='email'
              rules={[
                { required: true, message: Alltext.users.validationMessage.emailRequired },
                { pattern: emailRegex, message: Alltext.users.validationMessage.emailFormatInvalid },
              ]}
            >
              <Input placeholder={Alltext.users.email} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col className='gutter-row' xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              name='phone'
              rules={[
                { required: true, message: Alltext.users.validationMessage.phoneNumber1 },
                {
                  pattern: phoneNumberRegex,
                  message: Alltext.users.validationMessage.phoneNumberFormatInvalid,
                },
              ]}
            >
              <Input placeholder={Alltext.users.phoneNumber} />
            </Form.Item>
          </Col>
          <Col className='gutter-row' xs={24} sm={12} md={12} lg={12}>
            <Form.Item name='isAdmin' valuePropName='checked'>
              <Checkbox>isAdmin</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24} justify="end">
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
