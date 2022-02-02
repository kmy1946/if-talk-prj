import { createSelector } from 'reselect';

const usersSelector = (state) => state.users;

export const getIsSignedIn  = createSelector(
  [usersSelector],
  state => state.IsSignedIn
)
export const getUseId  = createSelector(
  [usersSelector],
  state => state.uid
)
export const getUsename  = createSelector(
  [usersSelector],
  state => state.username
)
