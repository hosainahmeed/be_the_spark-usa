'use client';
import Image from 'next/image';
import { IMAGE } from '../../../../public/assets/image/index.image';
import Link from 'next/link';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserSignUpMutation } from '@/app/redux/service/authApis';
import { toast } from 'sonner';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import {
    Card,
    Form,
    Input,
    Button,
    Typography,
    Divider,
    Alert,
    Row,
    Col,
    Spin
} from 'antd';

const { Title, Text, Paragraph } = Typography;

interface FormValues {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    businessName?: string;
}

export default function SignupForm() {
    const searchParams = useSearchParams();
    const role = searchParams.get('role');
    const [signUp, { isLoading: signUpLoading }] = useUserSignUpMutation();
    const [form] = Form.useForm();
    const router = useRouter();

    const isOrganizer = role === 'organizer';

    const handleSubmit = async (values: FormValues) => {
        try {
            const data = {
                name: values.name,
                email: values.email,
                role: isOrganizer ? "organizer" : "user",
                businessName: values.businessName || "",
                phone: values.phone,
                password: values.password,
                confirmPassword: values.confirmPassword
            };

            const res = await signUp(data).unwrap();

            if (!res?.success) {
                throw new Error(res?.message);
            }

            toast.success(res?.message || "Account created successfully!");
            router.push(`/one-time-pass?email=${values.email}&role=${role}`);

        } catch (error: any) {
            toast.error(error?.data?.message || error?.message || 'Something went wrong while signing up!');
        }
    };

    const validatePassword = (_: any, value: string) => {
        if (!value) {
            return Promise.reject('Please input your password!');
        }
        if (value.length < 6) {
            return Promise.reject('Password must be at least 6 characters!');
        }
        return Promise.resolve();
    };

    const validateConfirmPassword = (_: any, value: string) => {
        const password = form.getFieldValue('password');
        if (value && value !== password) {
            return Promise.reject('Passwords do not match!');
        }
        return Promise.resolve();
    };

    return (
        <div>
            <Card
                bordered={false}
                className="shadow-lg"
                styles={{
                    body: { padding: 0 }
                }}
            >
                {/* Header Section */}
                <div className="p-6 border-b">
                    <div className="flex flex-col items-start  text-center">
                        <Image
                            src={IMAGE.brandLogo}
                            alt="Sports Events Brand Logo"
                            width={200}
                            height={50}
                            priority
                            className="mb-2"
                        />
                        <Title level={2} className="!mb-2 !text-gray-800">
                            Create Your Account
                        </Title>
                        <Paragraph className="!mb-0 !text-gray-500">
                            Sign up with your email and phone number to get started with sports events.
                        </Paragraph>
                    </div>
                </div>

                {/* Form Section */}
                <div className="p-6">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        requiredMark={false}
                        size="large"
                    >
                        {isOrganizer && (
                            <Form.Item
                                name="businessName"
                                label="Business Name"
                                rules={[
                                    { required: true, message: 'Please input your business name!' },
                                    { min: 2, message: 'Business name must be at least 2 characters!' }
                                ]}
                            >
                                <Input

                                    placeholder="Enter your business name"
                                />
                            </Form.Item>
                        )}

                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="name"
                                    label="Full Name"
                                    rules={[
                                        { required: true, message: 'Please input your full name!' },
                                        { min: 2, message: 'Name must be at least 2 characters!' }
                                    ]}
                                >
                                    <Input

                                        placeholder="Enter your full name"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={24} sm={24} lg={12}>
                                <Form.Item
                                    name="email"
                                    label="Email Address"
                                    rules={[
                                        { required: true, message: 'Please input your email!' },
                                        { type: 'email', message: 'Please enter a valid email!' }
                                    ]}
                                >
                                    <Input

                                        placeholder="example@email.com"
                                        type="email"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24} sm={24} lg={12}>
                                <Form.Item
                                    name="phone"
                                    label="Phone Number"
                                    rules={[
                                        { required: true, message: 'Please input your phone number!' },
                                        {
                                            validator: (_, value) => {
                                                if (!value) {
                                                    return Promise.reject('Please enter a phone number')
                                                }
                                                return Promise.resolve()
                                            }
                                        }
                                    ]}
                                >
                                    <PhoneInput
                                        international
                                        defaultCountry="US"
                                        placeholder="Enter phone number"
                                        className='border border-gray-300 h-10 rounded px-2 py-1'
                                        value={form.getFieldValue('phone')}
                                        onChange={(value) => form.setFieldsValue({ phone: value })}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={24} sm={24} lg={12}>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[
                                        { validator: validatePassword }
                                    ]}
                                >
                                    <Input.Password

                                        placeholder="Enter password"
                                        iconRender={(visible) =>
                                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24} sm={24} lg={12}>
                                <Form.Item
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    dependencies={['password']}
                                    rules={[
                                        { required: true, message: 'Please confirm your password!' },
                                        { validator: validateConfirmPassword }
                                    ]}
                                >
                                    <Input.Password

                                        placeholder="Confirm password"
                                        iconRender={(visible) =>
                                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item className="!mb-6">
                            <Button
                                htmlType="submit"
                                block
                                size="large"
                                loading={signUpLoading}
                                className="h-12 !bg-[#002868] !text-white !mt-2 font-semibold"
                            >
                                {signUpLoading ? 'Next...' : 'Next'}
                            </Button>
                        </Form.Item>
                    </Form>

                    <Divider plain>Or</Divider>

                    <div className="text-center">
                        <Text className="text-gray-600">
                            Already have an account?{' '}
                            <Link
                                href="/sign-in"
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Sign In
                            </Link>
                        </Text>
                    </div>
                </div>
            </Card>
        </div>
    );
}