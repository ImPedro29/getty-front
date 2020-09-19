import api from '.'

export async function list(){
    return (await api('GET', '/users/')).data;
}

export async function remove(id){
    return (await api('DELETE', `/users/${id}`)).data;
}

export async function getOne(id){
    return (await api('GET', `/users/${id}`)).data;
}

export async function update(id, data){
    return (await api('PUT', `/users/${id}`, data)).data;
}

export async function create(data){
    return (await api('POST', `/users/`, data)).data;
}