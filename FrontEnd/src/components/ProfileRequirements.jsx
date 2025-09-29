import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { deletePostedLead, getUserPostedLeads } from "../api/api-user";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "sonner";

function ProfileRequirements() {
  const [leads, setLeads] = useState([]);

  const handleDeleteLead = async (requirementId) => {
    try {
      const success = await deletePostedLead(requirementId);

      if (success != null || success != undefined) {
        toast.success("Lead deleted successfully!");

        const updatedLeads = leads.filter(
          (lead) => lead.requirement_id !== requirementId
        );

        setLeads(updatedLeads);
      } else {
        toast.error("Failed to delete lead.");
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast.error("An error occurred while deleting the lead.");
    }
  };

  useEffect(() => {
    const fetchLeads = async () => {
      const leads = await getUserPostedLeads();
      setLeads(leads);
    };
    fetchLeads();
  }, [setLeads]);

  return (
    <div className=" mx-auto">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3"></div>
                Your Posted Leads
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {leads.length} leads posted
              </p>
            </div>
            <Link to="/post-leads">
              <Button className="px-4 py-2  text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg">
                Post New Lead
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {leads.length > 0 ? (
            <div className="space-y-3">
              {leads.map((lead) => (
                <div
                  key={lead.requirement_id}
                  className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                            {lead.product_title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {lead.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                />
                              </svg>
                              <span className="font-medium">
                                {lead.categories}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span>
                                {String(lead.created_at).split("T")[0]}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleDeleteLead(lead.requirement_id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No leads posted yet
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Start connecting with other users by posting your first lead
              </p>
              {/* <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Post Your First Lead
              </button> */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileRequirements;
