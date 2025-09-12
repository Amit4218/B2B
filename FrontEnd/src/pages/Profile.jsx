import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "../context/userContext";

export default function Profile() {
  // const user = localStorage.getItem("user")
  const { user } = useUser();

  console.log(user);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-full  h-[90vh] bg-gray-50 p-8">
          <Card className="w-full h-full shadow-lg">
            <CardHeader className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.user_name} />
                <AvatarFallback>{user.user_name}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-semibold">
                  {user.user_name}
                </CardTitle>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </CardHeader>
            <CardContent className="mt-6 space-y-3 text-center">
              <p className="text-gray-700">
                <span className="font-medium">City:</span> {user.city || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">State:</span>{" "}
                {user.state || "N/A"} 
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
