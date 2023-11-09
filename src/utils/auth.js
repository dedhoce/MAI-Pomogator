import { BaseApi } from "./BaseApi";

class Auth extends BaseApi {

    checkUserToken(localJWT) {
        return this._request('/users/me', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localJWT}`
            }      
        })
    }

    regisrationNewUser({email, password}) {
        return this._request('/signup', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password,
                email
            })
        })
    }     
    
    getUserToken({email, password}) {
        return this._request('/signin', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password,
                email
            })
        })        
    }

}  
  const auth = new Auth({
    baseUrl: "https://auth.nomoreparties.co",
    headers: {      
      "Content-Type": "application/json",
    },
  });
  
  export default auth
  
  
  
  
  