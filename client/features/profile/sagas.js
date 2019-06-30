import { takeLatest, call, put } from "redux-saga/effects";

import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE
} from "./actions";
import { get } from "../../helpers/api-helper";
import { START_LOADING, STOP_LOADING } from "../../components/loading/actions";

export function* watcherGetProfileSaga() {
  yield takeLatest(GET_PROFILE_REQUEST, workerGetProfileSaga);
}

function* workerGetProfileSaga() {
  try {
    yield call(() => startLoading());
    const { data } = yield call(() => get("users"));

    yield put({ type: GET_PROFILE_SUCCESS, payload: { profile: data } });
  } catch (error) {
    yield put({
      type: GET_PROFILE_FAILURE,
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
