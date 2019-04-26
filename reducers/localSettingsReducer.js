import { fromJS } from 'immutable';

const INIT_STATE = {
  URL_Service: '0.0.0.0:0',
  message: '',
  configurationStatus: false,
  error: false,
};

const localSettings = (state = fromJS(INIT_STATE), action) => {
  switch (action.type) {
    case 'INIT_SETTINGS':
      return state.merge(INIT_STATE);
    case 'GET_SETTINGS':
      return state;
    case 'SET_SETTINGS':
      return state.merge({
        URL_Service: action.payload.URL_Service,
      });
    case 'SUCCESS_GET_STATION_STATUS':
      return state.merge({
        configurationStatus: action.payload.status,
        message: '',
        error: false,
      });
    case 'SUCCESS_SET_STATION_STATUS':
      return state.merge({
        configurationStatus: !action.payload.pCurrentStatus,
        message: '',
        error: false,
      });
    case 'ERROR':
      return state.merge({
        error: true,
        message: action.payload.message,
      });
    default:
      return state;
  }
};

export default localSettings;
