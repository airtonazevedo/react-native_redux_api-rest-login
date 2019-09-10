import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import styles from '../styles/globalcss'
import api from '../api';
import { connect } from 'react-redux'
import * as actionUsuario from '../redux/actions/usuario'
import DeviceInfo from 'react-native-device-info';
import Spinner from 'react-native-loading-spinner-overlay';

class Login extends Component {

    state = {
        email: '',
        senha: '',
        usuario: '',
        sendUser: false,
        spinner: false,
    }

    componentDidMount() {
        this.setState({
            email: this.props.usuarioReducer.Usuario.email,
            senha: this.props.usuarioReducer.Usuario.senha
        });
    }

    componentDidUpdate() {
        if (this.state.sendUser) {
            this.props.setUsuario(this.state.usuario);
            this.setState({ sendUser: false, spinner: false });
        }

        if (this.props.usuarioReducer.Autenticado) {
            this.props.navigation.navigate('MenuLateralNavigator');
        }

    }

    entrar = () => {
        this.setState({ spinner: true });
        api.post('/usuarios/login', this.state)
            .then((response) => {
                if (response.data.status == 'ok') {
                    this.setState({ usuario: response.data.data });
                    this.setState({ sendUser: true });
                }
                else {
                    console.log('Login Ou senha errado')
                }
            })
            .catch(function (error) {
                console.log(error);
                this.setState({ spinner: false });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Spinner visible={this.state.spinner} textContent={'Carregando...'}
                    textStyle={{ color: 'white' }} size='large' animation='fade' overlayColor='rgba(0, 0, 0, 0.5)'
                />
                <TextInput onChangeText={(email) => this.setState({ email })} value={this.state.email}
                    style={styles.input} placeholder="Email..." autoCompleteType='email' textContentType='emailAddress'
                    keyboardType='email-address' autoCapitalize='none'
                />

                <TextInput onChangeText={(senha) => this.setState({ senha })} value={this.state.senha}
                    style={styles.input} placeholder="Senha..." textContentType='password' secureTextEntry={true}
                />

                <TouchableOpacity style={styles.button} onPress={this.entrar}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <TouchableOpacity>
                        <Text style={[styles.text, { color: 'blue' }]}>esqueceu sua senha?</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => { this.props.navigation.navigate('NovoRedux') }}>
                        <Text style={styles.buttonText}>Novo Representante</Text>
                    </TouchableOpacity>
                </View>

            </View >
        );
    }
}

const mapStateToProps = state => ({
    usuarioReducer: state.usuarioReducer
});

const mapDispatchToProps = dispatch => {
    return {
        setUsuario: (usuario) => dispatch(actionUsuario.setUsuario(usuario))
    }
}

const LoginRedux = connect(mapStateToProps, mapDispatchToProps)(Login)


class Novo extends Component {

    state = {
        nome: '',
        email: '',
        telefone: '',
        senha: '',
        sendUser: false,
        usuario: {},
        spinner: false
    }

    componentDidMount() {
        //this.setState({ email: this.props.usuarioReducer.Usuario.email, senha: this.props.usuarioReducer.Usuario.senha })
    }

    componentDidUpdate() {
        if (this.state.sendUser) {
            this.props.setUsuario(this.state.usuario);
            this.setState({ sendUser: false, spinner: false });
        }

        if (this.props.usuarioReducer.Autenticado) {
            this.props.navigation.navigate('MenuLateralNavigator')
        }

    }

    cadastrar = () => {
        this.setState({ spinner: true });
        let user = this.state;

        user.device = DeviceInfo.getDevice();
        user.idDevice = DeviceInfo.getUniqueID();


        api.post('/usuarios', user)
            .then((response) => {
                this.setState({ usuario: response.data })
                this.setState({ sendUser: true })

            })
            .catch((error) => {
                let res = error.response
                if (res.data.code == 'E_UNIQUE') {
                    if (res.data.attrNames[0] == 'email')
                        console.log('Email ja cadastrado');
                    else
                        console.log('Algum erro no E_UNIQUE ');
                }
                else
                    console.log('Algum erro cabuloso');
               this.setState({ spinner: false });
        
            });
    }

    render() {

        return (
            <ScrollView style={styles.container} >
                <Spinner visible={this.state.spinner} textContent={'Carregando...'}
                    textStyle={{ color: 'white' }} size='large' animation='fade' overlayColor='rgba(0, 0, 0, 0.7)'
                />

                <View style={{ marginTop: 0 }}>
                    <Text style={styles.text}>Nome</Text>
                    <TextInput onChangeText={(nome) => this.setState({ nome })} value={this.state.nome}
                        style={styles.input} placeholder="Nome..." autoCompleteType='name' textContentType='name'
                    />
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={styles.text}>Email</Text>
                    <TextInput onChangeText={(email) => this.setState({ email })} value={this.state.email}
                        style={styles.input} placeholder="Email..." autoCompleteType='email' textContentType='emailAddress'
                        keyboardType='email-address' autoCapitalize='none'
                    />
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={styles.text}>Telefone (somente numeros com ddd)</Text>
                    <TextInput onChangeText={(tel) => this.setState({ telefone: tel.replace(/[^0-9]/g, '') })} value={this.state.telefone}
                        style={styles.input} placeholder="ex. 92912345678" autoCompleteType='tel' textContentType='telephoneNumber'
                        keyboardType='phone-pad' maxLength={11}
                    />
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={styles.text}>Senha</Text>
                    <TextInput onChangeText={(senha) => this.setState({ senha })} value={this.state.senha}
                        style={styles.input} placeholder="mínimo 3 digitos" textContentType='password' secureTextEntry={true}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={this.cadastrar}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const NovoRedux = connect(mapStateToProps, mapDispatchToProps)(Novo)



const cabecalhoNavigator = createStackNavigator(
    {
        LoginRedux,
        NovoRedux,
    },
    {
        initialRouteName: 'LoginRedux',
        defaultNavigationOptions: {
            headerTitle: <Image source={require('../images/logoVIVA.png')} style={{ width: 118, height: 31 }} />,

            headerStyle: {
                backgroundColor: '#13688E',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },

        }
    }
)

export default cabecalhoNavigator;


