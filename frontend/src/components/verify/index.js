import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { verify } from "../../services/website/auth";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Đang xác thực email...");

  useEffect(() => {
    const token = searchParams.get("token");
    const apiVerify = async () => {
      if (!token) {
        setMessage("Token không hợp lệ!");
        return;
      }
      try {
        const response = await verify(token);
        if (response) {
          setMessage(response.data.message);
        }
      } catch (error) {
        setMessage(error.response?.data?.message || "Xác thực thất bại!");
      }
    };
    apiVerify();
  }, [searchParams]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{message}</h2>
    </div>
  );
}

export default VerifyEmail;
