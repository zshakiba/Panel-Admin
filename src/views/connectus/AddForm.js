import React, { useState } from 'react'
import { Form, Input, Space, Row, Col, Divider } from 'antd'
import { Alltext } from 'src/assets/AllText'
import SubmitButton from 'src/components/SubmitButton'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { emailRegex, handleResponse } from 'src/utils'
import { useAddConnectus } from 'src/hooks/useAdd'

function AddForm () {
  let token = localStorage.getItem('token')
  let [form] = Form.useForm()
  const navigate = useNavigate()

  let [buttonDisabled, setButtonDisabled] = useState(true)
  let [buttonClicked, setButtonClicked] = useState(false)

  const { executeMutation, loading, error } = useAddConnectus()

  let handleFormItemChange = () => {
    setButtonDisabled(form.getFieldsError().some(field => field.errors.length > 0))
  }

  const handleFormSubmit = async values => {
    setButtonClicked(true)

    if (!token) {
      navigate('/login')
      toast.error('Please login first')
      return // Exit early if there's no token
    }

    try {
      const result = await executeMutation(values)
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
        onFieldsChange={handleFormItemChange}
      >
        <Row gutter={24}>
          <Col xs={24} sm={12} md={12} lg={12} className='gutter-row'>
            <Form.Item
              name='fname'
              label={Alltext.connectUs.fname}
              rules={[
                { required: true, message: Alltext.connectUs.validationMessage.fnameRequired },
              ]}
            >
              <Input placeholder={Alltext.connectUs.fname} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} className='gutter-row'>
            <Form.Item
              name='email'
              label={Alltext.connectUs.email}
              rules={[
                { required: true, message: Alltext.connectUs.validationMessage.emailRequired },
                {
                  pattern: emailRegex,
                  message: Alltext.connectUs.validationMessage.emailFormatInvalid,
                },
              ]}
            >
              <Input placeholder={Alltext.connectUs.email} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={24} lg={24} className='gutter-row'>
            <Form.Item
              name='description'
              label={Alltext.connectUs.description}
              rules={[
                {
                  required: true,
                  message: Alltext.connectUs.validationMessage.descriptionRequiredRequiredRequired,
                },
              ]}
            >
              <Input placeholder={Alltext.connectUs.description} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24} justify='end'>
          <Col xs={24} sm={12} md={12} lg={12} className='gutter-row'>
            <Form.Item>
              <SubmitButton
                disabled={buttonDisabled}
                text={Alltext.add}
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

export default AddForm
