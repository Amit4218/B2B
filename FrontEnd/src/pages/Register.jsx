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
import { registerUser } from "../api/api-auth";
import Loader from "../components/Loader";
import { GoogleLogin } from "@react-oauth/google";
import { AuthSchema } from "../formSchemaValidation/AuthSchema";
import { loginGoogleBuyer } from "../api/api-auth";
import { toast } from "sonner";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
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

      const data = await registerUser(email, password);
      if (data != null && data != undefined) {
        setUser(data);
      }
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handelGoogleRegister = async (google_token) => {
    try {
      setLoading(true);

      const data = await loginGoogleBuyer(google_token);

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
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Register
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

          <Button
            onClick={handleRegister}
            className="w-full hover:cursor-pointer"
          >
            Register
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
              handelGoogleRegister(credential.credential);
            }}
            onError={(err) => {
              setLoading(false);
              toast("Something went wrong!");
              console.error(err.message);
            }}
            width={400}
          ></GoogleLogin>
        </CardContent>

        <CardFooter className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline ml-1">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
