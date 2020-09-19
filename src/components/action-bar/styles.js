import styled from 'styled-components';
import {Button} from "antd";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

export const CustomButton = styled(Button)`
    margin: 0 .4em;
`;