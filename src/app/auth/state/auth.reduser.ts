import { createReducer, on } from '@ngrx/store';
import { loginSuccess, signupSuccess } from './auth.actions';
import { initialState } from './auth.state';

const _authReduser = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(signupSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  })
);

export function authReduser(state: any, action: any) {
  return _authReduser(state, action);
}
