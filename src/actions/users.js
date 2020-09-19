export function add(data){
    return {
        type: 'ADD',
        data
    }
}

export function setList(data){
    return {
        type: 'LIST',
        data
    }
}

export function remove(id){
    return {
        type: 'REMOVE',
        data: id
    }
}

export function update(data){
    return {
        type: 'UPDATE',
        data
    }
}