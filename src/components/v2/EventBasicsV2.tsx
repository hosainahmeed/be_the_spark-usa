import { Form, Input, Select, Upload, UploadFile, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EventData, setEventImage, updateEventData } from '@/app/redux/slices/eventSlice';
import { useGetCategoryQuery } from '@/app/redux/service/categoryApis';
import SectionTitleFormal from '../component-layout/SectionTitleFormal';
import { imageUrl } from '@/utils/imageHandler';

const { TextArea } = Input;

interface EventBasicsV2Props {
    onValuesChange?: (changedValues: any, allValues: any) => void;
}

const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

function EventBasicsV2({ onValuesChange }: EventBasicsV2Props) {
    const dispatch = useDispatch();
    const eventData = useSelector((state: any) => state.event);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();
    const { data: sportCategoryData } = useGetCategoryQuery({ type: 'sports' })
    const { data: eventCategoryData } = useGetCategoryQuery({ type: 'event' })


    useEffect(() => {
        const image = eventData?.event_image
            ? typeof eventData?.event_image === 'string'
                ? eventData?.event_image
                : URL.createObjectURL(eventData?.event_image as Blob)
            : eventData?.event_image
                ? imageUrl({ image: eventData?.event_image, fallback: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' })
                : 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

        form.setFieldsValue(eventData.data);

        if (eventData.event_image) {
            const file = eventData.event_image as unknown as File;
            setFileList([{
                uid: '-1',
                name: file.name,
                status: 'done',
                url: image
            }]);
        }
    }, [eventData, form]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as File);
        }
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);

        const file = newFileList[0]?.originFileObj;
        dispatch(setEventImage(file ?? null));
    };


    const handleFormValuesChange = (changedValues: any, allValues: any) => {
        Object.entries(changedValues).forEach(([key, value]) => {
            const updatedValue: EventData[keyof EventData] = value as EventData[keyof EventData];
            dispatch(updateEventData({ field: key as keyof EventData, value: updatedValue }));
        });

        if (onValuesChange) {
            onValuesChange(changedValues, allValues);
        }
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload Image</div>
        </div>
    );

    return (
        <div className="p-4">
            <SectionTitleFormal
                className="mb-8"
                title="Event Basics"
                description="Provide essential information so families can quickly understand your event."
            />
            <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onValuesChange={handleFormValuesChange}
                initialValues={eventData.data}
            >
                <Form.Item label="Event Photos">
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        beforeUpload={() => false}
                        accept="image/*"
                        maxCount={1}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Event Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter event name' }]}
                >
                    <Input size='large' placeholder="Enter event name" />
                </Form.Item>
                <Form.Item
                    label="Event Short Description"
                    name="shortDescription"
                    rules={[{ required: true, message: 'Please enter event description' }]}
                >
                    <TextArea rows={4} placeholder={`e.g., "A 3-day intensive camp for players aged 10–14, focusing on skills, tactics, and small-sided games."`} />
                </Form.Item>
                <Form.Item
                    label="Sport"
                    name="sport"
                    rules={[{ required: true, message: 'Please select a sport' }]}
                >
                    <Select size='large' placeholder="Select a sport">
                        {sportCategoryData?.data?.result?.map(
                            (sport: { _id: string, name: string }) => (
                                <Select.Option key={sport?._id} value={sport?._id}>
                                    {sport?.name}
                                </Select.Option>
                            )
                        )}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Event Type"
                    name="eventType"
                    rules={[{ required: true, message: 'Please select event type' }]}
                >
                    <Select size='large' placeholder="Select event type">
                        {eventCategoryData?.data?.result?.map(
                            (sport: { _id: string, name: string }) => (
                                <Select.Option key={sport?._id} value={sport?._id}>
                                    {sport?.name}
                                </Select.Option>
                            )
                        )}
                    </Select>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EventBasicsV2;