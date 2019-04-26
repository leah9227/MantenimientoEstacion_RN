import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
  TouchableHighlight,
}
  from 'react-native';
import PropTypes from 'prop-types';
import Theme from '../config/theme';
import Toast, {DURATION} from 'react-native-easy-toast-fixed'

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      URL_Service: this.props.localSettings.URL_Service
    }
  };

  static navigationOptions = {
    title: 'Configuracion',
    headerStyle: {
      backgroundColor: Theme.mainColor,
    },
    headerTitleStyle: {
      color: '#FFF',
    },
    backButton: {
        color: 'red',
    },
    buttonColor: 'red',
    headerTintColor: '#FFF',
  }

  handleSaveSettingsClick(){
    this.props.setSettings(this.state.stationNumber, this.state.URL_Service, this.state.taxPercentage, this.state.pumpCount);
    this.refs.toast.show('Cambios aplicados.');
  }

  render(){
    return (
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={styles.container}>
          <View style={ styles.cardContent }>

            <View style={ styles.inputContainer }>
              <Text style={ styles.inputTitle }>IP:PortNumber</Text>
              <TextInput style={ styles.inputField } underlineColorAndroid={Theme.mainColor} onChangeText={(text) => { this.setState({ URL_Service: text })}}
              placeholder='URL'>{this.state.URL_Service}</TextInput>
            </View>

          </View>

          <TouchableHighlight  style={ styles.buttonContainer }>
            <Button title='SALVAR CAMBIOS' onPress={ () => { this.handleSaveSettingsClick() }} style={ styles.buttonStyle }/>
          </TouchableHighlight >

          <View style={styles.emptySpace}></View>
        </View>

        <Toast ref="toast" position='bottom' style={{backgroundColor: Theme.mainColor}}
        textStyle={{color:'#FFF'}} opacity={0.8} positionValue={180}/>

      </ScrollView>
    );
  }
}

  Settings.propTypes = {
  auth: PropTypes.object,
  getSettings: PropTypes.func,
  setSettings: PropTypes.func,
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  inputContainer: {
    flex: 1,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'white',
    marginTop: '5%',
    marginBottom: '5%',
    elevation: 3,
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  inputTitle: {
    fontSize: 15,
    width: '100%',
    paddingLeft: 6,
    color: Theme.fontColor,
  },
  inputField: {
    fontSize: 18,
    width: '100%',
    height: 40,
    paddingLeft: 6,
    color: Theme.fontColor,
  },
  emptySpace: {
    flex: 4,
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    width: '90%',
    justifyContent: 'flex-start',
    marginBottom: '5%',
  },
  buttonStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
    color: Theme.mainColor,
  }
});
