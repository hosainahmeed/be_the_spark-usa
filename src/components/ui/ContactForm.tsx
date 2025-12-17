'use client';
import { Form, Input, Spin } from 'antd';
import React, { useState } from 'react';
import { Button } from './button';
import TextArea from 'antd/es/input/TextArea';
import { useContactSubmitMutation } from '@/app/redux/service/contactApis';
import { toast } from 'sonner';

function ContactForm() {
    const [submitContact, { isLoading }] = useContactSubmitMutation()
    const [form] = Form.useForm()
    const handleSubmit = async (values: any) => {
        try {
            const data = {
                name: values?.fullName,
                email: values?.email,
                message: values?.description
            }
            const response = await submitContact(data).unwrap()
            if (!response?.success) {
                throw new Error(response?.message || '')
            }
            toast.success(response?.message)
            form.resetFields()
        } catch (error: any) {
            toast.error(error?.data?.message || error?.message || 'Something went wrong!')
            form.resetFields()
        }
    };
    return (
        <div>
            <div className="grid gap-4">
                <Form requiredMark={false} layout='vertical' onFinish={handleSubmit} form={form}>
                    <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please input your full name!' }]}
                    >
                        <Input
                            size='large'
                            placeholder="Full Name"
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input
                            size='large'
                            placeholder="Email"
                        />
                    </Form.Item>
                    {/* <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <Input
                            size='large'
                            placeholder="Phone"
                        />
                    </Form.Item> */}
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input your description!' }]}
                    >
                        <TextArea
                            size='large'
                            placeholder="Description"
                            rows={4}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="submit"
                            className="bg-[#003F91] cursor-pointer rounded text-white px-8 py-3 font-medium transition-colors duration-200 focus:ring-[var(--blue)] focus:ring-offset-2"
                        >
                            {isLoading ? <Spin size='small' /> : 'Submit'}
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    );
}

export default ContactForm;