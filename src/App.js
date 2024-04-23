import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink } from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

const uri = 'https://backend.toppteamm.ir/graphql'
let token=localStorage.getItem('token')
// console.log('token',token)
const headers = {
  'Apollo-Require-Preflight': true,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
}
// console.log('localStorage.getItem()',localStorage.getItem('token'))
const link = ApolloLink.from([
  createUploadLink({
    uri,
    headers,
  }),
])

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

const loading = (
  <div className='pt-3 text-center'>
    <div className='sk-spinner sk-spinner-pulse'></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
import toast, { Toaster } from 'react-hot-toast'

class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <HashRouter>
          <Toaster />
          <Suspense fallback={loading}>
            <Routes>
              <Route exact path='/login' name='Login Page' element={<Login />} />
              <Route exact path='/register' name='Register Page' element={<Register />} />
              <Route exact path='/404' name='Page 404' element={<Page404 />} />
              <Route exact path='/500' name='Page 500' element={<Page500 />} />
              <Route path='*' name='Home' element={token==null?<Login />:<DefaultLayout />} />
            </Routes>
          </Suspense>
        </HashRouter>
      </ApolloProvider>
    )
  }
}

export default App
