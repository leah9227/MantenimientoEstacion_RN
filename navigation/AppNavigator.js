import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import Home from '../containers/Home'
import Settings from '../containers/Settings';

const AppStack = createStackNavigator(
  {
    HomeScreen: Home,
    SettingsScreen: Settings,
  },
  // {
    // headerMode: 'none',
  // }
);

export default class AppNavigator extends React.Component {
  render() {
    //const Stack = this.props.isLogged ? AppStack : AuthStack;
    const Stack = AppStack
    return <Stack />;
  }
}
