import { takeLatest, call, put as sagaPut } from "redux-saga/effects";

import {
  UPDATE_PROFILE_PREFERENCES_REQUEST,
  UPDATE_PROFILE_PREFERENCES_SUCCESS,
  UPDATE_PROFILE_PREFERENCES_FAILURE
} from "./actions";
import { put } from "../../../helpers/api-helper";
import {
  START_LOADING,
  STOP_LOADING
} from "../../../components/loading/actions";

export function* watcherUpdateProfilePreferencesSaga() {
  yield takeLatest(
    UPDATE_PROFILE_PREFERENCES_REQUEST,
    workerUpdateProfilePreferencesSaga
  );
}

function* workerUpdateProfilePreferencesSaga({ payload }) {
  try {
    yield call(() => startLoading());
    const { data } = yield call(() =>
      put("users/preferences", payload.preferences)
    );
    yield sagaPut({
      type: UPDATE_PROFILE_PREFERENCES_SUCCESS,
      payload: { profile: data }
    });
  } catch (error) {
    yield sagaPut({
      type: UPDATE_PROFILE_PREFERENCES_FAILURE,
      payload: { error: error.message }
    });
  } finally {
    yield call(() => stopLoading());
  }
}

function* startLoading() {
  yield sagaPut({
    type: START_LOADING
  });
}
function* stopLoading() {
  yield sagaPut({
    type: STOP_LOADING
  });
}
