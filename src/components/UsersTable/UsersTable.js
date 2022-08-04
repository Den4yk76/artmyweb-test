import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Select } from 'antd';
import 'antd/dist/antd.min.css';
import s from './UsersTable.module.css';

export default function UsersTable() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('all');
    const [sortedUsers, setSortedUsers] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get('/public/v1/users');
            const users = data.data.data;
            setUsers(users);
        };

        fetchData().catch(console.error);
    }, []);

    useEffect(() => {
        setSortedUsers(
            users.filter(user => {
                if (filter === 'all') {
                    return users;
                } else return user.gender === filter;
            }),
        );
    }, [filter, users]);

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (value, user) => {
                return (
                    <Link key={user.id} to={'/edit'} state={{ user }} className={s.link}>
                        {value}
                    </Link>
                );
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (value, user) => {
                return (
                    <Link to={'/edit'} state={{ user }} className={s.link}>
                        {value}
                    </Link>
                );
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (value, user) => {
                return (
                    <Link to={'/edit'} state={{ user }} className={s.link}>
                        {value}
                    </Link>
                );
            },
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (value, user) => {
                return (
                    <Link to={'/edit'} state={{ user }} className={s.link}>
                        {value}
                    </Link>
                );
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (value, user) => {
                return (
                    <Link to={'/edit'} state={{ user }} className={s.link}>
                        {value}
                    </Link>
                );
            },
        },
    ];

    return (
        <div className={s.container}>
            <Select
                className={s.genderSelect}
                defaultValue={filter}
                onChange={value => {
                    setFilter(value);
                }}
            >
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
            </Select>

            <Table
                columns={columns}
                dataSource={sortedUsers}
                rowKey="id"
                bordered
                pagination={{ current: page, pageSize: 5, position: ['bottomCenter'], hideOnSinglePage: true }}
                onChange={({ current }) => {
                    setPage(current);
                }}
            ></Table>
        </div>
    );
}
