import { takeLatest, call, put } from "redux-saga/effects";

import {
  GET_RECIPES_FAILURE,
  GET_RECIPES_SUCCESS,
  GET_RECIPES_REQUEST,
  GENERATE_RECIPES_REQUEST,
  GENERATE_RECIPES_SUCCESS,
  GENERATE_RECIPES_FAILURE
} from "./actions";

import { get } from "../../helpers/api-helper";
import { START_LOADING, STOP_LOADING } from "../../components/loading/actions";

export function* watcherGetRecipesSaga() {
  yield takeLatest(GET_RECIPES_REQUEST, workerGetRecipesSaga);
}

function* workerGetRecipesSaga() {
  try {
    yield call(() => startLoading());

    const { data } = yield call(() => get("recipes"));

    yield put({
      type: GET_RECIPES_SUCCESS,
      payload: { recipes: data }
    });
  } catch (error) {
    yield put({ type: GET_RECIPES_FAILURE, payload: { error: error.message } });
  } finally {
    yield call(() => stopLoading());
  }
}

export function* watcherGenerateRecipesSaga() {
  yield takeLatest(GENERATE_RECIPES_REQUEST, workerGenerateRecipesSaga);
}

function* workerGenerateRecipesSaga() {
  try {
    yield call(() => startLoading());

    const { data } = yield call(() => get("recipes/generate"));

    yield put({
      type: GENERATE_RECIPES_SUCCESS,
      payload: { recipes: data }
    });
  } catch (error) {
    yield put({
      type: GENERATE_RECIPES_FAILURE,
      payload: { error: error.message }
    });
  } finally {
    yield call(() => stopLoading());
  }
}

function* startLoading() {
  yield put({
    type: START_LOADING
  });
}
function* stopLoading() {
  yield put({
    type: STOP_LOADING
  });
}
