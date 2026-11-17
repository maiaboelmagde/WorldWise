import { useEffect, useRef } from 'react'
import styles from './AppLayout.module.css'
import Sidebar from '../components/Sidebar'
import Map from '../components/Map'
import CitiesProvider from '../context/CitiesContext'
import { useAuth } from '../context/FakeAuthContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import SpinnerFullPage from '../components/SpinnerFullPage'

export default function AuthedLayout() {
  const nav = useNavigate();
  const { isAuthed, userIsLoading, userError } = useAuth();
  const wasAuthed = useRef(false);

 useEffect(() => {
    if (isAuthed) wasAuthed.current = true;
  }, [isAuthed]);

  useEffect(() => {
    if (userIsLoading || isAuthed) return;

    if (wasAuthed.current) {
      nav("/", { replace: true });
      toast.success("You are logged out", { id: "logout" });
    } else {
      toast.error("You must log in first", { id: "auth-required" });
      nav("/login", { replace: true });
    }
  }, [isAuthed, userIsLoading, nav]);

  useEffect(() => {
    if (userError) {
      toast.error(userError)
    }
  }, [userError]);

  if (userIsLoading) return <SpinnerFullPage />;
  if (!isAuthed) return null;
  return (
    userIsLoading ? <SpinnerFullPage />
      : isAuthed ?
        <CitiesProvider>
          <div className={`${styles.app} ${styles.AuthedLayout}`}>
            <Sidebar />
            <Map />
          </div>
        </CitiesProvider>
        : <p>{toast.error("You Must Auth First")}</p>
  )
}
