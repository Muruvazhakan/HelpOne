import React, { useState, useEffect } from 'react';

import { fetchCountries } from './Covid_Fetch_Datas';

const Countries = ({ handleCountryChange }) => {
    const [countries, setCountries] = useState([]);
  
    useEffect(() => {
      const fetchAPI = async () => {
        setCountries(await fetchCountries());
      };
  
      fetchAPI();
    }, []);
  
    return (
    //   <FormControl className={styles.formControl}>
    //     <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
    //       <option value="">United States</option>
    //       {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
    //     </NativeSelect>
    //   </FormControl>
    null
    );
  };
  
  export default Countries;
  