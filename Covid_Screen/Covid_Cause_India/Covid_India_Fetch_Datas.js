
import * as Covid from '../../components/Covid_Parameter';

export const fetchCovidStateData = async () => {
    let changeableUrl = Covid.Covid_India_Stats_URL,
    region=[],lastupdate=null,setupmark=[],regiondata=[];
    // location,confirmed;
    
    console.log('[Covid_Fetch_Datas] changeableUrl ' +changeableUrl);
    
    try {     
      console.log("1 [Covid_India_Fetch_Datas] response ");             
     await fetch(changeableUrl, {
        method: 'post',
      }).then(res => res.json()).then(res => {
        // console.log("[Covid_India_Fetch_Datas] 2 response");
        // console.log( res);    
        // console.log(res.data);   
        lastupdate= res.data.lastOriginUpdate;
        // setupmark = JSON.parse(res.data.regional);
        // region=setupmark;
        
        region=res.data.regional;
        // console.log(region); 
        // regiondata= region.map((regions) => ({        
        //    location:regions.loc	 ,
        //    confirmed:regions.totalConfirmed,
        //    deaths:regions.deaths,
        //   recovered:regions.discharged,        
        // }))
        // response_fetchData= {
        //   confirmed:res.confirmed.value,
        //   recovered:res.recovered.value,
        //   deaths:res.deaths.value,
        //   lastUpdate:res.lastUpdate,
        // }      
        // return location,confirmed;
        return region.map(({ totalConfirmed, discharged, deaths, loc }) => 
        ({ confirmed: totalConfirmed, discharged, deaths, location:loc }));
      })
        .catch((error) => {
          console.error(error);
        });
     
      // console.log("[Covid_India_Fetch_Datas] region datas");
      // console.log(region);   
      return region.map(({ totalConfirmed, discharged, deaths, loc }) => 
      ({ confirmed: totalConfirmed, discharged, deaths, location:loc }));
      // return regiondata;
    } catch (error) {
      return error;
    }
  };

  export const fetchIndiaCovidData = async (country) => {
    let changeableUrl = Covid.Covid_All_Contires_Stats_URL;
    console.log('[Covid_India_Fetch_Datas] changeableUrl ' +changeableUrl);
    if (country) {
      changeableUrl = `${Covid.Covid_All_Contires_Stats_URL}/countries/${country}`;
    }
  
    try {     
      // console.log("1 [Covid_India_Fetch_Datas] response");     
      let response_fetchData = '';      
     await fetch(changeableUrl, {
        method: 'post',
      }).then(res => res.json()).then(res => {
        // console.log("[Covid_India_Fetch_Datas] 2 response");
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
     
      console.log("[Covid_India_Fetch_Datas] response_fetchData"+response_fetchData);
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
      return data.map(({ positive, recovered, death, dateChecked: date }) => 
      ({ confirmed: positive, recovered, deaths: death, date }));
    } catch (error) {
      return error;
    }
  };

export const fetchCountries = async () => {
  try {
    const { data: { countries } } = await axios.get(`${Covid.Covid_All_Contires_Stats_URL}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};

export const fetchCovidStateContactData = async () => {
  let changeableUrl = Covid.Covid_Contacts_URL,
  allcontact=[],allcontactsplit="",finalcontact={},regiondata=[];
  // location,confirmed;
  
  // console.log('[Covid_India_Contacts_Screen] changeableUrl ' +changeableUrl);
  
  try {     
    // console.log("1 [Covid_India_Contacts_Screen] response ");             
   await fetch(changeableUrl, {
      method: 'post',
    }).then(res => res.json()).then(res => {
      // console.log("[Covid_India_Fetch_Datas] allcontact response");
      // console.log( res);    
      // console.log(res.data.contacts);              
      
      allcontact=res.data;
      // console.log(allcontact); 
      // console.log("[Covid_India_Fetch_Datas] allcontact.regional response");
      // console.log(allcontact.contacts); 
      allcontactsplit= allcontact.contacts.regional.map((contacts) => ({        
        location:contacts.loc	 ,
        number:contacts.number	,                 
      }))
      console.log( "[Covid_India_Fetch_Datas] allcontact contact");    
       console.log(allcontactsplit);    
       finalcontact = {allcontact , allcontactsplit}
      //  console.log(finalcontact); 

    })
      .catch((error) => {
        console.error(error);
      });
   
    // console.log("[Covid_India_Fetch_Datas] region datas");
    // console.log(region);   
    return finalcontact;
    // return regiondata;
  } catch (error) {
    return error;
  }
};

export const fetchCovidBedData = async () => {
  let changeableUrl = Covid.Covid_Beds_Stats_URL,
  allbed=[],allcontactsplit="",finalbed={},lastupdate=[];
  // location,confirmed;
  
  // console.log('[Covid_India_Contacts_Screen] changeableUrl ' +changeableUrl);
  
  try {     
    // console.log("1 [Covid_India_Contacts_Screen] response ");             
   await fetch(changeableUrl, {
      method: 'post',
    }).then(res => res.json()).then(res => {
      console.log("[Covid_India_Fetch_Datas] fetchCovidBedData response");
      // console.log( res);    
      // console.log(res.data.contacts);              
      
      allbed=res.data;
      console.log(allbed); 
      // console.log(allbed.summary); 
      
      // console.log("[Covid_India_Fetch_Datas] allcontact.regional response");
      // console.log(allcontact.contacts); 
      // allcontactsplit= allcontact.contacts.regional.map((contacts) => ({        
      //   location:contacts.loc	 ,
      //   number:contacts.number	,                 
      // }))
      // console.log( "[Covid_India_Fetch_Datas] allcontact contact");    
      //  console.log(allcontactsplit);    
      //  finalcontact = {allcontact , allcontactsplit}
      //  console.log(finalcontact); 

    })
      .catch((error) => {
        console.error(error);
      });
   
    // console.log("[Covid_India_Fetch_Datas] region datas");
    // console.log(region);   
    return allbed;
    // return regiondata;
  } catch (error) {
    return error;
  }
};

export const fetchCovidMedicalCollegesData = async () => {
  let changeableUrl = Covid.Covid_Medical_Colleges_Stats_URL,
  allbed=[],allcontactsplit="",finalbed={},lastupdate=[];
  // location,confirmed;
  
  // console.log('[Covid_India_Contacts_Screen] changeableUrl ' +changeableUrl);
  
  try {     
    // console.log("1 [Covid_India_Contacts_Screen] response ");             
   await fetch(changeableUrl, {
      method: 'post',
    }).then(res => res.json()).then(res => {
      console.log("[Covid_India_Fetch_Datas] fetchCovidBedData response");
      // console.log( res);    
      // console.log(res.data.contacts);              
      
      allbed=res.data;
      // console.log(allbed); 
      // console.log(allbed.summary); 
      
      // console.log("[Covid_India_Fetch_Datas] allcontact.regional response");
      // console.log(allcontact.contacts); 
      // allcontactsplit= allcontact.contacts.regional.map((contacts) => ({        
      //   location:contacts.loc	 ,
      //   number:contacts.number	,                 
      // }))
      // console.log( "[Covid_India_Fetch_Datas] allcontact contact");    
      //  console.log(allcontactsplit);    
      //  finalcontact = {allcontact , allcontactsplit}
      //  console.log(finalcontact); 

    })
      .catch((error) => {
        console.error(error);
      });
   
    // console.log("[Covid_India_Fetch_Datas] region datas");
    // console.log(region);   
    return allbed;
    // return regiondata;
  } catch (error) {
    return error;
  }
};


export const fetchCovidTestData = async () => {
  let changeableUrl = Covid.Covid_Testing_Stats_URL,
  alldata=[],allcontactsplit="",finalbed={},lastupdate=[];
  // location,confirmed;
  
  // console.log('[Covid_India_Contacts_Screen] changeableUrl ' +changeableUrl);
  
  try {     
    // console.log("1 [Covid_India_Contacts_Screen] response ");             
   await fetch(changeableUrl, {
      method: 'post',
    }).then(res => res.json()).then(res => {
      console.log("[Covid_India_Fetch_Datas] fetchCovidTestData ");
      // console.log( res);    
      // console.log(res.data.contacts);              
      
      alldata=res.data;
      console.log(alldata); 
      // console.log(allbed.summary); 
      
      // console.log("[Covid_India_Fetch_Datas] allcontact.regional response");
      // console.log(allcontact.contacts); 
      // allcontactsplit= allcontact.contacts.regional.map((contacts) => ({        
      //   location:contacts.loc	 ,
      //   number:contacts.number	,                 
      // }))
      // console.log( "[Covid_India_Fetch_Datas] allcontact contact");    
      //  console.log(allcontactsplit);    
      //  finalcontact = {allcontact , allcontactsplit}
      //  console.log(finalcontact); 

    })
      .catch((error) => {
        console.error(error);
      });
   
    // console.log("[Covid_India_Fetch_Datas] region datas");
    // console.log(region);   
    return alldata;
    // return regiondata;
  } catch (error) {
    return error;
  }
};


export const fetchCovidTestHistoryData = async () => {
  let changeableUrl = Covid.Covid_Testing_History_Stats_URL,
  alldata=[],allcontactsplit="",finalbed={},lastupdate=[];
  // location,confirmed;
  
  // console.log('[Covid_India_Contacts_Screen] changeableUrl ' +changeableUrl);
  
  try {     
    // console.log("1 [Covid_India_Contacts_Screen] response ");             
   await fetch(changeableUrl, {
      method: 'post',
    }).then(res => res.json()).then(res => {
      // console.log("[Covid_India_Fetch_Datas] fetchCovidTestData ");
      // console.log( res);    
      // console.log(res.data.contacts);              
      
      alldata=res.data;
      // console.log(alldata); 
      // console.log(allbed.summary); 
      
      // console.log("[Covid_India_Fetch_Datas] allcontact.regional response");
      // console.log(allcontact.contacts); 
      // allcontactsplit= allcontact.contacts.regional.map((contacts) => ({        
      //   location:contacts.loc	 ,
      //   number:contacts.number	,                 
      // }))
      // console.log( "[Covid_India_Fetch_Datas] allcontact contact");    
      //  console.log(allcontactsplit);    
      //  finalcontact = {allcontact , allcontactsplit}
      //  console.log(finalcontact); 

    })
      .catch((error) => {
        console.error(error);
      });
   
    // console.log("[Covid_India_Fetch_Datas] region datas");
    // console.log(region);   
    return alldata;
    // return regiondata;
  } catch (error) {
    return error;
  }
};

export const fetchCovidGuidelinesData = async () => {
  let changeableUrl = Covid.Covid_Notifications_URL,
  alldata=[],allcontactsplit="",finalbed={},lastupdate=[];
  // location,confirmed;
  
  // console.log('[Covid_India_Contacts_Screen] changeableUrl ' +changeableUrl);
  
  try {     
    // console.log("1 [Covid_India_Contacts_Screen] response ");             
   await fetch(changeableUrl, {
      method: 'post',
    }).then(res => res.json()).then(res => {
      console.log("[Covid_India_Fetch_Datas] fetchCovidGuidelinesData ");
      // console.log( res);    
      // console.log(res.data.contacts);              
      
      alldata=res.data;
      console.log(alldata); 
      console.log("[Covid_India_Fetch_Datas] fetchCovidGuidelinesData over ");
      
      // console.log("[Covid_India_Fetch_Datas] allcontact.regional response");
      // console.log(allcontact.contacts); 
      // allcontactsplit= allcontact.contacts.regional.map((contacts) => ({        
      //   location:contacts.loc	 ,
      //   number:contacts.number	,                 
      // }))
      // console.log( "[Covid_India_Fetch_Datas] allcontact contact");    
      //  console.log(allcontactsplit);    
      //  finalcontact = {allcontact , allcontactsplit}
      //  console.log(finalcontact); 

    })
      .catch((error) => {
        console.error(error);
      });
   
    // console.log("[Covid_India_Fetch_Datas] region datas");
    // console.log(region);   
    return alldata;
    // return regiondata;
  } catch (error) {
    return error;
  }
};