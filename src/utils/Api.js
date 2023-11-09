import { BaseApi } from "./BaseApi";

class Api extends BaseApi{ 

  getUserInfo() {    
    return this._request('/users/me', {
      headers: this._headers      
    })                
  }  

  pushUserInfo({name, about}) {    
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })    
  }

  pushAvatar({avatar}) {
    console.log(avatar)        
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar        
      })
    })     
  }

  getInitialCards() {    
    return this._request('/cards', {
      headers: this._headers      
    })                
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers      
    })    
  }

  pushInfoCreateCard({name, url}) {    
    return this._request('/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: url         
      })
    })    
  }  

  _likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers      
    })      
  }

  _deleteLikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers      
    })    
  }

  changeLikeCardStatus(cardId, likeStatus) {
    if(likeStatus) {
      return this._likeCard(cardId)
    }
    return this._deleteLikeCard(cardId)
  } 
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-75",
  headers: {
    authorization: "6a605e63-1774-4c5f-989e-07adc5e69a71",
    "Content-Type": "application/json",
  },
});

export default api




