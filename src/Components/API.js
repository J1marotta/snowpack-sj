import React, { useEffect, Fragment } from 'react'
import axios from 'axios'

const baseUrl = `​https://test.swipejobs.com/api/worker`
const workerId = `7f90df6e-b832-44e2-b624-3143d428001f`

export const ApiGetter = () => {
  const [apiData, setData] = useState({
    profile: null,
    availableJobs: null
  })
  const [error, setError] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await axios(`${baseUrl}/${workerId}`)
        const availableJobs = await axios(`${baseUrl}/${workerId}/matches`)


        setData({ ...apiData, profiles: [profile],  jobs: [availableJobs] })

        setLoading(false)
      } catch (e) {
        console.error(e)
        setLoading(false)
        setError(e)
        throw new Error('Fetch Failed, check the API')
      }
    }
    fetchData()
  }, [])

  return (
    <Fragment>
      <div>
        data `${baseUrl}/{workerId}`{JSON.stringify(apiData, null, 2)}
      </div>
      <div>
        error
        {JSON.stringify(error, null, 2)}
      </div>

      <div>
        loading
        {JSON.stringify(loading, null, 2)}
      </div>
    </Fragment>
  )
}
