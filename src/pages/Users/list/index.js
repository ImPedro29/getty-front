import React, {useEffect, useState} from "react";
import {Button, Card, List, notification, PageHeader} from "antd";
import ActionBar from "../../../components/action-bar";
import Meta from "antd/es/card/Meta";
import {PlusOutlined} from "@ant-design/icons";

import {useDispatch, useSelector} from 'react-redux'
import * as api from "../../../api/users";
import {remove, setList} from "../../../actions/users";
import {Link} from "react-router-dom";

function UserList() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const [isLoading, setIsLoading] = useState(true);

    function removeUser(id) {
        return api.remove(id).then(() => {
            dispatch(remove(id));
        }).catch(e => {
            console.log(e);
            notification['error']({
                message: 'Error deleting user'
            });
        });
    }

    useEffect(() => {
        api.list().then(users => {
            dispatch(setList(users || []));
        }).catch(e => {
            console.log(e)
            notification['error']({
                message: 'Server error'
            })
        }).finally(() => {
            setIsLoading(false);
        })
    }, [])

    return (
        <>
            <PageHeader
                className="site-page-header"
                title="List"
                subTitle="User list"
                extra={<Link to={'/users/create'}><Button type={'primary'} icon={<PlusOutlined />}>User</Button></Link>}>
            </PageHeader>
            <List
                loading={isLoading && users.length < 1}
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 4,
                    xxl: 5,
                }}
                dataSource={users}
                renderItem={({name, id, email}) => (
                    <List.Item>
                        <Card title={name} extra={<ActionBar actions={['UPDATE', 'DELETE']} id={id} remove={removeUser}
                                                             update={`/users/${id}`}/>}>
                            <Meta
                                title={'Email'}
                                description={email}
                            />
                        </Card>
                    </List.Item>
                )}
            />
        </>
    )
}

export default UserList;