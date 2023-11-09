// создаем общий класс
export class BaseApi {
    // передаем объект опций
  constructor(options) {
    this._baseUrl = options.baseUrl;  // сразу выделяем базовый урл и хэдеры
    this._headers = options.headers;
  }

  // прописываем универсальный метод запроса с проверкой ответа
  _request(endpoint, params) {
    // сразу базовый урл прописываем 1 раз тут, а в методы передаются только эндпоинты
    return fetch(`${this._baseUrl}${endpoint}`, params).then(this._checkResponse);
  }

  // метод проверки на `ok`
  _checkResponse(response) {
    return response.ok
      ? response.json()
      : Promise.reject(`Ошибка: ${response.status}`);
  }
}



