import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createChatRoom } from "../api/api-user";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { toast } from "sonner";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

export default function RequirementCard({ requirement }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0); // carousel index

  const handleConnect = async (sId, rId, rName) => {
    try {
      setLoading(true);
      await createChatRoom(sId, rId, rName);
      navigate("/messages");
    } catch (error) {
      toast("Something went wrong!");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  const images = requirement.reference_image_url || [];

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-md hover:shadow-lg transition-shadow rounded-xl overflow-hidden border">
      <CardHeader className="p-2 rounded">
        {images.length > 0 && (
          <div className="relative">
            <img
              src={images[currentImage]}
              alt={`${requirement.product_title} ${currentImage + 1}`}
              className="w-full h-52 object-cover rounded"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-slate-400 bg-opacity-50 text-black rounded-full w-4 h-4 flex items-center justify-center "
                >
                  <ChevronsLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-slate-400 bg-opacity-50 text-black rounded-full w-4 h-4 flex items-center justify-center "
                >
                  <ChevronsRight />
                </button>
              </>
            )}

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute bottom-1 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                {currentImage + 1} / {images.length}
              </div>
            )}
          </div>
        )}

        <CardTitle className="text-center text-lg font-semibold py-3 bg-muted">
          {requirement.product_title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 p-4">
        <div className="text-sm">
          <p className="font-semibold">Product Description:</p>
          <p className="text-muted-foreground">{requirement.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="font-semibold text-sm">Required Quantity</p>
            <p className="text-muted-foreground">
              {requirement.quantity_needed}
            </p>
          </div>
          <div>
            <p className="font-semibold text-sm">Price Range</p>
            <p className="text-muted-foreground">{requirement.price_range}</p>
          </div>
        </div>

        <div>
          <p className="font-semibold text-sm">City</p>
          <p className="text-muted-foreground">{requirement.city}</p>
        </div>

        <div>
          <p className="font-semibold text-sm">State</p>
          <p className="text-muted-foreground">{requirement.state}</p>
        </div>

        <div>
          <p className="font-semibold text-sm">Delivery Address</p>
          <p className="text-muted-foreground">
            {requirement.delivery_location}
          </p>
        </div>

        <div className="text-xs text-right text-muted-foreground italic">
          Post Date: {new Date(requirement.created_at).toLocaleDateString()}
        </div>

        {user.role === "seller" && (
          <div className="text-center mt-6">
            <Button
              onClick={() =>
                handleConnect(
                  user.user_id,
                  requirement.buyer_id,
                  user.user_name
                )
              }
            >
              Connect
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
