import baseApis from "../baseApis";

const authApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
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
        url: '/user/change-password',
        method: 'POST',
        body: data
      })
    }),
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: '/user/forget-password',
        method: 'POST',
        body: data
      })
    }),
    resendResetCode: builder.mutation({
      query: (data) => ({
        url: '/user/resend-reset-code',
        method: 'POST',
        body: data
      })
    }),
    verifyResetOtp: builder.mutation({
      query: (data) => ({
        url: '/user/verify-reset-otp',
        method: 'POST',
        body: data
      })
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/user/reset-password',
        method: 'POST',
        body: data
      })
    }),
    resendVerifyCode: builder.mutation({
      query: (data) => ({
        url: '/user/resend-verify-code',
        method: 'POST',
        body: data
      })
    }),
  }),
});

export const {
  useLoginMutation,
  useUserSignUpMutation,
  useVerifySignUpOtpMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResendResetCodeMutation,
  useVerifyResetOtpMutation,
  useResetPasswordMutation,
  useResendVerifyCodeMutation
} = authApis;
