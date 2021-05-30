export const Covid_USA_Stats_URL ='https://covid19.mathdro.id/api/countries/USA';
export const Covid_Daily_All_Contires_Stats_URL ='https://api.covidtracking.com/v1/us/daily.json';
//Case counts:
export const Covid_India_Stats_URL='https://api.rootnet.in/covid19-in/stats/latest';
export const Covid_History_Stats_URL ='https://api.rootnet.in/covid19-in/stats/history';
export const Covid_All_Contires_Stats_URL ='https://covid19.mathdro.id/api';

//Testing stats
export const Covid_Testing_Stats_URL='https://api.rootnet.in/covid19-in/stats/testing/latest';
export const Covid_Testing_History_Stats_URL='https://api.rootnet.in/covid19-in/stats/testing/history';

//Hospitals & beds
export const Covid_Beds_Stats_URL ='https://api.rootnet.in/covid19-in/hospitals/beds';
export const Covid_Medical_Colleges_Stats_URL ='https://api.rootnet.in/covid19-in/hospitals/medical-colleges';

//Contact & helpline 
export const Covid_Contacts_URL ='https://api.rootnet.in/covid19-in/contacts';

//Notifications & advisories
export const Covid_Notifications_URL ='https://api.rootnet.in/covid19-in/notifications';


//Img location

export const covid_img = {
    Warning: {
      imgName: 'Warning', 
      uri: require('../assets/Covid_Icons/Glyph/Warning.png')
    },
    Temperature: {
      imgName: 'Temperature', 
      uri: require('../assets/Covid_Icons/Glyph/Temperature.png')
    },
    Searching: {
        imgName: 'Searching', 
        uri: require('../assets/Covid_Icons/Glyph/Searching.png')
      },
      Location: {
        imgName: 'Location', 
        uri: require('../assets/Covid_Icons/Glyph/Location.png')
      },
      EarthCorona: {
        imgName: 'EarthCorona', 
        uri: require('../assets/Covid_Icons/Glyph/EarthCorona.png')
      },
      Droplet: {
        imgName: 'Droplet', 
        uri: require('../assets/Covid_Icons/Glyph/Droplet.png')
      },
      CoronaVirus: {
        imgName: 'CoronaVirus', 
        uri: require('../assets/Covid_Icons/Glyph/CoronaVirus.png')
      },
      Chart: {
        imgName: 'Chart', 
        uri: require('../assets/Covid_Icons/Glyph/Chart.png')
      },
      Report: {
        imgName: 'Report', 
        uri: require('../assets/Covid_Icons/Glyph/Report.png')
      },
      whf: {
        imgName: 'whf', 
        uri: require('../assets/Covid_Icons/Glyph/whf.png')
      },
  }

import {Server_URL} from './Parameter';

export const Covid_Add_Details_URL= `${Server_URL}/Covid_Components/Covid_Add_Details_Components/Covid_Add_Details.php`;

export const Covid_Details_list_URL= `${Server_URL}/Covid_Components/Covid_Add_Details_Components/Covid_Details_list.php`;

