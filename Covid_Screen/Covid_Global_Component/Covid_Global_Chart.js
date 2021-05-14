import React, { useState, useEffect } from 'react';
// import { Line, Bar } from 'react-chartjs-2';
import {
  Button, StyleSheet, StatusBar, ToastAndroid,
  TouchableOpacity, Linking
} from 'react-native';
import {
  Text,
  TouchableRipple,
  Switch
} from 'react-native-paper';
import { View } from 'react-native-animatable';
import * as fetchCovid from '../Covid_Status/Covid_Fetch_Datas';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import {
  Dimensions
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
const { width, height } = Dimensions.get('window');
const Covid_Global_Chart = (props) => {
  const [dailyData, setDailyData] = useState({});
  const [selectchart, setselectchart] = useState(true);
  let confirmed = "", recovered = "", deaths = "", country = "", datas = "";
  useEffect(() => {
    const fetchMyAPI = async () => {
      //   const initialDailyData = await fetchCovid.fetchAllDailyData();
      // { data: { confirmed, recovered, deaths }, country }
      //   setDailyData(initialDailyData);
      console.log("[Covid_Global_Chart] Covid_Global_Chart data");
      // console.log(props);
      datas = props.data;
      country = props.country;
      confirmed = datas.confirmed;
      recovered = datas.recovered;
      deaths = datas.deaths;
      console.log(deaths + "" + recovered + "" + confirmed);
    };

    fetchMyAPI();
  }, []);



  const barChart = () => {
    return (
      <BarChart
        //   style={graphStyle}
        data={linedatas}
        width={width * 0.95}
        height={width * 0.90}
        fromZero={true}
        showBarTops={true}
        showLegend={true}
        yAxisInterval={100}
        //   yAxisLabel={props.country}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        horizontalLabelRotation={-25}
        strokeWidth={30}
        showValuesOnTopOfBars
        style={styles.chartStyles}
        withVerticalLabels={props.country}
      // hideLegend={false}
      />
    )
  }
    ;

  const lineChart = () => {
    return (
      <LineChart
        data={linedatas}
        width={width * 0.95}
        height={width * 0.90}
        fromZero={true}
        showBarTops={true}
        showValuesOnTopOfBars
        horizontalLabelRotation={-25}
        chartConfig={chartConfig}
        style={styles.chartStyles}
      />
    )
  };
  const chartConfig = {
    // legendFontColor: "#08130D",
    // legendFontSize: 15,
    decimalPlaces: 0,
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0.3,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(70, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 255, 120, ${opacity})`,
    // labelColor: (opacity = 1) => `rgba(0, 255, 120, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    // useShadowColorFromDataset: true,
    // useShadowColorFromDataset: false ,// optional  

  };
  
  const linedatas = {
    legend: [props.country], // optional
    labels: ['Infected', 'Recovered', 'Deaths'],
    datasets: [
      {
        label: 'People',
        data: [props.data.confirmed, props.data.recovered, props.data.deaths],
        // data: [20, 45, 28],
        color: (opacity = 1) => `rgba(255, 255, 250, ${opacity})`, // optional       
        // color: "#F00",
        legendFontColor: "#1E2923",
        strokeWidth: 25 // optional
      }
    ],

  };

  const toggleselectchart = () => {
    console.log("selectchart");
    console.log(selectchart);
    setselectchart (!selectchart)
  }

  return (
    // <div className={styles.container}>
    //   {country ? barChart : lineChart}
    // </div>

    <View style={styles.container}>
      {props.country !== '' ?
        <View>
          <View>
            < TouchableRipple onPress={(e) => { toggleselectchart(e) }}>
              <View style={styles.preference}>
                <Text>Switch Chart </Text>
                <View pointerEvents="none">
                  <Switch value={selectchart} />
                </View>
                <View style={{ fontWeight:'bold'}} >
                {selectchart ? <Text> Bar Chart</Text> : <Text> Line Chart</Text>  }
                </View>
              </View>
            </TouchableRipple>
            
          </View>

                {selectchart ?  barChart() : lineChart() }
                 
                
        </View>

        : null}

    </View>
  );
};

export default Covid_Global_Chart;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center', 
    // justifyContent: 'center',
    width: '80%',
  },
  chartStyles: {
    borderRadius: width * 0.09,
    // marginTop:0,
    borderColor: 'white'
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf:'center',   
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontWeight:'bold',
    // padding:'4%'
},
});
