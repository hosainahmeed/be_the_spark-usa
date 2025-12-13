'use client'
import { useResetPasswordMutation } from '@/app/redux/service/authApis';
import { Button, Card, Divider, Form, Input, Typography } from 'antd'
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
const { Title } = Typography;
function NewPasswordSet() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [form] = Form.useForm()
  const router = useRouter()
  const [resetPassword, { isLoading: isResetPasswordLoading }] = useResetPasswordMutation()
  const onFinish = async (values: any) => {
    if (!email) {
      return toast.error('Email is required!')
    }
    const data = {
      email: email,
      password: values.password,
      confirmPassword: values.confirmPassword
    }
    try {
      const res = await resetPassword(data).unwrap()
      if (!res?.success) {
        throw new Error(res?.message || 'Password Reset Failed')
      }
      toast.success(res?.message || 'Password Reset Successful')
      form.resetFields()
      router.push('/sign-in')
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || 'Something went wrong while reset password!')
    }
  }
  return (
    <div className="w-full h-dvh flex max-w-screen-md mx-auto items-center justify-center">
      <Card style={{ width: 500 }}>
        <div className="flex flex-col items-start justify-center mb-3">
          <Title level={3}>Forget Password</Title>
          <p className='text-center text-gray-600 mb-4'>Please enter your email to get verification code</p>
        </div>
        <Divider />
        <Form
          form={form}
          name="login"
          layout="vertical"
          requiredMark={false}
          style={{ width: 450 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your Password!' },
              { min: 6, message: 'Password must be at least 6 characters long!' },
            ]}
          >
            <Input.Password size="large" placeholder="Please input your Password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please input your Password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="Please input your Password again" />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ backgroundColor: '#002868', color: 'white' }}
              htmlType="submit"
              block
              size="large"
              loading={isResetPasswordLoading}
              className="h-12 font-semibold"
            >
              {isResetPasswordLoading ? 'Resetting...' : 'Reset'}
            </Button>
          </Form.Item>
        </Form>
      </Card>


    </div>
  )
}

export default NewPasswordSet