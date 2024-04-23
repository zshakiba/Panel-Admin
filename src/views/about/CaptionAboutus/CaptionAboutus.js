import { Alltext } from '../../../assets/AllText'
import { Button, Card, Form, Popconfirm, Tag } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState, useEffect } from 'react'
import EditForm from './EditForm'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import ModalComponent from 'src/components/ModalComponent'
import TableComponent from 'src/components/TableComponent '
import useFetch from 'src/hooks/useFetch'
import { fetchFunction, handleResponse } from 'src/utils'
import { useAddCaptionAboutus } from 'src/hooks/useAdd'
import { useDeleteCaption } from 'src/hooks/useDelete'
import query from 'src/schema/query'

const AboutText = () => {
  let [form] = Form.useForm()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  let [isEditModalVisible, setIsEditModalVisible] = useState(false)
  let [selectedItem, setSelectedItem] = useState(null)
  let [dataSource, setDataSource] = useState([])
  const { loading, data, error } = useFetch(query.get.caption)
  const { executeMutation: deleteMutation, loading: deleteLoading } = useDeleteCaption()
  const { executeMutation, loading: createLoading, error: createError } = useAddCaptionAboutus()

  useEffect(() => {
    if (!token) {
      navigate('/login')
      toast.error(`Please login first`)
    } else if (data) {
      fetchFunction(data, setDataSource, navigate, 'caption')
    }
  }, [token, data])

  let handleEdit = record => {
    setSelectedItem(record)
    setIsEditModalVisible(true)
  }

  let handleDelete = async id => {
    if (!token) {
      navigate('/login')
      toast.error(`please login first`)
    } else {
      try {
        const result = await deleteMutation(id)
        handleResponse(result)
      } catch (error) {
        toast.error(`Error: ${error}`)
      }
    }
  }

  let handleFormSubmit = async values => {
    if (!token) {
      navigate('/login')
      toast.error(`Please login first`)
    } else {
      try {
        const newValues = { text: values.caption }
        const result = await executeMutation(newValues)
        handleResponse(result)
      } catch (error) {
        toast.error(`Error: ${error}`)
      }
    }
  }

  let columns = [
    {
      title: Alltext.aboutUs.caption,
      dataIndex: 'caption',
      width: '80%',
      editable: true,
    },
    {
      title: Alltext.aboutUs.status,
      dataIndex: 'status',
      width: '10%',
      render: (_, record) =>
        record.isEnabled ? (
          <Tag color='cyan'>{Alltext.aboutUs.active}</Tag>
        ) : (
          <Tag color='red'>{Alltext.aboutUs.disactive}</Tag>
        ),
    },
    {
      title: '',
      dataIndex: 'operation',
      width: '5%',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title={Alltext.confirmDelete}
            okText={Alltext.ok}
            cancelText={Alltext.cancel}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button style={{ backgroundColor: '#1677FF', color: '#fff' }}>{Alltext.delete}</Button>
          </Popconfirm>
        ) : null,
    },
    {
      title: '',
      dataIndex: 'operation',
      width: '5%',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Button
            style={{ backgroundColor: '#1677FF', color: '#fff' }}
            onClick={() => handleEdit(record)}
          >
            {Alltext.edit}
          </Button>
        ) : null,
    },
  ]

  return (
    <>
      <Card style={{ marginBottom: 20 }} title={Alltext.aboutUs.aboutUs}>
        <Form form={form} layout='vertical' autoComplete='off' onFinish={handleFormSubmit}>
          <Form.Item label={Alltext.aboutUs.caption} name='caption'>
            <TextArea showCount maxLength={100} placeholder='Enter text here' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' style={{ marginLeft: 10 }}>
              {Alltext.submit}
            </Button>
          </Form.Item>
        </Form>
        <TableComponent
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          id='#captionAboutusTable'
        />
      </Card>

      <ModalComponent
        visible={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false)
          setSelectedItem(null)
        }}
        title={Alltext.editTitle}
      >
        <EditForm selectedItem={selectedItem} />
      </ModalComponent>
    </>
  )
}

export default React.memo(AboutText)
