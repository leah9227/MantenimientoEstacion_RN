import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Settings from '../screens/Settings';
import { getSettings, initSettings, setSettings } from '../actions/localSettingsAction'

const mapStateToProps = state => ({ localSettings: state.localSettings.toJS() });

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setSettings
    }, dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
