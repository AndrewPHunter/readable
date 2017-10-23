import uuidv4 from 'uuid/v4';

export const generateId = ()=>uuidv4();

export const generateTimeStamp = ()=>Date.now();
