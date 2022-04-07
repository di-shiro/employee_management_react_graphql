import React, { useState, useEffect } from "react";
import styles from "./Auth.module.css";
import { GET_TOKEN, CREATE_USER } from "../queries";
import { useMutation } from "@apollo/client";
import jwtDecode from "jwt-decode";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [getToken] = useMutation(GET_TOKEN);
  const [createUser] = useMutation(CREATE_USER);
  const [isLogin, setIsLogin] = useState(true);

  const authUser = async (e) => {
    // この関数は <form onSubmit={authUser}> として、formタグ内で使うので、
    // この関数が onSubmit で実行された際に Browser がリフレッシュされてしまう。
    // これを防ぐために、preventDefaultを行う
    e.preventDefault();
    if (isLogin) {
      try {
        const result = await getToken({
          variables: { username: username, password: password },
        });
        localStorage.setItem("token", result.data.tokenAuth.token);
        result.data.tokenAuth.token && (window.location.href = "/employees");
      } catch (err) {
        alert(err.message);
      }
    } else {
      try {
        await createUser({
          variables: { username: username, password: password },
        });
        const result = await getToken({
          variables: { username: username, password: password },
        });
        localStorage.setItem("token", result.data.tokenAuth.token);
        result.data.tokenAuth.token && (window.location.href = "/employees");
      } catch (err) {
        alert(err.message);
      }
    }
  };

  useEffect(() => {
    // 次の3パターンの処理を記載する。
    // 1) LocalStorage内にTokenが存在する & 有効期限内
    // 2) 〃           & 期限切れ
    // 3) Tokenが存在しない
    if (localStorage.getItem("token")) {
      const decodedToken = jwtDecode(localStorage.getItem("token"));
      // decodedToken(jwtDecode)には、時間が「秒」単位で格納されている。1970.1.1〜有効期限まで秒単位でカウントした時間。
      // 一方で、Date.now()では時間が「ミリ秒」単位で出力される。1970.1.1〜この処理の瞬間まで、ミリ秒単位でカウントした時間。
      // どちらも「1970年1月1日」から数えた時間。decodeTokenは秒単位なので1000倍してミリ秒単位に単位を揃えている。
      if (decodedToken.exp * 1000 < Date.now()) {
        // 期限切れの場合
        localStorage.removeItem("token");
      } else {
        // 有効期限内の場合
        window.location.href = "/employees";
      }
      // localStorageがない場合、Auth.jsにとどまれば良いので、何もしない。
    }
  }, []);

  return (
    <div className={styles.auth}>
      <form onSubmit={authUser}>
        <div className={styles.auth__input}>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.auth__input}>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">
          {isLogin ? "Login with JWT" : "Create new user"}
          {` [ isLogin = ${isLogin} ]`}
        </button>
        <div>
          <FlipCameraAndroidIcon
            className={styles.auth__toggle}
            onClick={() => setIsLogin(!isLogin)}
          />
        </div>
      </form>
    </div>
  );
};

export default Auth;
