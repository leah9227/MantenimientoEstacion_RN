import {
  USER_REGISTER_URL,
  PERSONAL_ACCESS_TOKEN,
  USER_FORGOT_PASSWORD_URL,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRECT,
  SERVICE_NAME,
} from '../config/urls';

export function initSettings() {
  return {
    type: 'INIT_SETTINGS',
  };
}

export function getSettings() {
  return {
    type: 'GET_SETTINGS',
  };
}

export function setSettings(stationNumber, URL_Service, taxPercentage, pumpCount) {
  return {
    type: 'SET_SETTINGS',
    payload: { stationNumber, URL_Service, taxPercentage, pumpCount },
  };
}

export function getStationStatus(pURL) {

  return (dispatch, getState) => {

    let body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<tem:ObtenEstado/>' +
                '</soapenv:Body>' +
               '</soapenv:Envelope>';

  return fetch(`http://${pURL}/${SERVICE_NAME}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml;charset=UTF-8',
      'SOAPAction': 'http://tempuri.org/IComandosPortal/ObtenEstado',
      Accept: 'application/json',
    },
    body: body,
  })
    .then((response) => {
      var temp = JSON.stringify(response._bodyInit.replace(/s:/g,''));
      temp = temp.replace(/a:/g,'');
      temp = temp.replace(/( xmlns=\\".*?")/g, '');
      temp = temp.replace(/( xmlna=\\".*?")/g, '');
      temp = temp.replace(/( xmlni=\\".*?")/g, '');
      temp = temp.replace(/(".*?)/g, '');

      var parseString = require('react-native-xml2js').parseString;

      parseString(temp, function (err, result){
        if(err == null){
          var resString = result.Envelope.Body[0].ObtenEstadoResponse[0].ObtenEstadoResult[0].EsEstadoActivo[0]
          dispatch(successGetStationStatus(resString == 'true' ? true : false));
        }
        else{
          dispatch(error(`Error parsing xml to json: ${err}`));
        }
      });

    })
    .catch((error_msg) => {
      dispatch(error(`Error: ${error_msg}`));
    });
  }
}

export function setStationStatus(pURL, pCurrentStatus) {
  return (dispatch, getState) => {
  var newStatus = pCurrentStatus == true ? '0' : '1';
  console.log(`parameter: ${pCurrentStatus}, newStatus: ${newStatus}`);
  let body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">' +
              '<soapenv:Header/>' +
              '<soapenv:Body>' +
                '<tem:CambiaEstado>' +
                  '<tem:estado>' + newStatus + '</tem:estado>' +
                '</tem:CambiaEstado>' +
              '</soapenv:Body>' +
             '</soapenv:Envelope>';

  return fetch(`http://${pURL}/${SERVICE_NAME}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml;charset=UTF-8',
      'SOAPAction': 'http://tempuri.org/IComandosPortal/CambiaEstado',
      Accept: 'application/json',
    },
    body: body,
  })
    .then((response) => {

      var temp = JSON.stringify(response._bodyInit.replace(/s:/g,''));
      temp = temp.replace(/a:/g,'');
      temp = temp.replace(/( xmlns=\\".*?")/g, '');
      temp = temp.replace(/( xmlna=\\".*?")/g, '');
      temp = temp.replace(/( xmlni=\\".*?")/g, '');
      temp = temp.replace(/(".*?)/g, '');
      console.log(`before method parsing: ${temp}`);

      var parseString = require('react-native-xml2js').parseString;

      parseString(temp, function (err, result){
        if(err == null){
          var boolReponse = result.Envelope.Body[0].CambiaEstadoResponse[0].CambiaEstadoResult[0]

          if(boolReponse == 'true'){
            dispatch(successSetStationStatus(pCurrentStatus));
          }
          else{
            dispatch(error('Change not applied. Please check the url service.'));
          }
        }
        else{
          dispatch(error(`Error parsing xml to json: ${err}`));
        }
      });

    })
    .catch((error_msg) => {
      dispatch(error(`Error: ${error_msg}`));
    });
  }
}

export function error(message) {
  return {
    type: 'ERROR',
    payload: { message },
  };
}

export function successGetStationStatus(status) {
  return {
    type: 'SUCCESS_GET_STATION_STATUS',
    payload: { status },
  };
}

export function successSetStationStatus(pCurrentStatus) {
  return {
    type: 'SUCCESS_SET_STATION_STATUS',
    payload: { pCurrentStatus },
  };
}
