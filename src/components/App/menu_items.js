import React from 'react';

//import IconChart from '@material-ui/icons/InsertChart';
//import IconDoc from '@material-ui/icons/EventNote';
//import IconHelp from '@material-ui/icons/Help';
import IconInfo from '@material-ui/icons/Info';
import IconBuild from '@material-ui/icons/Build';
import IconColor from '@material-ui/icons/ColorLens';
import IconPerson from '@material-ui/icons/Person';
import IconSettings from '@material-ui/icons/Settings';
import IconBusiness from '@material-ui/icons/Business';
import IconPeople from '@material-ui/icons/People';
import IconRouter from '@material-ui/icons/Router';
import IconBusinessCenter from '@material-ui/icons/BusinessCenter';
import IconDeviceHub from '@material-ui/icons/DeviceHub';
import IconContactPhone from '@material-ui/icons/ContactPhone';

export const stitle = 'auth-proxy';
export const htitle = 'Администрирование пользователей';
export const ltitle = 'Пользователи абонентов';
export const description = 'Администрирование пользователей и отделов абонентов';

const items = [
  {
    text: 'Серверы',
    id: 'cat_servers',
    navigate: '/cat.servers/list',
    need_meta: true,
    need_user: true,
    icon: <IconRouter/>,
  },
  {
    text: 'Абоненты',
    id: 'cat_abonents',
    navigate: '/cat.abonents/list',
    need_meta: true,
    need_user: true,
    icon: <IconBusiness/>,
  },
  {
    text: 'Отделы абонентов',
    id: 'cat_branches',
    navigate: '/cat.branches/list',
    need_meta: true,
    need_user: true,
    icon: <IconPeople/>,
  },
  {
    text: 'Пользователи',
    id: 'cat_users',
    navigate: '/cat.users/list',
    need_meta: true,
    need_user: true,
    icon: <IconPerson/>,
  },
  {
    text: 'Организации',
    id: 'cat_organizations',
    navigate: '/cat.organizations/list',
    need_meta: true,
    need_user: true,
    icon: <IconBusinessCenter/>,
  },
  {
    text: 'Подразделения',
    id: 'cat_divisions',
    navigate: '/cat.divisions/list',
    need_meta: true,
    need_user: true,
    icon: <IconDeviceHub/>,
  },
  {
    text: 'Контрагенты',
    id: 'cat_partners',
    navigate: '/cat.partners/list',
    need_meta: true,
    need_user: true,
    icon: <IconContactPhone/>,
  },
  {
    text: 'Цвета',
    id: 'cat_clrs',
    navigate: '/cat.clrs/list',
    need_meta: true,
    need_user: true,
    icon: <IconColor/>,
  },
  {
    divider: true,
  },
  {
    text: 'Метаданные',
    id: 'designer',
    navigate: '/designer',
    need_meta: true,
    need_user: true,
    icon: <IconBuild/>,
  },
  // {
  //   divider: true,
  // },
  // {
  //   text: 'Движение денег',
  //   id: 'rep_cash_moving',
  //   navigate: '/rep.cash_moving/main',
  //   need_meta: true,
  //   need_user: true,
  //   icon: <IconChart/>,
  // },
  {
    divider: true,
  },
  {
    text: 'Настройки',
    navigate: '/settings',
    need_meta: true,
    icon: <IconSettings/>,
  },
  {
    text: 'О программе',
    navigate: '/about',
    icon: <IconInfo/>
  }
];

function path_ok(path, item) {
  const pos = item.navigate && item.navigate.indexOf(path);
  return pos === 0 || pos === 1;
}

function with_recursion(path, parent) {
  if(path && path != '/'){
    for(const item of parent){
      const props = item.items ? with_recursion(path, item.items) : path_ok(path, item) && item;
      if(props){
        return props;
      }
    }
  }
}

export function item_props(path) {
  if(!path){
    path = location.pathname;
  }
  if(path.endsWith('/')) {
    path = path.substr(0, path.length - 1);
  }
  // здесь можно переопределить нужность meta и авторизованности для корневой страницы
  let res = with_recursion(path, items);
  if(!res && path.indexOf('/') !== -1) {
    res = with_recursion(path.substr(0, path.lastIndexOf('/')), items);
  }
  if(!res && path.match(/\/(doc|cat|ireg|cch|rep)\./)){
    res = {need_meta: true, need_user: true};
  }
  return res || {};
}

export default items;
