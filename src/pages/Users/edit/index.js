import React, {useEffect, useState} from "react";
import {Container} from "./styles";
import ActionBar from "../../../components/action-bar";
import {Button, Form, Input, notification, Space, PageHeader} from "antd";
import {FormLayout} from "../../../utils";
import * as api from "../../../api/users";
import {remove, update} from "../../../actions/users";
import {useParams, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

function UserShow() {
    const [isLoading, setIsLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);

    const {id} = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.find(item => item.id === id));
    const history = useHistory();

    const [data, setData] = useState(user);
    const [form] = Form.useForm();

    function removeUser(id) {
        return api.remove(id).then(() => {
            dispatch(remove(id));
            history.push('/');
        }).catch(e => {
            console.log(e);
            notification['error']({
                message: 'Error deleting user'
            });
        });
    }

    useEffect(() => {
        form.setFieldsValue(data);
    }, [data]);

    useEffect(() => {
        api.getOne(id).then(user => {
            setData(user);
        }).catch(e => {
            console.log(e)
            notification['error']({
                message: 'Error loading user'
            })
        }).finally(() => {
            setIsLoading(false)
        })
    }, []);

    function save(data){
        setSaveLoading(true)

        api.update(id, data).then(user => {
            dispatch(update(user));
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
                subTitle="Editing user">
            </PageHeader>
            <Container title={'User'} extra={<ActionBar id={id} actions={['DELETE']} remove={removeUser}/>}>
                <Space align={'start'}>
                    <Form {...FormLayout} onFinish={save} form={form}>
                        <Form.Item label={'Name'} name={'name'}>
                            <Input disabled={isLoading}/>
                        </Form.Item>
                        <Form.Item label={'Email'} name={'email'}>
                            <Input disabled={isLoading}/>
                        </Form.Item>
                        <Button htmlType={'submit'} type={'primary'} disabled={isLoading} loading={saveLoading}>Save</Button>
                    </Form>
                </Space>
            </Container>
        </>
    )
}

export default UserShow;