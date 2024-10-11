import * as Constant from 'MyConstants';

export const getTaskTypeByValue = value => {
  return Object.keys(Constant.TASK_TYPE).find(key => Constant.TASK_TYPE[key] === value);
};
