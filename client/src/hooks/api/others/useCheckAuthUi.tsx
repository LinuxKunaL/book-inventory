import { useEffect, useState } from "react";
import { jwtDecode, type JwtPayload } from "jwt-decode";

type DecodeType = JwtPayload & {
  studentId?: string;
  adminId?: string;
};

function useCheckAuthUi() {
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [isStudentLogin, setIsStudentLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode: DecodeType = jwtDecode(token);

      if (decode?.studentId) {
        setIsStudentLogin(true);
      }
      if (decode?.adminId) {
        setIsAdminLogin(true);
      }

      if (decode?.exp && decode.iat) {
        const createdAt = new Date(decode.iat * 1000);
        const expiresAt = new Date(decode.exp * 1000);

        console.log("Token created at:", createdAt.toISOString());
        console.log("Token expires at:", expiresAt.toISOString());
        

        if (expiresAt < new Date() || createdAt > new Date()) {
          setIsAdminLogin(false);
          setIsStudentLogin(false);
          localStorage.removeItem("token");
        }
      }
    } else {
      setIsAdminLogin(false);
      setIsStudentLogin(false);
    }
  }, []);

  return {
    isAdminLogin,
    isStudentLogin,
  };
}

export default useCheckAuthUi;
