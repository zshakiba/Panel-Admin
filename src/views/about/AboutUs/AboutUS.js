import React, { useState, useEffect } from 'react'
import { Card, Button, Popconfirm } from 'antd'
import { Alltext } from '../../../assets/AllText.js'
import EditForm from './EditForm.js'
import AddForm from './AddForm.js'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import ModalComponent from 'src/components/ModalComponent.js'
import TableComponent from 'src/components/TableComponent .js'
import useFetch from 'src/hooks/useFetch.js'
import { fetchFunction, handleResponse } from 'src/utils/index.js'
import { useDeleteAboutus } from 'src/hooks/useDelete.js'
import query from 'src/schema/query'

const AboutMember = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  let [isModalVisible, setIsModalVisible] = useState(false)
  let [selectedItem, setSelectedItem] = useState(null)
  let [dataSource, setDataSource] = useState([])
  const { loading, data, error } = useFetch(query.get.aboutus)
  const { executeMutation, loading: deleteLoading } = useDeleteAboutus()

  useEffect(() => {
    if (!token) {
      navigate('/login')
      toast.error(`Please login first`)
    } else if (data) {
      fetchFunction(data, setDataSource, navigate, 'users')
    }
  }, [token, data])

  let handleEdit = record => {
    setSelectedItem(record)
    setIsModalVisible(true)
  }

  let handleDelete = async id => {
    if (!token) {
      navigate('/login')
      toast.error(`please login first`)
    } else {
      try {
        const result = await executeMutation(id)
        handleResponse(result)
      } catch (error) {
        toast.error(`Error: ${error}`)
      }
    }
  }

  let columns = [
    {
      title: `${Alltext.aboutUs.dirImage}`,
      dataIndex: 'dirimage',
      width: '8%',
      render: (text, record) => {
        return (
          <img
            src={'https://backend.toppteamm.ir/public/' + text}
            alt='dirimage'
            style={{ width: '50px', height: '50px', borderRadius: '10%' }}
          />
        )
      },
    },
    {
      title: `${Alltext.aboutUs.name}`,
      dataIndex: 'name',
      width: '15%',
      editable: true,
    },
    {
      title: `${Alltext.aboutUs.email}`,
      dataIndex: 'email',
      width: '15%',
      editable: true,
    },
    {
      title: `${Alltext.aboutUs.explain}`,
      dataIndex: 'explain',
      width: '30%',
      editable: true,
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
      <Card title={Alltext.aboutUs.aboutUs}>
        <Button
          onClick={() => setIsModalVisible(!isModalVisible)}
          type='primary'
          style={{ marginBottom: 16 }}
        >
          {Alltext.addTitle}
        </Button>

        <TableComponent
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          id='#aboutusTable'
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

export default React.memo(AboutMember)
