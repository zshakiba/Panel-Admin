import React, { useState, useEffect } from 'react'
import { Button, Card, Popconfirm, Space } from 'antd'
import { Alltext } from '../../assets/AllText'
import toast from 'react-hot-toast'
import EditForm from './EditForm'
import AddForm from './AddForm'
import { useNavigate } from 'react-router-dom'
import TableComponent from 'src/components/TableComponent '
import ModalComponent from 'src/components/ModalComponent'
import useFetch from 'src/hooks/useFetch'
import { fetchFunction, handleResponse } from 'src/utils'
import { useDeleteConnectus } from 'src/hooks/useDelete'
import query from 'src/schema/query'

const Connectus = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  let [isModalVisible, setIsModalVisible] = useState(false)
  let [dataSource, setDataSource] = useState([])
  let [selectedItem, setSelectedItem] = useState('')

  const { loading, data, error } = useFetch(query.get.connectus)
  const { executeMutation, loading: deleteLoading } = useDeleteConnectus()

  useEffect(() => {
    if (!token) {
      navigate('/login')
      toast.error(`Please login first`)
    } else if (data) {
      fetchFunction(data, setDataSource, navigate, 'conecctus')
    }
  }, [data])

  let handleEdit = record => {
    setSelectedItem(record)
    setIsModalVisible(true)
  }

  let handleDelete = async id => {
    console.log('id', id)
    if (!token) {
      navigate('/login')
      toast.error('Please login first')
      return
    }

    try {
      const result = await executeMutation(id)
      handleResponse(result)
    } catch (error) {
      toast.error(`Error: ${error}`)
    }
  }

  let columns = [
    {
      title: Alltext.connectUs.fname,
      dataIndex: 'fname',
      width: '15%',
      editable: true,
    },
    {
      title: Alltext.connectUs.email,
      dataIndex: 'email',
      width: '15%',
    },
    {
      title: Alltext.connectUs.description,
      dataIndex: 'description',
      width: '15%',
    },
    {
      title: Alltext.connectUs.response,
      dataIndex: 'response',
      width: '15%',
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
      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={() => setIsModalVisible(!isModalVisible)} type='primary'>
            {Alltext.add}
          </Button>
        </Space>
        <TableComponent
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          id='#connectusTable'
        />
      </Card>

      <ModalComponent
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false)
          setSelectedItem(null)
        }}
        title={selectedItem ? Alltext.editTitle : Alltext.addTitle}
      >
        {selectedItem ? <EditForm selectedItem={selectedItem} /> : <AddForm />}
      </ModalComponent>
    </>
  )
}

export default React.memo(Connectus)
