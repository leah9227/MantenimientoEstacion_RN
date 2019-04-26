import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';
import Theme from '../config/theme';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <View style={styles.headerContainer}>

          <View style={styles.cardStyle}>
            <TouchableOpacity>
              <View></View>
            </TouchableOpacity>
          </View>

          <View style={styles.logoStyle}>
            <Text style={ styles.titleHeader }>Mantenimiento de estación</Text>
            <Image source={Theme.headerLogo} style={styles.headerLogo} />
          </View>
          <View style={styles.cardStyle}>
            <TouchableOpacity onPress={ () => {this.props.onClickSettings && this.props.onClickSettings()}}>
              <Icon name="md-settings" size={27} color="#FFF"/>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

Header.propTypes = {
  onClickSettings: PropTypes.func,
};

export default withNavigation(Header);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  headerContainer: {
    marginTop: 24,
    flexDirection: 'row',
    height: '9%',
    width: '100%',
    backgroundColor: Theme.mainColor,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  headerLogo: {
    resizeMode: 'contain',
    height: '60%',
  },
  titleHeader: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoStyle: {
    flex: 5,
    alignItems: 'center',
  },
  cardStyle: {
    flex: 1,
    alignItems: 'center',
  },
});
