
'use client'

import { useForgetPasswordMutation } from '@/app/redux/service/authApis';
import { Button, Form, Input, Card, Typography, Divider } from 'antd';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const { Title } = Typography;

function ForgetPassword() {
    const router = useRouter()
    const [forgetPassword, { isLoading: isForgotPasswordLoading }] = useForgetPasswordMutation();
    const [form] = Form.useForm();
    const onFinish = async (values: any) => {
        if (!values.email) {
            return toast.error('Please input your Email!');
        }
        const data = {
            email: values.email
        }

        try {
            const res = await forgetPassword(data).unwrap();
            if (!res?.success) {
                throw new Error(res?.message || "Forget Password Failed");
            }
            toast.success(res?.message || "Forget Password Successful");
            router.push(`/forget-password-otp?email=${values.email}`);
        } catch (error: any) {
            console.log(error);
            toast.error(error?.data?.message || error?.message || 'Something went wrong while forget password!');
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
                        label="Email address"
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input size="large" placeholder="Please input your Email address" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            style={{ backgroundColor: '#002868', color: 'white' }}
                            htmlType="submit"
                            block
                            size="large"
                            loading={isForgotPasswordLoading}
                            className="h-12 font-semibold"
                        >
                            {isForgotPasswordLoading ? 'Sending...' : 'Send'}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>


        </div>
    )
}

export default ForgetPassword