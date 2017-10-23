import {LOAD_CATEGORIES} from '../actions/category.actions';


const loadCategories = ({categories})=>([
  ...categories
]);

const reducer = {
  [LOAD_CATEGORIES]: loadCategories
};

export default (state=[], {type, ...data})=>
  reducer[type] ? reducer[type](data) : state;
