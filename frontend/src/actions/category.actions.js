import {getCategories} from '../utilities/api';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

const loadCategoriesSuccess = (categories)=>(
  {
    type: LOAD_CATEGORIES,
    categories
  }
);

export const loadCategories = ()=>(dispatch)=>
  getCategories()
    .then(categories=>dispatch(loadCategoriesSuccess(categories)));

