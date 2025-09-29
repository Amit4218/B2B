import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "../context/userContext";
import { Button } from "@/components/ui/button";
import ProfileRequirements from "../components/ProfileRequirements";
import SellerDetailsPage from "../components/SellerDetailsPage";

export default function Profile() {
  const [enableEdit, setenableEdit] = useState(false);
  let { user } = useUser();

  const User = user || localStorage.getItem("user");

  return (
    <>
      <div className="flex justify-center items-start min-h-screen bg-gray-50 py-10 px-4">
        <div className="w-full max-w-4xl">
          <Card className="w-full shadow-lg">
            <div className="flex justify-end p-4">
              <Button
                onClick={() => {
                  setenableEdit(true);
                }}
              >
                Edit Details
              </Button>
            </div>

            <CardHeader className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={User.avatar} alt={User.user_name} />
                <AvatarFallback>{User.user_name}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-semibold">
                  {User.user_name}
                </CardTitle>
                <p className="text-gray-500 text-sm">{User.email}</p>
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex flex-wrap justify-center gap-4 text-center">
                <div className="bg-gray-100 p-4 rounded-md w-full sm:w-1/2 lg:w-1/4">
                  <p className="text-gray-700">
                    <span className="font-medium">City:</span>{" "}
                    {User.city || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md w-full sm:w-1/2 lg:w-1/4">
                  <p className="text-gray-700">
                    <span className="font-medium">State:</span>{" "}
                    {User.state || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md w-full sm:w-1/2 lg:w-1/4">
                  <p className="text-gray-700">
                    <span className="font-medium ">GST:</span>{" "}
                    {User.gst_number || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md w-full sm:w-full">
                  <p className="text-gray-700">
                    <span className="font-medium">Description:</span>{" "}
                    {User.description || "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          {enableEdit && (
            <div className="relative flex justify-center items-start min-h-screen bg-gray-50 py-10 px-4">
              <SellerDetailsPage onClose={() => setenableEdit(false)} />
            </div>
          )}
          <div className="mt-6">
            <ProfileRequirements />
          </div>
        </div>
      </div>
    </>
  );
}
