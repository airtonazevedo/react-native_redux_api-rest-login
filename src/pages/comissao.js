import React, { Component } from 'react';
//import api from '../services/api'
//import ImagePicker from 'react-native-image-picker';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image } from 'react-native';
// import { Container } from './styles';
import { createStackNavigator /*É o menu de navegação tem varios creates legais*/ } from 'react-navigation';


class Comissao extends Component {
   //esse preview com && serve se o preview for true roda o comando
    render() {
        return (
            <View style={styles.container}>
               
                <TextInput 
                    style={styles.input} 
                    autoCorrect={false} 
                    autoCapitalize="none"
                    placeholder="Nome do autor"
                    placeholderTextColor="#999"
                    value={this.props.navigation.getParam('author', 'ninguem')}
                    >
                </TextInput>
                <TouchableOpacity style={styles.shareButton} onPress={() => this.props.navigation.navigate('ModalScreen')}>
                    <Text style={styles.shareButtonText}>Ir para vendas</Text>
                </TouchableOpacity>
               
            </View>
        );
    }
}

const cabecalhoNavigator = createStackNavigator(
  {
    Comissao,
  },
  {
    defaultNavigationOptions: {
      headerTitle: 'Comissão',
      
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


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 30,
    },
  
    selectButton: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#CCC',
      borderStyle: 'dashed',
      height: 42,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    selectButtonText: {
      fontSize: 16,
      color: '#666',
    },
  
    preview: {
      width: 100,
      height: 100,
      marginTop: 10,
      alignSelf: 'center',
      borderRadius: 4,
    },
  
    input: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 15,
      marginTop: 10,
      fontSize: 16,
    },
  
    shareButton: {
      backgroundColor: '#7159c1',
      borderRadius: 4,
      height: 42,
      marginTop: 15,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    shareButtonText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#FFF',
    },
  });
  