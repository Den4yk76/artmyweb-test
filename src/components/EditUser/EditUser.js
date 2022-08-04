import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, Input, Select } from 'antd';
import 'antd/dist/antd.min.css';
import s from './EditUser.module.css';

export default function EditUser() {
    const location = useLocation();
    let navigate = useNavigate();

    const { id, name, email, gender, status } = location.state.user;

    const [userName, setUserName] = useState(name);
    const [userEmail, setUserEmail] = useState(email);
    const [userGender, setUserGender] = useState(gender);
    const [userStatus, setUserStatus] = useState(status);

    const handleSubmit = async () => {
        const submitedUserInfo = {
            name: userName,
            email: userEmail,
            gender: userGender,
            status: userStatus,
        };

        try {
            await axios.put(`/public/v1/users/${id}`, submitedUserInfo);
            toast.success('Success!');
            navigate('/users');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className={s.container}>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                onSubmit={e => e.preventDefault()}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Name: "
                    rules={[
                        {
                            required: true,
                            message: 'Please input the name!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input
                        defaultValue={userName}
                        onChange={e => {
                            setUserName(e.target.value.trim());
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="Email: "
                    rules={[
                        {
                            required: true,
                            message: 'Please input the email!',
                        },
                    ]}
                >
                    <Input
                        defaultValue={userEmail}
                        onChange={e => {
                            setUserEmail(e.target.value.trim());
                        }}
                    />
                </Form.Item>
                <Form.Item label="Gender: ">
                    <Select
                        defaultValue={userGender}
                        onChange={gender => {
                            setUserGender(gender);
                        }}
                    >
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Status: ">
                    <Select
                        defaultValue={userStatus}
                        onChange={status => {
                            setUserStatus(status);
                        }}
                    >
                        <Select.Option value="active">Active</Select.Option>
                        <Select.Option value="inactive">Inactive</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    className={s.form}
                >
                    <Button type="primary" htmlType="submit">
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
