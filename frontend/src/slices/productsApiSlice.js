import { PRODUCTS_URL, UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({ url: PRODUCTS_URL }),
      keepUnusedDataFor: 60,
      providesTags: ['Products'],
    }),

    getProductDetails: builder.query({
      query: (id) => ({ url: `${PRODUCTS_URL}/${id}` }),
      keepUnusedDataFor: 60,
    }),

    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),

    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
} = productsApiSlice;
