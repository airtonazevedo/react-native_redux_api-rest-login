async function auxActions(x) { return x; }

export function setUsuario(usuario) {
    return (dispatch) => {
        return auxActions(usuario)
            .then(res => {
                dispatch(setUsuarioType(res));
            })
            .catch(err => {
                throw (err);
            })
    }
};

function setUsuarioType(usuario) { 
    return { 
        type: 'SET_USER', 
        payload: { usuario } 
    }; 
};