'use client';
import { useState } from 'react';
import Image from 'next/image';
import { IMAGE } from '../../../../public/assets/image/index.image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Cookies from "js-cookie"
import { useLoginMutation } from '@/app/redux/service/authApis';
import {
    Card,
    Form,
    Input,
    Button,
    Typography,
    Row,
    Col,
    Divider,
} from 'antd';
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface LoginFormValues {
    email: string;
    password: string;
    remember: boolean;
}

export default function SigninForm() {
    const [login, { isLoading: loginLoading }] = useLoginMutation();
    const router = useRouter();
    const [form] = Form.useForm();

    const handleSubmit = async (values: LoginFormValues) => {
        try {
            const res = await login({ email: values.email, password: values.password }).unwrap();

            if (!res?.success) {
                throw new Error(res?.message || "Login Failed");
            }

            if (res?.data?.accessToken) {
                Cookies.set("accessTokenForPlayFinder", res?.data?.accessToken);

                if (Cookies.get('accessTokenForPlayFinder')) {
                    toast.success(res?.message || "Login Successful");
                    if (window !== undefined) {
                        window.location.href = "/";
                    } else {
                        router.push('/')
                    }
                }
            }
        } catch (error: any) {
            console.error('Login submission error:', error);
            toast.error(error?.data?.message || error?.message || 'Something went wrong while signing in!');
        }
    };

    return (
        <Card>
            {/* Header Section */}
            <div>
                <div className="flex flex-col items-start text-center">
                    <Image
                        src={IMAGE.brandLogo}
                        alt="Sports Events Brand Logo"
                        width={200}
                        height={50}
                        priority
                        className="mb-2"
                    />
                    <Title level={2} className="!mb-2 !text-gray-800">
                        Welcome Back
                    </Title>
                    <Paragraph className="!mb-0 !text-gray-500">
                        Please enter your email and password to continue
                    </Paragraph>
                </div>
            </div>
            <Divider />
            {/* Form Section */}
            <div>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    requiredMark="optional"
                    size="large"
                    disabled={loginLoading}
                >
                    {/* Email Field */}
                    <Form.Item
                        name="email"
                        label="Email Address"
                        rules={[
                            { required: true, message: 'Please input your email address!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                        validateTrigger="onBlur"
                    >
                        <Input
                            placeholder="Enter your email address"
                            type="email"
                        />
                    </Form.Item>

                    {/* Password Field */}
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            { required: true, message: 'Please input your password!' }
                        ]}
                    >
                        <Input.Password
                            placeholder="Enter your password"
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>

                    {/* Remember Me & Forgot Password */}
                    <Row justify="space-between" align="middle" className="mb-6">
                        <Col>
                            <Link
                                href="/forgot-password"
                                className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                            >
                                Forgot Password?
                            </Link>
                        </Col>
                    </Row>

                    {/* Login Button */}
                    <Form.Item className="!mb-6">
                        <Button
                            style={{ backgroundColor: '#002868', color: 'white' }}
                            htmlType="submit"
                            block
                            size="large"
                            loading={loginLoading}
                            className="h-12 font-semibold"
                        >
                            {loginLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </Form.Item>
                </Form>

                {/* Social Login Divider */}
                <Divider plain>Or continue with</Divider>


                {/* Sign Up Link */}
                <div className="text-center">
                    <Text className="text-gray-600">
                        Don't have an account?{' '}
                        <Link
                            href="/choose-role"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Sign Up
                        </Link>
                    </Text>
                </div>
            </div>
        </Card>
    );
}