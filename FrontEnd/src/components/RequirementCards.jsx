import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createChatRoom } from "../api/api-user";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { toast } from "sonner";

export default function RequirementCard({ requirement }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handelConnect = async (sId, rId, rName) => {
    try {
      setLoading(true);
      await createChatRoom(sId, rId, rName);
      navigate("/messages");
      setLoading("false");
    } catch (error) {
      toast("something went wrong !");
      setLoading("false");
      console.error(error.message);
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
    <Card className="w-full max-w-md mx-auto shadow-md hover:shadow-lg transition-shadow rounded-xl overflow-hidden border">
      <CardHeader className="p-2 rounded">
        <img
          src={requirement.reference_image_url}
          alt={requirement.product_title}
          className="w-full h-48 object-cover"
        />
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
        {user.role == "seller" && (
          <div className="text-center mt-10 -mb-3 ">
            <Button
              onClick={() => {
                handelConnect(
                  user.user_id,
                  requirement.buyer_id,
                  user.user_name
                );
              }}
              className="hover:cursor-pointer"
            >
              Connect
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
