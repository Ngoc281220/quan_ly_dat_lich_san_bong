import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verify } from "../../services/website/auth";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Đang xác thực email...");
  const navigate = useNavigate();

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
          navigate('/account')
          // setMessage(response.data.message);
        }
      } catch (error) {
        setMessage(error?.errors || "Xác thực thất bại!");
      }
    };
    apiVerify();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{message}</h2>
    </div>
  );
}

export default VerifyEmail;
