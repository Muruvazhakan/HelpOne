import * as Toggle from '../actions/HelpOne';


const initialState={
   
    user_address_line1:null,
    user_city:null,
    user_area:null,
    user_state_name:null,
    user_latitude:null,
    user_longitude:null,
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
    user_Id:0,
    admin_comments:null,
    user_proof_status:null,
    user_request_user_city:null,
    user_request_user_state_name:null,
    user_request_user_district:null,
    user_request_address_line1:null,
    user_request_user_countryName:null,
    user_request_user_pincode:null,
    user_request_user_longitude:null,
    user_request_user_latitude:null,
    user_district:null,
    map_screen_name:null,
    user_country:null,
    user_sos_name1:null,
    user_sos_name2:null,
    user_sos_name3:null,
    user_sos_name1_number:null,
    user_sos_name2_number:null,
    user_sos_name3_number:null,
    user_sos_msg:null,
    ip_address:null,
};

const helponeReducer=(state=initialState, action)=>{
   // console.log("user_name"+state.user_name);
    switch (action.type) { 

        case Toggle.Toggle_ip_address :
            return {...state,
                ip_address:action.ip_address,               
                }
                
        case Toggle.Toggle_user_sos_msg :
            return {...state,
                user_sos_msg:action.user_sos_msg,               
                }
        case Toggle.Toggle_user_sos_name3_number :
            return {...state,
                user_sos_name3_number:action.user_sos_name3_number,               
                }
        case Toggle.Toggle_user_sos_name2_number :
            return {...state,
                user_sos_name2_number:action.user_sos_name2_number,               
                }
        case Toggle.Toggle_user_sos_name1_number :
            return {...state,
                user_sos_name1_number:action.user_sos_name1_number,               
                }
        case Toggle.Toggle_user_sos_name3 :
            return {...state,
                user_sos_name3:action.user_sos_name3,               
                }
        case Toggle.Toggle_user_sos_name2 :
            return {...state,
                user_sos_name2:action.user_sos_name2,               
                }
        case Toggle.Toggle_user_country :
            return {...state,
                user_country:action.user_country,               
                }

        case Toggle.Toggle_map_screen_name :
            return {...state,
                map_screen_name:action.map_screen_name,               
                }

        case Toggle.Toggle_user_district :
            return {...state,
                user_district:action.user_district,               
                }

        case Toggle.Toggle_user_request_user_latitude :
            return {...state,
                user_request_user_latitude:action.user_request_user_latitude,               
                }

        case Toggle.Toggle_user_request_user_longitude :
            return {...state,
                user_request_user_longitude:action.user_request_user_longitude,               
                }

        case Toggle.Toggle_user_request_user_pincode :
            return {...state,
                user_request_user_pincode:action.user_request_user_pincode,               
                }

        case Toggle.Toggle_user_request_user_countryName :
            return {...state,
                user_request_user_countryName:action.user_request_user_countryName,               
                }

        case Toggle.Toggle_user_request_user_district :
            return {...state,
                user_request_user_district:action.user_request_user_district,               
                }      

        case Toggle.Toggle_user_request_user_state_name :
            return {...state,
                user_request_user_state_name:action.user_request_user_state_name,               
                }

        case Toggle.Toggle_user_request_user_city :
            return {...state,
                user_request_user_city:action.user_request_user_city,               
                }

        case Toggle.Toggle_user_request_address_line1 :
            return {...state,
                user_request_address_line1:action.user_request_address_line1,               
                }

        case Toggle.Toggle_user_proof_status :
            return {...state,
                user_proof_status:action.user_proof_status,               
                }

        case Toggle.Toggle_admin_comments :
            return {...state,
                admin_comments:action.admin_comments,               
                }

        case Toggle.Toggle_user_Id :
            return {...state,
                user_Id:action.user_Id,               
                }

        case Toggle.Toggle_user_Proof_Select :
            return {...state,
                user_Proof_Select:action.user_Proof_Select,               
                }
        case Toggle.Toggle_user_bood_request_raised :
		    return {...state,
			    user_bood_request_raised:action.user_bood_request_raised,               
			}
        case Toggle.Toggle_user_bood_donated :
            return {...state,
                user_bood_donated:action.user_bood_donated,               
                }

        case Toggle.Toggle_user_pincode :
            return {...state,
                user_pincode:action.user_pincode,               
                }
        case Toggle.Toggle_user_longitude :
            return {...state,
                 user_longitude:action.user_longitude,               
                }
        case Toggle.Toggle_user_latitude :
		    return {...state,
			    user_latitude:action.user_latitude,               
            }
            
        case Toggle.Toggle_user_state_name :
            return {...state,
                user_state_name:action.user_state_name,               
			}
       
        case Toggle.Toggle_user_area :
		    return {...state,
			    user_area:action.user_area,               
		    }
        
        case Toggle.Toggle_user_city :
            return {...state,
                user_city:action.user_city,               
            }                

        case Toggle.Toggle_user_address_line1 :
            return {...state,
                user_address_line1:action.user_address_line1,               
            }

        case Toggle.Toggle_user_Proof :
            return {...state,
                    user_Proof:action.user_Proof,               
            }
            
        case Toggle.Toggle_user_Confermation :
		    return {...state,
			    user_Confermation:action.user_Confermation,               
            }
            
        case Toggle.Toggle_user_DOB :
	        return {...state,
		        user_DOB:action.user_DOB,               
	    }         
        case Toggle.Toggle_user_name :
            return {...state,
                user_name:action.user_name,               
            }

        case Toggle.Toggle_user_first_name :
            return {...state,
                user_first_name:action.user_first_name,               
            }

        case Toggle.Toggle_user_last_name :
            return {...state,
                user_last_name:action.user_last_name,               
            }

        case Toggle.Toggle_user_number:
            return {...state,
                user_number:action.user_number,               
            }
        
        case Toggle.Toggle_user_email :
        return {...state,
            user_email:action.user_email,               
        }
     
        case Toggle.Toggle_isUserImageAvailable :
            return {...state,
                isUserImageAvailable:action.isUserImageAvailable,               
            }
						
        case Toggle.Toggle_user_BloodGroup :
            return {...state,
                user_BloodGroup:action.user_BloodGroup,               
            }	
            
        case Toggle.Toggle_user_Gender :
            return {...state,
                user_Gender:action.user_Gender,               
            } 
        
        case Toggle.Toggle_user_sos_name1 :
            return {...state,
                user_sos_name1:action.user_sos_name1,               
                }
  
        default:
            return state;
      }
    }
    

export default helponeReducer;