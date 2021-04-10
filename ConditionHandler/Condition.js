export const profilename=(val)=>{
    if(val.length === 0) {
        return false;
    }
    return true;
}

export const user_number=(val)=>{
    if(val.length === 10) {
        return true;
    }
    return false;
}
export const userpincode=(val)=>{
    if(val.length === 6) {
        return true;
    }
    return false;
}