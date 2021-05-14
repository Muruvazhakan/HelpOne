
import * as Covid from '../../components/Covid_Parameter';

export const Covid_India_Stats =null, Covid_All_Contires_Stats =null;

export const fetchCovidData = async (country) => {
    let changeableUrl = Covid.Covid_All_Contires_Stats_URL;
    // console.log('[Covid_Fetch_Datas] changeableUrl ' +changeableUrl);
    if (country) {
      changeableUrl = `${Covid.Covid_All_Contires_Stats_URL}/countries/${country}`;
    }
  
    try {     
      // console.log("1 [Covid_Fetch_Datas] response");     
      let response_fetchData = '';      
     await fetch(changeableUrl, {
        method: 'post',
      }).then(res => res.json()).then(res => {
        // console.log("[Covid_Fetch_Datas] 2 response");
        // console.log(res);           
        response_fetchData= {
          confirmed:res.confirmed.value,
          recovered:res.recovered.value,
          deaths:res.deaths.value,
          lastUpdate:res.lastUpdate,
        }      
        
      })
        .catch((error) => {
          console.error(error);
        });
     
      // console.log("[Covid_Fetch_Datas] response_fetchData"+response_fetchData);
      // console.log(response_fetchData);   
     
      return response_fetchData;
    } catch (error) {
      return error;
    }
  };

  export const fetchIndiaCovidData = async (country) => {
    let changeableUrl = Covid.Covid_All_Contires_Stats_URL;
    console.log('[Covid_Fetch_Datas] changeableUrl ' +changeableUrl);
    if (country) {
      changeableUrl = `${Covid.Covid_All_Contires_Stats_URL}/countries/${country}`;
    }
  
    try {     
      console.log("1 [Covid_Fetch_Datas] response");     
      let response_fetchData = '';      
     await fetch(changeableUrl, {
        method: 'post',
      }).then(res => res.json()).then(res => {
        console.log("[Covid_Fetch_Datas] 2 response");
        // console.log(res);           
        response_fetchData= {
          confirmed:res.confirmed.value,
          recovered:res.recovered.value,
          deaths:res.deaths.value,
          lastUpdate:res.lastUpdate,
        }      
        
      })
        .catch((error) => {
          console.error(error);
        });
     
      console.log("[Covid_Fetch_Datas] response_fetchData"+response_fetchData);
      console.log(response_fetchData);   
     
      return response_fetchData;
    } catch (error) {
      return error;
    }
  };

  export const fetchAllDailyData = async () => {
    try {
    //   const { data } = await axios.get(`${Covid.Covid_History_Stats_URL}`);
    // const { data } = await axios.get(`${Covid.Covid_Daily_All_Contires_Stats_URL}`);
    let changeableUrl =`${Covid.Covid_All_Contires_Stats_URL}`;
    let response_data='';
    await fetch(changeableUrl, {
      method: 'post',
    }).then(res => res.json()).then(res => {
      console.log("[Covid_Fetch_Datas] fetchAllDailyData countries responses");
      // console.log(res); 
      response_data=res;      
      console.log(response_data);    
      // response_country= {
      //   confirmed:res.confirmed.value,
      //   recovered:res.recovered.value,
      //   deaths:res.deaths.value,
      //   lastUpdate:res.lastUpdate,
      // }      
      
    })
      .catch((error) => {
        console.error(error);
      });
      return response_data.map(({ positive, recovered, death, dateChecked: date }) => 
      ({ confirmed: positive, recovered, deaths: death, date }));
    } catch (error) {
      return error;
    }
  };

export const fetchCountries = async () => {
  try {
    let changeableUrl =`${Covid.Covid_All_Contires_Stats_URL}/countries`;
    let response_country='';
    // const { data: { countries } } = await axios.get(`${Covid.Covid_All_Contires_Stats_URL}/countries`);

    await fetch(changeableUrl, {
      method: 'post',
    }).then(res => res.json()).then(res => {
      console.log("[Covid_Fetch_Datas] fetchCountries countries responses");
      // console.log(res); 
      response_country=res.countries;      
      // console.log(response_country);    
      // response_country= {
      //   confirmed:res.confirmed.value,
      //   recovered:res.recovered.value,
      //   deaths:res.deaths.value,
      //   lastUpdate:res.lastUpdate,
      // }      
      
    })
      .catch((error) => {
        console.error(error);
      });
    // return countries.map((country) => country.name);
    return response_country.map((country) => country.name);
  } catch (error) {
    return error;
  }
};

