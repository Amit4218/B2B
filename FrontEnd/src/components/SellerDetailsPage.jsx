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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { updateUserProfile } from "../api/api-auth";
import Loader from "./Loader";
import { sellerDetailsSchema } from "../formSchemaValidation/sellerDetailsSchema";

export default function SellerDetailsPage({ onClose }) {
  const [details, setDetails] = useState({
    city: "",
    state: "",
    gst_number: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = sellerDetailsSchema.safeParse({
      city: details.city,
      state: details.state,
      gst_number: details.gst_number,
      description: details.description,
    });

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const updatedUser = await updateUserProfile(
        details.city,
        details.state,
        details.gst_number,
        details.description
      );

      if (updatedUser) {
        setUser(updatedUser);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="fixed inset-0 z-50 bg-white bg-opacity-50 flex items-center justify-center px-4">
      <div className="relative w-full max-w-xl">
        <Card className="w-full shadow-xl bg-white">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
            aria-label="Close"
          >
            ✕
          </button>

          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Business Details
            </CardTitle>
            <p className="text-xs text-center text-gray-600">
              Add your business details below to complete your profile
            </p>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* City */}
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="e.g., Mumbai"
                  required
                  value={details.city}
                  onChange={(e) =>
                    setDetails({ ...details, city: e.target.value })
                  }
                />
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city}</p>
                )}
              </div>

              {/* State */}
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="e.g., Maharashtra"
                  required
                  value={details.state}
                  onChange={(e) =>
                    setDetails({ ...details, state: e.target.value })
                  }
                />
                {errors.state && (
                  <p className="text-sm text-red-500">{errors.state}</p>
                )}
              </div>

              {/* GST Number */}
              <div className="space-y-2">
                <Label htmlFor="gst">GST Number</Label>
                <Input
                  id="gst"
                  name="gst"
                  type="text"
                  placeholder="e.g., 22AAAAA0000A1Z5"
                  required
                  value={details.gst_number}
                  onChange={(e) =>
                    setDetails({ ...details, gst_number: e.target.value })
                  }
                />
                {errors.gst_number && (
                  <p className="text-sm text-red-500">{errors.gst_number}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Small Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Write a short description about your business..."
                  rows={3}
                  required
                  value={details.description}
                  onChange={(e) =>
                    setDetails({ ...details, description: e.target.value })
                  }
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description}</p>
                )}
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full mt-4">
                Submit
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
