import React, { useState } from 'react'
import { Form, Row, Col, Divider } from 'antd'
import { Alltext } from 'src/assets/AllText'
import SubmitButton from 'src/components/SubmitButton'
import TextArea from 'antd/es/input/TextArea'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { handleResponse } from 'src/utils'
import { useEditCaptionAboutus } from 'src/hooks/useEdit'

function EditForm ({ selectedItem }) {
  let token = localStorage.getItem('token')
  const navigate = useNavigate()
  let [form] = Form.useForm()

  let [buttonDisabled, setButtonDisabled] = useState(true)
  let [buttonClicked, setButtonClicked] = useState(false)

  const { executeMutation, loading, error } = useEditCaptionAboutus()

  let handleFormItemChange = () => {
    setButtonDisabled(form.getFieldsError().some(field => field.errors.length > 0))
  }

  let handleFormSubmit = async values => {
    setButtonClicked(true)

    if (!token) {
      navigate('/login')
      toast.error(`please login first`)
    } else {
      try {
        const result = await executeMutation({ ...values, selectedItem })
        handleResponse(result)
      } catch (error) {
        toast.error('if: Failed to edit caption:', error.message ? error.message : error)
      }
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
          <Col className='gutter-row' xs={24} sm={24} md={24} lg={24}>
            <Form.Item
              name='caption'
              rules={[{ required: true, message: Alltext.aboutUs.validationMessage.caption }]}
            >
              <TextArea placeholder={Alltext.aboutUs.caption} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24} justify="end">
          <Col className='gutter-row' xs={24} sm={24} md={24} lg={24}>
            <Form.Item >
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
