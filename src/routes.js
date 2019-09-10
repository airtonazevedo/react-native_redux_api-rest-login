import React from 'react';
import { createAppContainer, createStackNavigator, createDrawerNavigator /*É o menu de navegação tem varios creates legais*/ } from 'react-navigation';
import Home from './pages/home';
import Login from './pages/login';
import Vendas from './pages/vendas';
import Comissao from './pages/comissao';

const MenuLateralNavigator = createDrawerNavigator(
  {
    Home,
    Vendas,
    Comissao,
  }, {
    initialRouteName: 'Home',

    /*, 
        defaultNavigationOptions: {
            headerTintColor: '#000',
            headerTitle: "VIVA",//<Image style={{marginHorizontal: 20}} source={logo}/>,
            headerBackTitle: null,
             
        },
        mode: 'modal'*/
  }
)

const App = createStackNavigator(
  {
    Login,
    MenuLateralNavigator
  }, {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
)

//const AppStack = createStackNavigator({ MenuLateralNavigator : { screen: MenuLateralNavigator } });

export default createAppContainer(App);