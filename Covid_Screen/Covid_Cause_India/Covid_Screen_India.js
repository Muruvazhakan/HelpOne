import React from 'react';
import * as fetchCovid from '../Covid_Status/Covid_Fetch_Datas';
// import Covid_Cause_Screen from '../Covid_Home_Screen/Covid_Cause_Screen';
import FlipCard from 'react-native-flip-card';
class Covid_Screen_India extends React.Component {
    state = {
      data: {},
      indiadata:{},
      country: '',
    }
  
    async componentDidMount() {
      const data = await fetchCovid.fetchCovidData();
      const indiadatas = await fetchCovid.fetchCovidData("IND");
      console.log("[Covid_Screen] fetchData data");
      console.log(data);
      
      console.log("[Covid_Screen] fetchData IND data");
      console.log(indiadatas);

    //   console.log("datass");
      this.setState({  ...this.state,         
        data: data,indiadata:indiadatas });
    }
  
    handleCountryChange = async (country) => {
      const data = await fetchData(country);
  
      this.setState({ ...this.state,
           data, country: country });
    }
  
    render() {
      const { data,indiadata, country } = this.state;
  
      return (       
        <FlipCard
                    // style={styles.cardview}
                    friction={6}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={false}
                    clickable={true}
                    // key={index}
                    onFlipEnd={(isFlipEnd) => { console.log('isFlipEnd', isFlipEnd) }}
                  >
        {/* <Covid_Cause_Screen data={data} countrty="in All Countries"  countupstate="No"/>  
        <Covid_Cause_Screen data={indiadata} countrty="in India" countupstate="No"/>       
        */}
        </FlipCard>   
      );
    }
  }
  
  export default Covid_Screen_India;