import React, {useState} from "react";
import {Container, CustomButton} from "./styles";
import {DeleteOutlined} from '@ant-design/icons';
import {Popconfirm} from "antd";
import {Link} from "react-router-dom";

export default function ActionBar({actions, id, align, remove, update}) {

    let buttons = {
        DELETE: (key) => <Delete api={remove} id={id} key={key}/>,
        UPDATE: (key) => <Update link={update} id={id} key={key}/>,
    };

    return (
        <Container align={align}>
            {actions.map((type, i) =>
                buttons[type](i)
            )}
        </Container>
    )
}

function Delete({id, api}) {
    let [isLoading, setIsLoading] = useState(false);

    function handleDelete(id) {
        setIsLoading(true);
        api(id).finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <Popconfirm
            title="Are you sure delete this user?"
            onConfirm={() => handleDelete(id)}
            okText="Yes"
            cancelText="No"
        >
            <CustomButton loading={isLoading} danger type={'primary'} icon={<DeleteOutlined/>}/>
        </Popconfirm>
    );
}

function Update({link}) {
    return (
        <Link to={link}>
            <CustomButton type={'link'}>Edit</CustomButton>
        </Link>
    );
}