import * as React from 'react';

import { Routes } from '@mapbul-pub/ui';
import PostIcon from '@material-ui/icons/Book';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from './ra-data-json-server';

import {
   Dashboard,
   ArticleList,
   ArticleEdit,
   ArticleCreate,
   ArticleShow,
   CategoryList,
   CategoryShow,
   CategoryEdit,
   CategoryCreate,
   StatusList,
   StatusEdit,
   StatusCreate,
   MarkerList,
   MarkerEdit,
   MarkerCreate,
   CityList,
   CityEdit,
   CityCreate,
   CountryList,
   CountryEdit,
   CountryCreate
} from 'pages';

import authProvider from './authProvider';
import { GlobalVar } from 'src/constants';

import { createBrowserHistory } from 'history';
// const history = createBrowserHistory({ basename: '/12' });
const history = createBrowserHistory();

const App = () => (
   <Admin
      title="Admin panel"
      dataProvider={jsonServerProvider(GlobalVar.env.baseUrl)}
      authProvider={authProvider}
      dashboard={Dashboard}
      // history={history}
   >
      <Resource
         name={Routes.articles}
         icon={PostIcon}
         list={ArticleList}
         edit={ArticleEdit}
         create={ArticleCreate}
         //show={ArticleShow}
      />
      <Resource
         name={Routes.categories}
         //icon={UserIcon}
         list={CategoryList}
         edit={CategoryEdit}
         create={CategoryCreate}
      />
      <Resource
         name={Routes.statuses}
         //icon={UserIcon}
         list={StatusList}
         edit={StatusEdit}
         create={StatusCreate}
      />
      <Resource
         name={Routes.markers}
         //icon={UserIcon}
         list={MarkerList}
         edit={MarkerEdit}
         create={MarkerCreate}ß
      />
      <Resource
         name={Routes.cities}
         //icon={UserIcon}
         list={CityList}
         edit={CityEdit}
         create={CityCreate}
      />
      <Resource
         name={Routes.countries}
         //icon={UserIcon}
         list={CountryList}
         edit={CountryEdit}
         create={CountryCreate}
      />
   </Admin>
);
export default App;
