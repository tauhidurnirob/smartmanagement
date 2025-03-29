import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import _actions from '../store/_actions'
import { toast } from 'react-toastify'

let isToastVisible = false

const baseQueryWithHeader = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API_URL,
  prepareHeaders: (headers, { getState }: { getState: () => any }) => {
    const token = getState().auth?.token

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQueryWithHeader(args, api, extraOptions)

  if (result.error && result?.error?.status === 401) {
    // Refresh token if token is expired - TODO
    // const refreshResult = await baseQuery('token/refresh/', api, extraOptions)
    // if (refreshResult.data) {
    //   api.dispatch(tokenUpdated({ accessToken: refreshResult.data as string }))
    //   // retry the initial query
    //   result = await baseQuery(args, api, extraOptions)
    // } else {
    //   api.dispatch(logout())
    // }

    // Or redirect to login
    if (!isToastVisible) {
      console.log('Token is expired...')
      toast.error('Session expired!', {
        onClose: () => {
          isToastVisible = false
        },
      });
      isToastVisible = true
      api.dispatch(_actions.logout())
    }
  }
  return result
}
