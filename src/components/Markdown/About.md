# О программе
metadata-auth-proxy, это прокси-сервер для авторизации и маршрутизации запросов к Couchdb, а так же, набор инструментов для администрирования пользователей, абонетов и отделов абонентов 

### Использованы следующие библиотеки и инструменты:

#### Серверная часть
- [CouchDB](http://couchdb.apache.org/), NoSQL база данных с поддержкой master-master репликации
- [Nginx](http://nginx.org/ru/), высокопроизводительный HTTP-сервер
- [NodeJS](https://nodejs.org/en/), JavaScript runtime built on Chrome`s V8 JavaScript engine
- [Passport](https://github.com/jaredhanson/passport), библиотеки LDAP и oAuth авторизации

#### Управление данными в памяти браузера
- [Metadata.js](https://github.com/oknosoft/metadata.js/tree/develop/packages), движок ссылочной типизации для браузера и Node.js
- [PouchDB](https://pouchdb.com/), клиентская NoSQL база данных с поддержкой автономной работы и репликации с CouchDB
- [AlaSQL](https://github.com/agershun/alasql), SQL-интерфейс к массивам javascript в памяти браузера и Node.js
- [Redux](https://github.com/reactjs/redux), диспетчер состояния веб-приложения

#### UI библиотеки и компоненты интерфейса
- [Material-ui](https://material-ui.com/), компоненты UI в стиле Google`s material design
- [React virtualized](https://github.com/bvaughn/react-virtualized), компоненты для динамических списков
- [React data grid](https://github.com/adazzle/react-data-grid), React компонент табличной части
- [Moment.js](http://momentjs.com/), библиотека форматирования интервалов и дат
- [React-markdown](https://github.com/OpusCapita/react-markdown), редактор markdown

### Лицензия
Коммерческая лицензия Окнософт

### Вопросы
Если обнаружили ошибку, пожалуйста, зарегистрируйте <a href="https://github.com/oknosoft/metadata-auth-proxy/issues" target="_blank" rel="noopener noreferrer">вопрос в GitHub</a> или <a href="mailto:info@oknosoft.ru?subject=auth-proxy">свяжитесь с авторами</a> напрямую
