import React, { useState, useEffect } from 'react';
export const Toggle_user_name ='Toggle_user_name';
export const Toggle_user_first_name ='Toggle_user_first_name';
export const Toggle_user_last_name ='Toggle_user_last_name';
export const Toggle_user_number ='Toggle_user_number';
export const Toggle_user_email ='Toggle_user_email';
export const Toggle_isUserImageAvailable ='Toggle_isUserImageAvailable';
export const Toggle_user_BloodGroup ='Toggle_user_BloodGroup';
export const Toggle_user_Gender ='Toggle_user_Gender';
export const Toggle_user_DOB ='Toggle_user_DOB'
export const Toggle_user_Confermation ='Toggle_user_Confermation';
export const Toggle_user_Proof ='Toggle_user_Proof';
export const Toggle_user_address_line1 ='Toggle_user_address_line1';
export const Toggle_user_city ='Toggle_user_city';
export const Toggle_user_area ='Toggle_user_area';
export const Toggle_user_state_name ='Toggle_user_state_name';
export const Toggle_user_latitude ='Toggle_user_latitude';
export const Toggle_user_longitude ='Toggle_user_longitude';
export const Toggle_user_pincode ='Toggle_user_pincode';
export const Toggle_user_bood_donated ='Toggle_user_bood_donated';
export const Toggle_user_bood_request_raised ='Toggle_user_bood_request_raised';
export const Toggle_user_Proof_Select ='Toggle_user_Proof_Select';

export const toggleuser_Proof_Select= (user_Proof_Selects) =>{
		return {
			type:Toggle_user_Proof_Select, user_Proof_Select:user_Proof_Selects
		};
}

export const toggleuser_bood_request_raised= (user_bood_request_raiseds) =>{
    return {
        type:Toggle_user_bood_request_raised, user_bood_request_raised:user_bood_request_raiseds
    };
}


export const toggleuser_bood_donated= (user_bood_donateds) =>{
    return {
        type:Toggle_user_bood_donated, user_bood_donated:user_bood_donateds
    };
}

export const toggleuser_pincode= (user_pincodes) =>{
		return {
			type:Toggle_user_pincode, user_pincode:user_pincodes
		};
}
export const toggleuser_longitude= (user_longitudes) =>{
		return {
			type:Toggle_user_longitude, user_longitude:user_longitudes
		};
}

export const toggleuser_latitude= (user_latitudes) =>{
    return {
        type:Toggle_user_latitude, user_latitude:user_latitudes
    };
}
export const toggleuser_state_name= (user_state_names) =>{
    return {
        type:Toggle_user_state_name, user_state_name:user_state_names
    };
}

export const toggleuser_area= (user_areas) =>{
    return {
        type:Toggle_user_area, user_area:user_areas
    };
}

export const toggleuser_city= (user_citys) =>{
    return {
        type:Toggle_user_city, user_city:user_citys
    };
}

export const toggleuser_address_line1= (user_address_line1s) =>{
    return {
        type:Toggle_user_address_line1, user_address_line1:user_address_line1s
    };
}

export const toggleuser_Proof= (user_Proofs) =>{
    return {
        type:Toggle_user_Proof, user_Proof:user_Proofs
    };
}


export const toggleuser_Confermation= (user_Confermations) =>{
    return {
        type:Toggle_user_Confermation, user_Confermation:user_Confermations
    };
}

export const toggleuser_DOB= (user_DOBs) =>{
    return {
        type:Toggle_user_DOB, user_DOB:user_DOBs
    };
}

export const toggleusername= (user_names) =>{
    return {
        type:Toggle_user_name, user_name:user_names
    };
}

export const toggleuserfirstname= (user_first_names) =>{
    return {
        type:Toggle_user_first_name, user_first_name:user_first_names
    };
}

export const toggleuserlastname= (user_last_names) =>{
    return {
        type:Toggle_user_last_name, user_last_name:user_last_names
    };
}

export const toggleusernumber= (user_numbers) =>{
    return {
        type:Toggle_user_number, user_number:user_numbers
    };
}

export const toggleuseremail= (user_emails) =>{
    return {
        type:Toggle_user_email, user_email:user_emails
    };
}

export const toggleuser_BloodGroup= (user_BloodGroups) =>{
    return {
        type:Toggle_user_BloodGroup, user_BloodGroup:user_BloodGroups
    };
}

export const toggleuserisUserImageAvailable= (isUserImageAvailables) =>{
    return {
        type:Toggle_isUserImageAvailable, isUserImageAvailable:isUserImageAvailables
    };
}

export const toggleuser_Gender= (user_Genders) =>{
    return {
        type:Toggle_user_Gender, user_Gender:user_Genders
    };
}


// export const userDataContexts = React.useMemo(() => ({

//    setUserName: async(userName) => {
//       console.log(userName);
//       // setUserToken('fgkj');
//       //  setIsLoading(false);    
//       const userToken = userName;      
//       try {
//         await AsyncStorage.setItem('userName', userName);
        
//       } catch(e) {
//         console.log(e);
//       }

//       // console.log('user token: ', userToken);
//       dispatch({ type: 'Toggle_user_name', user_name: userName});
//     },


//   }), []);