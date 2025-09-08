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
import { registerGoogleSeller, registerSeller } from "../api/api-auth";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import Loader from "../components/Loader";
import { AuthSchema } from "../formSchemaValidation/AuthSchema";

export default function SellerSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSellerRegister = async (e) => {
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

      const data = await registerSeller(email, password);
      if (data != null && data != undefined) {
        setUser(data);
      }
      setEmail("");
      setPassword("");
      navigate("/seller-details");
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handelgoogleSellerRegister = async (google_token) => {
    try {
      setLoading(true);

      const data = await registerGoogleSeller(google_token);

      if (!data) {
        toast("Error registering ...");
        setEmail("");
        setPassword("");
        setLoading(false);
      } else {
        setUser(data);
        setEmail("");
        setPassword("");
        navigate("/seller-details");
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
            Register as a seller
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
            onClick={handleSellerRegister}
            className="w-full hover:cursor-pointer"
          >
            Register
          </Button>

          <div className="flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="text-xs text-gray-500">or</span>
            <Separator className="flex-1" />
          </div>

          <GoogleLogin
            onSuccess={(credential) => {
              handelgoogleSellerRegister(credential.credential);
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
