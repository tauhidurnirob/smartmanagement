import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'
import tagTypes from './tagTypes'

// Api
export const UploadApi = createApi({
  reducerPath: 'UploadApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (payload: File) => {
        const data = new FormData()
        data.append('file', payload)
        return {
          url: `/upload-file`,
          method: 'POST',
          body: data,
        }
      },
    }),
  })
})
