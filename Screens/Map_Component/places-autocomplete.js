import React, {Component} from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

export default class google extends Component {
  render(){

  return (
    <View style={styles.container}>
      <View style={styles.top}>
    <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        console.log(data, details);
        this.setState(
                  {
                    address: data.description, // selected address
                    coordinates: `${details.geometry.location.lat},${details.geometry.location.lng}` // selected coordinates
                  }
                );
      }}

      getDefaultValue={() => ''}

      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyDEAhe5FZOZw-5XEMDgaZOXJmT0W79D_kw',
        language: 'in', // language of the results

      }}

      styles={{
        textInputContainer: {
          width: '100%'
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}

      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        types: 'food'
      }}

      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      predefinedPlaces={[homePlace, workPlace]}

      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      renderRightButton={() => <Text>Custom text after the input</Text>}
    />
    </View>
    <View style={styles.container2}>
      <Text>
        hola {this.setState.address}
      </Text>
    </View>
    </View>

  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  width: '100%',
height: '100%',

  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
color:'black',
  },
  instructions: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
  },
top: {
height: '50%',
justifyContent: 'center',
    alignItems: 'center',
  },

container2: {
   height:'75%',
   justifyContent: 'center',
  },
buttonContainer: {
alignItems: 'center',
    backgroundColor: 'rgba(255, 255,255, 0.5)',
    padding: 1,
    margin: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#0B0B3B'

     },
textoboton: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    fontSize: 12

  },

})