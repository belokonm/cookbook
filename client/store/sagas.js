import { all, fork } from "redux-saga/effects";

import { watcherForgotPasswordSaga } from "../features/authentication/forgot-password/sagas";
import { watcherSignInSaga } from "../features/authentication/sign-in/sagas";
import { watcherSignUpSaga } from "../features/authentication/sign-up/sagas";
import { watcherGetRecipesSaga } from "../features/recipes/sagas";
import { watcherGenerateRecipesSaga } from "../features/recipes/sagas";
import { watcherGetProfileSaga } from "../features/profile/sagas";
import { watcherUpdateProfilePreferencesSaga } from "../features/profile/preferences/sagas";
import { watcherUpdateProfileFavoriteSaga } from "../features/profile/favorites/sagas";

export default function* root() {
  yield all([
    fork(watcherForgotPasswordSaga),
    fork(watcherSignInSaga),
    fork(watcherSignUpSaga),
    fork(watcherGetRecipesSaga),
    fork(watcherGenerateRecipesSaga),
    fork(watcherGetProfileSaga),
    fork(watcherUpdateProfilePreferencesSaga),
    fork(watcherUpdateProfileFavoriteSaga)
  ]);
}
