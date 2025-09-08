import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function Loader() {
  return (
    <>
      <div className="h-screen w-full max-w-screen space-y-4">
        <div className="rounded-xl h-full border bg-gray-3500 p-6 shadow space-y-4 ">
          <Skeleton className="h-6 w-1/2 mx-auto bg-slate-300" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-16 bg-slate-400" />
            <Skeleton className="h-10 w-full rounded-md bg-slate-300" />
          </div>

          <div className="space-y-2 ">
            <Skeleton className="h-4 w-20 bg-slate-300" />
            <Skeleton className="h-10 w-full rounded-md bg-slate-300" />
          </div>

          <Skeleton className="h-10 w-full rounded-md bg-slate-300" />

          <div className="flex items-center gap-2 ">
            <Skeleton className="h-3 w-1/3 bg-slate-300" />
            <Skeleton className="h-3 w-1/3 bg-slate-300" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-1/3 bg-slate-300" />
            <Skeleton className="h-3 w-1/3 bg-slate-300" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 bg-slate-300" />
            <Skeleton className="h-10 w-full rounded-md bg-slate-300" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-1/3 bg-slate-300" />
            <Skeleton className="h-3 w-1/3 bg-slate-300" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-20 bg-slate-300" />
            <Skeleton className="h-10 w-full rounded-md bg-slate-300" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-1/3 bg-slate-300" />
            <Skeleton className="h-3 w-1/3 bg-slate-300" />
          </div>

          <Skeleton className="h-10 w-full rounded-md bg-slate-300" />
        </div>
      </div>
    </>
  );
}

export default Loader;
