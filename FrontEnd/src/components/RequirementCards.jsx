import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RequirementCard({ requirement }) {
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
        <div className="text-center mt-10 -mb-3 ">
          <Button className="hover:cursor-pointer">Connect</Button>
        </div>
      </CardContent>
    </Card>
  );
}
