import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-bold mb-2">Page not found</h1>
      <p className="text-muted-foreground mb-6">
        The page you are looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
