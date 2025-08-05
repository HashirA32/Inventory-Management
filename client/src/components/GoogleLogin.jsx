import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { auth, provider } from "./Helpers/Firebase";
import { signInWithPopup } from "firebase/auth";
import { email } from "zod";
import { getEnv } from "./Helpers/getEnv";
import { showToast } from "./Helpers/ShowToast";
import { RouteIndex } from "./Helpers/RouteNames";
import { useNavigate } from "react-router-dom";
const GoogleLogin = () => {
  const navigate = useNavigate();
  const HandleLogin = async () => {
    try {
      const googleResponce = await signInWithPopup(auth, provider);
      const user = googleResponce.user;
      const bodyData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/google-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(bodyData),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.message);
        return;
      }

      showToast("success", data.message);
      navigate(RouteIndex);
    } catch (error) {
      showToast("error", error.message);
    }
    console.log(googleResponce);
  };
  return (
    <Button onClick={HandleLogin} className="w-full" variant="outline">
      <FcGoogle />
      Continue With Google
    </Button>
  );
};

export default GoogleLogin;
