import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Switch,
  ScrollView,
  RefreshControl
}
  from 'react-native';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Theme from '../config/theme';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    }
  };

  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    // Service consumption: gets the current station status
    this.props.getStationStatus(this.props.localSettings.URL_Service);
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.getStationStatus(this.props.localSettings.URL_Service);
    this.setState({refreshing: false});
  }

  getResponse(response){
    this.props.setSelectedPump(response);
    this.props.navigation.navigate('PaymentSelectionScreen')
  }


  handleSwitchClick() {
    this.props.setStationStatus(this.props.localSettings.URL_Service, this.props.localSettings.configurationStatus);
  }

  render(){
    return (
      <View style={styles.container}>
        <Header onClickSettings={ () => { this.props.navigation.navigate('SettingsScreen')} }/>

        <ScrollView refreshControl={ <RefreshControl refreshing={ this.state.refreshing } onRefresh={this._onRefresh} /> }>

          <View style={styles.headerContent}>
            <Text style={ styles.headerTitle }>Estado actual de la configuracion:</Text>
          </View>

          <View style={ styles.mainContent }>
            <Text style={ styles.errorStyle }>{ this.props.localSettings.message }</Text>
            <View style={ styles.rowContent }>
              <Text style={ styles.bodyTitle }>{ this.props.localSettings.configurationStatus ? 'Activo' : 'Inactivo' }</Text>
              <Switch trackColor={ Theme.mainColor } thumbColor={ Theme.mainColor } value={ this.props.localSettings.configurationStatus } style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                onValueChange={ () => this.handleSwitchClick()}/>
              </View>
          </View>

          <View style={ styles.bottomContent }>
          </View>
        </ScrollView>
      </View>

    );
  }
}

Home.propTypes = {
  setSelectedPump: PropTypes.func,
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  headerContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    flex: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContent: {
    flex: 8,
    width: '100%',
  },
  headerTitle: {
    color: Theme.fontColor,
    fontSize: 20,
    textAlign: 'center',
  },
  bodyTitle: {
    color: Theme.fontColor,
    fontSize: 24,
    textAlign: 'center',
  },
  rowContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorStyle: {
    color: '#F00',
    fontSize: 12,
  }
});
