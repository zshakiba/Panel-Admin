import React, { useEffect, useState, useMemo } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Button, Select, Popconfirm, Card, Form } from 'antd'
import useFetch from 'src/hooks/useFetch'
import { fetchFunction, handleResponse } from 'src/utils'
import { useDeleteWeblog } from 'src/hooks/useDelete'
import query from 'src/schema/query'
import TableComponent from 'src/components/TableComponent '
import ModalComponent from 'src/components/ModalComponent'
import EditForm from './EditForm'
import AddForm from './AddForm'
import { Alltext } from '../../../assets/AllText'

const Weblog = ({ allCategorySource }) => {
  const categories = allCategorySource?.categories
  const [form] = Form.useForm()
  const [dataSource, setDataSource] = useState([])
  let [selectedItem, setSelectedItem] = useState([])
  let [isModalVisible, setIsModalVisible] = useState(false)
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const { executeMutation, loading: deleteLoading } = useDeleteWeblog()
  const { loading, data, error } = useFetch(query.get.weblog)

  useEffect(() => {
    if (!token) {
      navigate('/login')
      toast.error(`Please login first`)
    } else if (data) {
      fetchFunction(data, setDataSource, navigate, 'Weblogs')
    }
  }, [token, data])

  let handleDelete = async id => {
    if (!token) {
      navigate('/login')
      toast.error('Please login first')
      return // Exit early if there's no token
    }

    try {
      const result = await executeMutation(id)
      handleResponse(result)
    } catch (error) {
      toast.error(`Error: ${error}`)
    }
  }

  let handleEdit = record => {
    navigate('/weblog/edit', { state: { categories, selectedItem: record } })
  }

  const columns = useMemo(() => [
    {
      title: Alltext.weblog.image,
      key: 'dirimage',
      width: '8%',
      render: (text, record) => {
        return (
          <img
            src={'https://backend.toppteamm.ir/public' + text.dirimage}
            alt='file'
            style={{ width: '50px', height: '50px', borderRadius: '10%' }}
          />
        )
      },
    },
    {
      title: Alltext.weblog.title,
      key: 'title',
      width: '10%',
      editable: true,
      render: (text, record) => {
        return <div>{record.title}</div>
      },
    },
    {
      title: Alltext.weblog.categoryWeblog,
      key: 'categoryWeblog',
      width: '5%',
      render: (_, record) => {
        return (
          <Select value={record.categoryWeblog} style={{ width: 150 }} disabled>
            <Select.Option value={record.categoryWeblog}>{record.categoryWeblog}</Select.Option>
          </Select>
        )
      },
    },
    {
      title: '',
      key: 'operation',
      width: '1%',
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
      key: 'operation',
      width: '1%',

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
  ])

  const expandedRowRender = record => {
    return (
      <div style={{ width: '850px' }} dangerouslySetInnerHTML={{ __html: record.content }}></div>
    )
  }

  return (
    <>
      <Card>
        <Button
          onClick={() => navigate('/weblog/create', { state: { categories } })}
          type='primary'
          style={{ marginBottom: 16 }}
        >
          {Alltext.add}
        </Button>

        <TableComponent
          dataSource={dataSource}
          columns={columns}
          expandedRowRender={expandedRowRender}
          loading={loading}
          id='#weblogTable'
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
        {selectedItem ? (
          <EditForm selectedItem={selectedItem} categoriesSource={categories} />
        ) : (
          <AddForm categoriesSource={categories} />
        )}
      </ModalComponent>
    </>
  )
}

export default React.memo(Weblog)
