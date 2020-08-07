import { Toggle_user_name, 
    Toggle_user_first_name,
     Toggle_user_last_name, 
     Toggle_user_number ,
     Toggle_user_email,
     Toggle_isUserImageAvailable,
     Toggle_user_BloodGroup,
     Toggle_user_Gender,
     Toggle_user_DOB,
     Toggle_user_Confermation,
     Toggle_user_Proof,
     Toggle_user_address_line1,
     Toggle_user_state_name,
     Toggle_user_city,
     Toggle_user_area,
     Toggle_user_latitude,
     Toggle_user_longitude,
     Toggle_user_pincode,
     Toggle_user_bood_donated,
     Toggle_user_bood_request_raised,
     Toggle_user_Proof_Select,
    } from '../actions/HelpOne';


const initialState={
   
    user_address_line1:'testaddress',
    user_city:'test city',
    user_area:'test area',
    user_state_name:'test state ',
    user_latitude:30.425998333,
    user_longitude:-110.125100000,
    user_pincode:null,

    user_name:null,
    user_number:null,
    user_image:null,   
    isUserImageAvailable:null,       
    user_first_name:null,    
    user_last_name:null,
    user_email:null,
    user_bood_donated:0,
    user_bood_request_raised:0,
    user_Gender:null,
    user_BloodGroup:null,
    user_DOB:null,
    user_Age:null,
    user_Confermation:false,
    user_Proof:null,
};

const helponeReducer=(state=initialState, action)=>{
    console.log("user_name"+state.user_name);
    switch (action.type) { 

        case Toggle_user_Proof_Select :
            return {...state,
                user_Proof_Select:action.user_Proof_Select,               
                }
        case Toggle_user_bood_request_raised :
		    return {...state,
			    user_bood_request_raised:action.user_bood_request_raised,               
			}
        case Toggle_user_bood_donated :
            return {...state,
                user_bood_donated:action.user_bood_donated,               
                }

        case Toggle_user_pincode :
            return {...state,
                user_pincode:action.user_pincode,               
                }
        case Toggle_user_longitude :
            return {...state,
                 user_longitude:action.user_longitude,               
                }
        case Toggle_user_latitude :
		    return {...state,
			    user_latitude:action.user_latitude,               
            }
            
        case Toggle_user_state_name :
            return {...state,
                user_state_name:action.user_state_name,               
			}
       
        case Toggle_user_area :
		    return {...state,
			    user_area:action.user_area,               
		    }
        
        case Toggle_user_city :
            return {...state,
                user_city:action.user_city,               
            }                

        case Toggle_user_address_line1 :
            return {...state,
                user_address_line1:action.user_address_line1,               
            }

        case Toggle_user_Proof :
            return {...state,
                    user_Proof:action.user_Proof,               
            }
            
        case Toggle_user_Confermation :
		    return {...state,
			    user_Confermation:action.user_Confermation,               
            }
            
        case Toggle_user_DOB :
	        return {...state,
		        user_DOB:action.user_DOB,               
	    }         
        case Toggle_user_name :
            return {...state,
                user_name:action.user_name,               
            }

        case Toggle_user_first_name :
            return {...state,
                user_first_name:action.user_first_name,               
            }

        case Toggle_user_last_name :
            return {...state,
                user_last_name:action.user_last_name,               
            }

        case Toggle_user_number:
            return {...state,
                user_number:action.user_number,               
            }
        
        case Toggle_user_email :
        return {...state,
            user_email:action.user_email,               
        }
     
        case Toggle_isUserImageAvailable :
            return {...state,
                isUserImageAvailable:action.isUserImageAvailable,               
            }
						
        case Toggle_user_BloodGroup :
            return {...state,
                user_BloodGroup:action.user_BloodGroup,               
            }	
            
        case Toggle_user_Gender :
            return {...state,
                user_Gender:action.user_Gender,               
            }
                           


            
        default:
            return state;
      }
    }
    

export default helponeReducer;