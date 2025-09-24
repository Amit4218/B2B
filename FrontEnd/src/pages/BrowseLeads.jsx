import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListFilter, Search } from "lucide-react";

import RequirementCard from "../components/RequirementCards";
import { getLeads } from "../api/api-user";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useCheckUserSession from "../hooks/checkIsUserAuthHook";

export default function BrowseLeadsPage() {
  useCheckUserSession();

  const [requirements, setRequirements] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const [state, setState] = useState("all");
  const [priceRange, setPriceRange] = useState("");
  const [sort, setSort] = useState("newest");
  const navigate = useNavigate();

  // Defensive: ensure requirements is always an array
  const allCategories = [
    ...new Set((requirements || []).flatMap((r) => r.categories || [])),
  ];
  const allstates = [
    ...new Set((requirements || []).map((r) => r.state).filter(Boolean)),
  ];

  const handleApplyFilters = () => {
    let temp = [...(requirements || [])];

    if (keyword) {
      temp = temp.filter(
        (r) =>
          r.product_title.toLowerCase().includes(keyword.toLowerCase()) ||
          (r.description || "").toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (category !== "all") {
      temp = temp.filter((r) => r.categories?.includes(category));
    }

    if (state !== "all") {
      temp = temp.filter((r) => r.state === state);
    }

    if (priceRange) {
      const [min, max] = priceRange
        .split("-")
        .map((p) => parseInt(p.trim(), 10));
      if (!isNaN(min) && !isNaN(max)) {
        temp = temp.filter((r) => {
          if (!r.price_range) return false;
          const leadMin = r.price_range.replace(/[^0-9-]/g, "").split("-")[0];
          const leadPrice = parseInt(leadMin, 10);
          return !isNaN(leadPrice) && leadPrice >= min && leadPrice <= max;
        });
      }
    }

    temp = [...temp].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sort === "oldest" ? dateA - dateB : dateB - dateA;
    });

    setFiltered(temp);
  };

  useEffect(() => {
    const getAllLeads = async () => {
      const leads = await getLeads();
      if (leads === "TokenExpiredError") {
        navigate("/login");
        toast("Token expired, please login again.");
      } else {
        setRequirements(Array.isArray(leads) ? leads : []);
      }
    };
    getAllLeads();
  }, [navigate]);

  // Auto-apply filters whenever requirements or filter states change
  useEffect(() => {
    handleApplyFilters();
  }, [requirements, keyword, category, state, priceRange, sort]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Browse Business Leads
        </h1>
        <p className="text-muted-foreground mt-2">
          Find your next business opportunity from thousands of active
          requirements.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListFilter className="h-5 w-5" />
                <span>Filters</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Keyword Search */}
              <div className="space-y-2">
                <Label htmlFor="keyword">Keyword</Label>
                <Input
                  id="keyword"
                  placeholder="Search..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {allCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* City */}
              <div className="space-y-2">
                <Label htmlFor="state">City</Label>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All states</SelectItem>
                    {allstates.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <Label htmlFor="price-range">Price Range</Label>
                <Input
                  id="price-range"
                  placeholder="e.g., 500-1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                />
              </div>

              {/* Sort */}
              <div className="space-y-2">
                <Label htmlFor="sort">Sort By</Label>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger id="sort">
                    <SelectValue placeholder="Newest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Leads */}
        <main className="lg:col-span-3">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {filtered.map((req) => (
                <RequirementCard key={req.requirement_id} requirement={req} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 bg-card rounded-lg">
              <Search className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold">No Leads Found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your filters to find what you're looking for.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
