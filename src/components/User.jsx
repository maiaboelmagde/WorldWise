import { useAuth } from "../context/FakeAuthContext";
import styles from "./User.module.css";
import Spinner from "./Spinner"
import { useNavigate } from "react-router-dom";
// const FAKE_USER = {
//   name: "Jack",
//   email: "jack@example.com",
//   password: "qwerty",
//   avatar: "https://i.pravatar.cc/100?u=zz",
// };

function User() {
  const { user, userIsLoading, logout } = useAuth();
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
    logout();
  }

  return (
    userIsLoading ? <Spinner></Spinner> :
      <div className={styles.user}>
        <img src={user.avatar} alt={user.name} />
        <span>Welcome, {user.name}</span>
        <button onClick={handleClick}>Logout</button>
      </div>
  );
}

export default User;
