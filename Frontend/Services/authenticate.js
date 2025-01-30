export function verify(email,password) {
    if(email === 'atharva@gmail' && password === '1234') {
        return true;
    }
   
else if(email === 'pranjal@gmail' && password === '1234') {
            return true;
}
else if(email === 'parthavi@gmail' && password === '1234') {
    return true;
    }
    else {
        return false;
    }
}  