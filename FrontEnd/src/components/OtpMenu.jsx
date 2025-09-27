import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { registerUser, sendOtp, verifyOtp } from "../api/api-auth";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function OtpMenu({ email, password }) {
  const { setUser } = useUser();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(60);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      toast("An OTP has been sent to your email.");
    }, 300);
  }, []);

  useEffect(() => {
    // Countdown timer
    const timer =
      counter > 0 &&
      setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);

    return () => clearInterval(timer);
  }, [counter]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const enteredOtp = otp.join("");
      if (enteredOtp.length !== 6) {
        setError("Please enter the full OTP");
        setLoading(false);

        return;
      }
      const data = await verifyOtp(email, enteredOtp);

      if (data) {
        const createduser = await registerUser(email, password);
        setUser(createduser);
        navigate("/");
        setLoading(true);
      }
    } catch (error) {
      console.log(error);

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    const data = sendOtp(email, "resend");
    if (data) {
      toast("OTP Sent successfully");
      setCounter(60); // reset countdown
      setOtp(Array(6).fill(""));
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Please verify your email
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code we've sent to your email address.
          </p>
          {error && <p className="text-red-500">{error}</p>}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Inputs */}
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-12 h-14 text-center text-xl font-semibold border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              ))}
            </div>

            {/* Verify Button */}
            <Button type="submit" className="w-full text-base py-6">
              Verify
            </Button>
          </form>

          {/* Resend */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Didn't get the code?
            </p>
            <Button
              variant="link"
              onClick={handleSendOtp}
              className="p-0 h-auto font-medium"
              disabled={counter > 0} // disable until countdown finishes
            >
              {counter > 0 ? `Resend OTP in ${counter}s` : "Resend OTP"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
