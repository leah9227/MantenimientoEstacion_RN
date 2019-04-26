import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../screens/Home';
import { getStationStatus, setStationStatus } from '../actions/localSettingsAction';


const mapStateToProps = state => ({ localSettings: state.localSettings.toJS() });

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getStationStatus,
      setStationStatus
    }, dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
