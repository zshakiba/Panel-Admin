import React, { useEffect, useState, useMemo } from 'react'
import { Button, Select, Popconfirm, Table, Card, Skeleton } from 'antd'
import { Alltext } from '../../../assets/AllText'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useFetch from 'src/hooks/useFetch'
import { fetchFunction, handleResponse } from 'src/utils'
import { useDeleteCustomProject } from 'src/hooks/useDelete'
import query from 'src/schema/query'
import TableComponent from 'src/components/TableComponent '

const AllProjects = ({ allCategorySource }) => {
  const categories = allCategorySource?.categories

  const [dataSource, setDataSource] = useState([])
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const { executeMutation, loading: deleteLoading } = useDeleteCustomProject()
  const { loading, data, error } = useFetch(query.get.customProject)

  useEffect(() => {
    if (!token) {
      navigate('/login')
      toast.error(`Please login first`)
    } else if (data) {
      fetchFunction(data, setDataSource, navigate, 'project')
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

  const columns = useMemo(() => [
    {
      title: Alltext.customProjects.image,
      dataIndex: 'dirimage',
      width: '8%',
      render: (text, record) => {
        return (
          <img
            src={'https://backend.toppteamm.ir/public' + text}
            alt='file'
            style={{ width: '50px', height: '50px', borderRadius: '10%' }}
          />
        )
      },
    },
    {
      title: Alltext.customProjects.name,
      dataIndex: 'nameproject',
      width: '15%',
      editable: true,
    },
    {
      title: Alltext.customProjects.category,
      dataIndex: 'category',
      width: '15%',
      render: (_, record) => {
        // Find the category by its ID
        const category = categories.find(cat => cat.id === record.category)

        const categoryTitle = category ? category.title : 'Not Found'

        return (
          <Select value={categoryTitle} style={{ width: 150 }} disabled>
            {categories?.map(cat => (
              <Select.Option key={cat.id} value={cat.title}>
                {cat.title}
              </Select.Option>
            ))}
          </Select>
        )
      },
    },
    {
      title: Alltext.customProjects.phone,
      dataIndex: 'phone',
      width: '10%',
      editable: true,
    },
    {
      title: Alltext.customProjects.email,
      dataIndex: 'email',
      width: '10%',
      editable: true,
    },
    {
      title: Alltext.customProjects.link,
      dataIndex: 'link',
      width: '10%',
      editable: true,
    },
    {
      title: Alltext.customProjects.description,
      dataIndex: 'description',
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
  ])

  return (
    <Card>
      <TableComponent
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        id='#customProjectTable'
      />
    </Card>
  )
}

export default React.memo(AllProjects)
