import React, { Component } from 'react';
//import api from '../services/api'
//import ImagePicker from 'react-native-image-picker';
import { View, Text, TouchableOpacity, BackHandler, Image, Alert, ScrollView } from 'react-native';
import { createStackNavigator /*É o menu de navegação tem varios creates legais*/ } from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux'
import styles, { pickerSelectStyles } from '../styles/globalcss'

// import { Container } from './styles';

const tipos = [
  {
    label: 'Automóvel',
    value: 'auto',
  },
  {
    label: 'Imóvel',
    value: 'imovel',
  },
  {
    label: 'Moto',
    value: 'moto',
  },
];

class Home extends Component {

  state = {
    valor: 'auto',
    tipo: 'auto',
  }

  componentDidMount() {
    console.log(this.props.usuario);
    //BackHandler.addEventListener('hardwareBackPress', function () { return true })
  }

  componentDidUpdate() {
   // console.log(this.props.usuario);
  }

  render() {
    return (
      <View style={styles.container}>

        <RNPickerSelect
          placeholder={{ label: 'Selecione o tipo...', value: null, color: '#9EA0A4', }}
          items={tipos}
          onValueChange={value => {
            this.setState({
              tipo: value,
            });
          }}
          style={pickerSelectStyles}
          value={this.state.tipo}
          useNativeAndroidPickerStyle={false}
        />

        <RNPickerSelect
          placeholder={{ label: 'Selecione o valor...', value: null, color: '#9EA0A4', }}
          items={tipos}
          onValueChange={value => {
            this.setState({
              valor: value,
            });
            this.props.navigation.navigate('Home2', this.state)
          }
          }
          style={pickerSelectStyles}
          value={this.state.valor}
          useNativeAndroidPickerStyle={false}
        />



      </View >
    );
  }
}

const mapStateToProps = state => ({
  usuario: state.usuarioReducer.Usuario
});

const HomeRedux = connect(mapStateToProps)(Home)



class Home2 extends Component {


  state = {
    author: '',
    tipo: 'auto',
  }
  //esse preview com && serve se o preview for true roda o comando
  render() {

    const tipo1 = this.props.navigation.getParam('tipo');

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Gol G7</Text>
        <Text style={styles.text}>R$ 60.545,00</Text>
        <Text style={[styles.text, { marginTop: 5 }]}>Prazo</Text>

        <ScrollView style={styles.scrollView} >
          <TouchableOpacity style={[styles.blocoScrollView, { flexDirection: 'row' }]}>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text style={styles.text}></Text>
              <Text style={[styles.text, { marginLeft: 10, flex: 1, }]}>60</Text>
              <Text style={[styles.text, { marginLeft: 10, fontSize: 12 }]}>tb15</Text>

            </View>
            <View style={{ flex: 9, flexDirection: 'row' }}>
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[styles.text, { marginLeft: 0 }]}>Parcela 1</Text>
                <Text style={[styles.text, { marginLeft: 0 }]}>R$ 1984,31</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[styles.text, { marginLeft: 0 }]}>Parcela 1</Text>
                <Text style={[styles.text, { marginLeft: 0 }]}>R$ 1984,31</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[styles.text, { marginLeft: 0 }]}>Parcela 1</Text>
                <Text style={[styles.text, { marginLeft: 0 }]}>R$ 1984,31</Text>
              </View>

            </View>
          </TouchableOpacity>

        </ScrollView >
      </View>
    );
  }
}

const cabecalhoNavigator = createStackNavigator(
  {
    HomeRedux,
    Home2,
  },
  {
    initialRouteName: 'HomeRedux',
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


