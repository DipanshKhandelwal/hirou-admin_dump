import { increaseCounter, decreaseCounter } from '../actions/App';
import store from '../index';

const { dispatch } = store;

export const dispatchIncreaseCounter = () =>
  dispatch(increaseCounter());

export const dispatchDecreaseCounter = () =>
  dispatch(decreaseCounter());
