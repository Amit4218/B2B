import React, { useState } from "react";
import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { logoutUser } from "../api/api-auth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handelLogout = async () => {
    const status = await logoutUser();
    if (status == 200) {
      setUser(null);
      setOpen(false);
      navigate("/");
    }
    setOpen(false);
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">B2B</div>

        {/* Desktop Links */}
        <div className="hidden md:flex ml-22 space-x-6">
          <Link to="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link
            to="/browse-leads"
            className="text-gray-700 hover:text-gray-900"
          >
            Browse-Leads
          </Link>

          {user && user.role == "buyer" && (
            <>
              <Link
                to="/post-leads"
                className="text-gray-700 hover:text-gray-900"
              >
                Post-Leads
              </Link>
            </>
          )}

          <Link to="/messages" className="text-gray-700 hover:text-gray-900">
            messages
          </Link>
        </div>

        {/* Desktop Button */}
        <div className="hidden md:flex md:gap-1">
          {user ? (
            <>
              <Button
                className="hover:cursor-pointer"
                onClick={() => handelLogout()}
              >
                Sign Out
              </Button>
              <Button variant="outline">
                <Link to={"/profile"}>Profile</Link>
              </Button>
            </>
          ) : (
            <>
              <Button>
                <Link to={"/login"}>Sign In</Link>
              </Button>
              <Button variant="outline">
                <Link to={"/register"}>Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader className="border-b pb-4">
                <SheetTitle className="text-center">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col mt-6 space-y-2 p-2">
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="text-lg bg-neutral-700 rounded text-white hover:text-gray-900 hover:bg-gray-500 p-1 text-center"
                >
                  Home
                </Link>
                <Link
                  to="/browseLeads"
                  onClick={() => setOpen(false)}
                  className="text-lg bg-neutral-700 rounded text-white hover:text-gray-900 hover:bg-gray-500 p-1 text-center"
                >
                  Browse-Leads
                </Link>

                {user && user.role == "buyer" ? (
                  <Link
                    to="/post-leads"
                    onClick={() => setOpen(false)}
                    className="text-lg bg-neutral-700 rounded text-white hover:text-gray-900 hover:bg-gray-500 p-1 text-center"
                  >
                    Post-Leads
                  </Link>
                ) : (
                  <Link
                    to="/messages"
                    onClick={() => setOpen(false)}
                    className="text-lg bg-neutral-700 rounded text-white hover:text-gray-900 hover:bg-gray-500 p-1 text-center"
                  >
                    Messages
                  </Link>
                )}

                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="text-lg bg-neutral-700 rounded text-white hover:text-gray-900 hover:bg-gray-500 p-1 text-center"
                >
                  Dashboard
                </Link>

                <div className="flex flex-col gap-2 mt-4">
                  {user ? (
                    <>
                      <Button onClick={() => handelLogout}>Sign Out</Button>
                      <Button onClick={() => setOpen(false)} variant="outline">
                        <Link to={"/profile"}>Profile</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => setOpen(false)}>
                        <Link to={"/login"}>Sign In</Link>
                      </Button>
                      <Button onClick={() => setOpen(false)} variant="outline">
                        <Link to={"/register"}>Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
