import { takeLatest, call, put as sagaPut } from "redux-saga/effects";

import {
  UPDATE_PROFILE_FAVORITE_REQUEST,
  UPDATE_PROFILE_FAVORITE_SUCCESS,
  UPDATE_PROFILE_FAVORITE_FAILURE
} from "./actions";
import { put } from "../../../helpers/api-helper";
import {
  START_LOADING,
  STOP_LOADING
} from "../../../components/loading/actions";

export function* watcherUpdateProfileFavoriteSaga() {
  yield takeLatest(
    UPDATE_PROFILE_FAVORITE_REQUEST,
    workerUpdateProfileFavoriteSaga
  );
}

function* workerUpdateProfileFavoriteSaga({ payload }) {
  try {
    yield call(() => startLoading());
    const { data } = yield call(() =>
      put("users/favorites", { favorite: payload.favorite })
    );
    yield sagaPut({
      type: UPDATE_PROFILE_FAVORITE_SUCCESS,
      payload: { profile: data }
    });
  } catch (error) {
    yield sagaPut({
      type: UPDATE_PROFILE_FAVORITE_FAILURE,
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
