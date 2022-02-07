import { createSelector } from 'reselect';

const usersSelector = (state) => state.users;

export const getIsSignedIn  = createSelector(
  [usersSelector],
  state => state.isSignedIn
)
export const getProductsInBookMark  = createSelector(
  [usersSelector],
  state => state.bookmark
)
export const getUseId  = createSelector(
  [usersSelector],
  state => state.uid
)
export const getUsename  = createSelector(
  [usersSelector],
  state => state.username
)
