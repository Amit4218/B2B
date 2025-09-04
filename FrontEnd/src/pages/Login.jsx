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
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../context/userContext";
import { loginUser } from "../api/api-auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await loginUser(email, password);
    if (data != null && data != undefined) {
      setUser(data);
    }
    setEmail("");
    setPassword("");
    navigate("/");
  };

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

          <Button variant="outline" className="w-full flex items-center gap-2">
            <FcGoogle className="h-5 w-5" />
            Login with Google
          </Button>
        </CardContent>

        <CardFooter className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline ml-1">
            Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
