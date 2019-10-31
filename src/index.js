
import React from 'react';
import PropTypes from 'prop-types';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// метод инициализации хранилища состояния приложения
import {history, store} from './redux';

// метод для вычисления need_meta, need_user для location.pathname
import {item_props} from './components/App/menu_items';

// заставка "загрузка занных"
//import DumbScreen from './components/DumbScreen';

// корневыой контейнер приложения
import AppView from './components/App';

// дополняем-переопределяем тему оформления
import theme from './styles/muiTheme';

// типовой RootView, в котором подключается Router и основной макет приложения
import RootView from 'metadata-react/App/RootView';

// sw для оффлайна и прочих дел
import * as serviceWorker from './serviceWorker';

class RootProvider extends React.Component {

  componentDidMount() {
    // font-awesome, roboto и стили metadata подгрузим асинхронно
    import('./styles/global.css');
    import('metadata-react/styles/roboto/font.css');
    import('metadata-react/styles/react-data-grid.css');
    import('font-awesome/css/font-awesome.min.css');

    // скрипт инициализации структуры метаданных и модификаторы
    import('./metadata')
      .then((module) => module.init(store));
  }

  getChildContext() {
    return {store};
  }

  render() {
    return <Provider store={store}>
      <RootView
        history={history}
        item_props={item_props}
        theme={theme}
        AppView={AppView}
      />
    </Provider>;
  }
}

RootProvider.childContextTypes = {
  store: PropTypes.object,
};

render(<RootProvider/>, document.getElementById('root'));

serviceWorker.register({
  onUpdate() {
    $p && $p.record_log('Доступен новый контент, обновите страницу');
  }
});
