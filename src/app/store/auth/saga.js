import { put, takeLatest } from "redux-saga/effects";
// import { all, put, takeEvery, call } from "redux-saga/effects";
import { actions, actionTypes } from "./action";
import AuthRepository from "../../repositories/auth/authRepository";
import ConfigurationRepository from "../../repositories/configuration/configurationRepository";
import AppConsts from "./../../config/appconst";
import Utils from "../../utils/utils";

const abp = window.abp;

function* loginSaga({ payload }) {
  var tokenExpireDate = payload.rememberMe
    ? new Date(new Date().getTime() + 1000 * payload.expireInSeconds)
    : undefined;
  abp.auth.setToken(payload.accessToken, tokenExpireDate);
  abp.utils.setCookieValue(
    AppConsts.authorization.encrptedAuthTokenName,
    payload.encryptedAccessToken,
    tokenExpireDate,
    abp.appPath
  );
  sessionStorage.setItem("rememberMe", payload.rememberMe ? "1" : "0");

  yield put(actions.requestConfiguration());
  yield put(actions.requestUser());
}

function* userRequested() {
  try {
    const result = yield AuthRepository.getCurrentLoginInformations();
    console.log(result);
    yield put(actions.setUser(result));
  } catch (error) {
    console.log(error);
  }
}

function* configurationRequested() {
  try {
    const result = yield ConfigurationRepository.getAll();
    yield put(actions.setConfiguration(result));
    Utils.extend(true, abp, result);
    abp.clock.provider = Utils.getCurrentClockProvider(result.clock.provider);
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(actionTypes.Login, loginSaga);
  yield takeLatest(actionTypes.UserRequested, userRequested);
  yield takeLatest(actionTypes.ConfigurationRequested, configurationRequested);
}
