import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const { user } = useSelector((state) => state.auth);

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setAuth(true);

    } else {
      setAuth(false);
    }

    setLoading(false);

  }, [user]);

  // admin user

  useEffect(() => {
    if (user && user.user.role === 1) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }

    setLoading(false);
  }, [user, admin]);

  return { auth, admin, loading };
}