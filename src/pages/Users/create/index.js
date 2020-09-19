import React, {useEffect, useState} from "react";
import {Container} from "./styles";
import {Button, Form, Input, notification, Space, Skeleton, PageHeader} from "antd";
import {FormLayout} from "../../../utils";
import * as api from "../../../api/users";
import {add} from "../../../actions/users";
import {useParams, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

function UserCreate() {
    const [saveLoading, setSaveLoading] = useState(false);
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    function create(data){
        setSaveLoading(true)

        api.create(data).then(user => {
            dispatch(add(user));
            history.push('/');
        }).catch(e => {
            console.log(e);
            notification['error']({
                message: 'Error updating user'
            })
        }).finally(() => {
            setSaveLoading(false)
        })
    }

    return (
        <>
            <PageHeader
                onBack={() => {history.push('/')}}
                title="Edit"
                subTitle="Creating user">
            </PageHeader>
            <Container title={'User'}>
                <Space align={'start'}>
                    <Form {...FormLayout} onFinish={create}>
                        <Form.Item label={'Name'} name={'name'}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={'Email'} name={'email'}>
                            <Input/>
                        </Form.Item>
                        <Button htmlType={'submit'} type={'primary'} loading={saveLoading}>Create</Button>
                    </Form>
                </Space>
            </Container>
        </>
    )
}

export default UserCreate;