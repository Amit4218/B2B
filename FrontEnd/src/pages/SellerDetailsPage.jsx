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
import { data, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { UpdateSellerProfile } from "../api/api-auth";

export default function SellerDetailsPage() {
  const [details, setDetails] = useState({
    city: "",
    state: "",
    gst_number: "",
    description: "",
  });

  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = await UpdateSellerProfile(
      details.city,
      details.state,
      details.gst_number,
      details.description
    );
    if (data != null && data != undefined) {
      setUser(updatedUser);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Business Details
          </CardTitle>
          <p className="text-xs text-center ">
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
            </div>

            {/* Small Description */}
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
  );
}
