import baseApis from "../baseApis";

const authApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    userSignUp: builder.mutation({
      query: (data) => ({
        url: '/user/sign-up',
        method: 'POST',
        body: data
      })
    }),
    verifySignUpOtp: builder.mutation({
      query: (data) => ({
        url: '/user/verify-code',
        method: 'POST',
        body: data
      })
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data
      })
    })
  }),
});

export const { useLoginMutation, useUserSignUpMutation, useVerifySignUpOtpMutation, useChangePasswordMutation } = authApis;
