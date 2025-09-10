import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../context/userContext";
import { loginUser, loginGoogleBuyer } from "../api/api-auth";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { AuthSchema } from "../formSchemaValidation/AuthSchema";
import Loader from "../components/Loader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = AuthSchema.safeParse({ email, password });

      if (!result.success) {
        const fieldErrors = {};
        result.error.issues.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setErrors({});

      const data = await loginUser(email, password);

      if (!data) {
        toast("Error logging in...");
        setEmail("");
        setPassword("");
        setLoading(false);
      } else {
        setUser(data);
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handelGoogleLogin = async (google_token) => {
    try {
      setLoading(true);

      const data = await loginGoogleBuyer(google_token);

      console.log(data);
      

      if (!data) {
        toast("Error logging in...");
        setEmail("");
        setPassword("");
        setLoading(false);
      } else {
        setUser(data);
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="you@example.com"
            />
          </div>

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="••••••••"
            />
          </div>

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}

          <Button onClick={handleLogin} className="w-full hover:cursor-pointer">
            Login
          </Button>

          <div className="flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="text-xs text-gray-500">or</span>
            <Separator className="flex-1" />
          </div>

          <Button className="w-full hover:cursor-pointer">
            <Link to={"/seller-sign-up"}>Create a Seller Account</Link>
          </Button>

          <GoogleLogin
            onSuccess={(credential) => {
              handelGoogleLogin(credential.credential);
            }}
            onError={(err) => {
              setLoading(false);
              toast("Something went wrong!");
              console.error(err.message);
            }}
            width={400}
          ></GoogleLogin>
        </CardContent>

        <CardFooter className="text-sm mx-auto text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline ml-1">
            Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
