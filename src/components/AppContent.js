import React, { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import routes from '../routes'
import toast from 'react-hot-toast'
import useFetch from 'src/hooks/useFetch'
import query from 'src/schema/query'
import { fetchFunction } from 'src/utils'

const AppContent = () => {
  const location = useLocation()
  let token = localStorage.getItem('token')
  const navigate = useNavigate()

  let [category, setCategory] = useState([])
  const { loading, data, error } = useFetch(query.get.category)

  useEffect(() => {
    const fetchData = async () => {
      const paths = [
        '/customProject/allProjects',
        '/defaultProject/allProjects',
        '/category/allCategories',
        '/weblog'
      ]
      if (paths.some(path => location.pathname.includes(path)) && token) {
        await fetchFunction(data, setCategory, navigate, 'categories')
      } else if (!token && !loading && !error) {
        toast.error(`Please login first`)
      }
    }

    fetchData()
  }, [location, data, token])

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color='primary' />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={
                    <route.element
                      category={category}
                      setCategory={setCategory}
                      loading={loading}
                      allCategorySource={data}
                    />
                  }
                />
              )
            )
          })}
          <Route path='/' element={<Navigate to='dashboard' replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
