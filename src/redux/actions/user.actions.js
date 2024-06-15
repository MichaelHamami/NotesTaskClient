export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';

export const addUser = data => ({
  type: ADD_USER,
  payload: data,
});

export const deleteUser = () => ({
  type: DELETE_USER,
});
