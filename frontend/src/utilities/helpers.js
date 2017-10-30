import uuidv4 from 'uuid/v4';

export const generateId = ()=>uuidv4();

export const generateTimeStamp = ()=>Date.now();

export const stringFormFieldRequired = (field)=>
  field !== undefined && field !== null && field !== '';

export const doesExist = (item)=>item!== null && item!== undefined;
