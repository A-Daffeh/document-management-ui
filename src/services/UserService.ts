import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { QrCodeRequest, Role, User, Users } from '../models/IUser';
import { EmailAddress, IRegisterRequest, IUserRequest, UpdateNewPassword, UpdatePassword } from '../models/ICredentials';
import { IResponse } from '../models/Response';
import { Http } from '../enum/http.method';
import { baseUrl, isJsonContentType, processError, processResponse } from '../utils/requestutils';

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include', isJsonContentType }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        fetchUser: builder.query<IResponse<User>, void>({
            query: () => ({
                url: '/profile',
                method: Http.GET
            }),
            keepUnusedDataFor: 120,
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
            providesTags: (result, error) => ['User']
        }),
        registerUser: builder.mutation<IResponse<void>, IRegisterRequest>({
            query: (credentials) => ({
                url: `/register`,
                method: Http.POST,
                body: credentials
            }),
            //transformResponse: processResponse<void>,
            transformErrorResponse: processError,
        }),
        loginUser: builder.mutation<IResponse<User>, IUserRequest>({
            query: (credentials) => ({
                url: `/login`,
                method: Http.POST,
                body: credentials
            }),
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
        }),
        updateUser: builder.mutation<IResponse<User>, IUserRequest>({
            query: (user) => ({
                url: `/update`,
                method: Http.PATCH,
                body: user
            }),
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['User']
        }),
        enableMfa: builder.mutation<IResponse<User>, void>({
            query: () => ({
                url: `/mfa/setup`,
                method: Http.PATCH
            }),
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['User']
        }),
        disableMfa: builder.mutation<IResponse<User>, void>({
            query: () => ({
                url: `/mfa/cancel`,
                method: Http.PATCH
            }),
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['User']
        }),
        verifyQrCode: builder.mutation<IResponse<User>, QrCodeRequest>({
            query: (qrcoderequest) => ({
                url: `/verify/qrcode`,
                method: Http.POST,
                body: qrcoderequest
            }),
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['User']
        }),
        updatePhoto: builder.mutation<IResponse<string>, FormData>({
            query: (form) => ({
                url: `/photo`,
                method: Http.PATCH,
                body: form
            }),
            //transformResponse: processResponse<string>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['User']
        }),
        toggleAccountExpired: builder.mutation<IResponse<void>, void>({
            query: (form) => ({
                url: `/toggleaccountexpired`,
                method: Http.PATCH
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['User']
        }),
        toggleAccountLocked: builder.mutation<IResponse<void>, void>({
            query: (form) => ({
                url: `/toggleaccountlocked`,
                method: Http.PATCH
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['User']
        }),
        toggleAccountEnabled: builder.mutation<IResponse<void>, void>({
            query: (form) => ({
                url: `/toggleaccountenabled`,
                method: Http.PATCH
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['User']
        }),
        toggleCredentialsExpired: builder.mutation<IResponse<void>, void>({
            query: (form) => ({
                url: `/togglecredentialsexpired`,
                method: Http.PATCH
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['User']
        }),
        logout: builder.mutation<IResponse<void>, void>({
            query: () => ({
                url: `/logout`,
                method: Http.POST
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => ['User']
        }),
        updatePassword: builder.mutation<IResponse<void>, UpdatePassword>({
            query: (request) => ({
                url: `/updatepassword`,
                method: Http.PATCH,
                body: request
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError
        }),
        updateRole: builder.mutation<IResponse<void>, Role>({
            query: (request) => ({
                url: `/updaterole`,
                method: Http.PATCH,
                body: request
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['User']
        }),
        resetPassword: builder.mutation<IResponse<void>, EmailAddress>({
            query: (email) => ({
                url: `/resetpassword`,
                method: Http.POST,
                body: email
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['User']
        }),
        verifyAccount: builder.mutation<IResponse<void>, string>({
            query: (key) => ({
                url: `/verify/account?key=${key}`,
                method: Http.GET
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['User']
        }),
        verifyPassword: builder.mutation<IResponse<User>, string>({
            query: (key) => ({
                url: `/verify/password?key=${key}`,
                method: Http.GET
            }),
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['User']
        }),
        verifyToken: builder.mutation<IResponse<User>, string>({
            query: (token) => ({
                url: `/verify/resetpassword?key=${token}`,
                method: Http.GET
            }),
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['User']
        }),
        doResetPassword: builder.mutation<IResponse<void>, UpdateNewPassword>({
            query: (payload) => ({
                url: `/resetpassword/reset`,
                method: Http.POST,
                body: payload
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['User']
        }),
        getUsers: builder.query<IResponse<Users>, void>({
            query: () => ({
                url: `/list`,
                method: Http.GET
            }),
            transformResponse: processResponse<Users>,
            transformErrorResponse: processError
        })
    })
});