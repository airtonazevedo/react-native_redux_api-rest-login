const initialState = {
    Usuario: { email: 'a', senha: 'a' },
    Autenticado: false,
}
//funcao inicial aqui que deve carregar o banco eu acho
export default function reducer(state = initialState, action) {
    console.log(action);

    if (action.type === 'SET_USER') {
        return { ...state, Usuario: action.payload.usuario, Autenticado: true }
    }

    return state;
}
