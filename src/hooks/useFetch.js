import { useQuery } from '@apollo/client'
import { handleResponse } from 'src/utils'

function useFetch (schema) {
  const { loading, error, data } = useQuery(schema)

  if (loading) return { loading, data: null, error: null }
  if (error) return { loading: false, data: null, error }

  return { loading: false, data: data[Object.keys(data)[0]], error: null }
}

export default useFetch

// src/hooks/useFetchData.js
// import { useState, useEffect } from 'react';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// const useFetch = (fetchFunction) => {
//   // console.log(fetchFunction);
//  const [loading, setLoading] = useState(false);
//  const [dataSource, setDataSource] = useState([]);
//  const [error, setError] = useState(null);
//  const navigate = useNavigate();

//  useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const result = await fetchFunction();
//         setDataSource(result.baners || result.users); // Assuming the result has a 'baners' or 'users' property
//         setError(null);
//       } catch (err) {
//         setError(err);
//         toast.error(`Error fetching data: ${err}`);
//         navigate('/error-page'); // Redirect to an error page if necessary
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//  }, [fetchFunction, navigate]);

//  return { loading, dataSource, error };
// };

// export default useFetch;
