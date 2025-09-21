import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import UploadImg from "../lib/uploadToCloudinary";
import Loader from "../components/Loader";
import { postRequirements } from "../api/api-user";
import useCheckUserSession from "../hooks/checkIsUserAuthHook";

function PostLeads() {
  useCheckUserSession();

  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [form, setForm] = useState({
    product_title: "",
    description: "",
    category: "",
    image: [],
    quantity_needed: "",
    price_range: "",
    city: "",
    state: "",
    delivery_location: "",
  });

  const categories = [
    "Apparel",
    "Textiles",
    "Organic",
    "Industrial Supplies",
    "Metals",
    "Construction",
    "Agriculture",
    "Spices",
    "Food & Beverage",
    "Corporate Gifting",
    "Customized Products",
    "Events",
    "Leather",
    "Fashion",
    "Raw Materials",
    "Recycled Materials",
    "Plastics",
    "Manufacturing",
    "Machinery",
    "Cafe Supplies",
    "Cosmetics",
    "Ayurveda",
    "Herbs",
    "electronics"
  ];

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Upload image when selected
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploadingImage(true);
    const url = await UploadImg(file);

    if (url) {
      setForm((prev) => ({ ...prev, image: [...prev.image, url] }));
      toast("Reference image uploaded successfully");
      fileInputRef.current.value = null;
    } else {
      toast("Image upload failed");
    }
    setIsUploadingImage(false);
  };

  // Remove image
  const handleRemoveImage = (index) => {
    setForm((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const status = await postRequirements(form);

      if (status === "TokenExpiredError") {
        navigate("/login");
        toast("Token expired, please login again");
        return;
      }

      if (status === 200) {
        toast("Requirement submitted successfully!");
        // Reset form
        setForm({
          product_title: "",
          description: "",
          category: "",
          image: [],
          quantity_needed: "",
          price_range: "",
          city: "",
          state: "",
          delivery_location: "",
        });
      } else {
        toast("Submission failed");
      }
    } catch (err) {
      console.error(err);
      toast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <Card className="max-w-2xl mx-auto shadow-md rounded-xl border mt-10 mb-10">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Create New Requirement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Product Title */}
          <div className="space-y-2">
            <Label htmlFor="product_title">Product Title</Label>
            <Input
              id="product_title"
              value={form.product_title}
              onChange={(e) => handleChange("product_title", e.target.value)}
              placeholder="Enter product title"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter product description"
              rows={4}
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={form.category}
              onValueChange={(val) => handleChange("category", val)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reference Images */}
          <div className="space-y-2">
            <Label htmlFor="image">Reference Images</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              disabled={isUploadingImage}
            />

            {/* Preview uploaded images */}
            <div className="flex flex-wrap gap-2 mt-2">
              {form.image.map((url, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img
                    src={url}
                    alt={`Uploaded ${index}`}
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity_needed">Quantity Needed</Label>
            <Input
              id="quantity_needed"
              type="number"
              value={form.quantity_needed}
              onChange={(e) => handleChange("quantity_needed", e.target.value)}
              placeholder="Enter quantity needed"
              required
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price_range">Price Range (per item)</Label>
            <Input
              id="price_range"
              type="number"
              value={form.price_range}
              onChange={(e) => handleChange("price_range", e.target.value)}
              placeholder="Enter price range"
              required
            />
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Enter city"
              required
            />
          </div>

          {/* State */}
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
              placeholder="Enter state"
              required
            />
          </div>

          {/* Delivery Location */}
          <div className="space-y-2">
            <Label htmlFor="delivery_location">Delivery Location</Label>
            <Input
              id="delivery_location"
              value={form.delivery_location}
              onChange={(e) =>
                handleChange("delivery_location", e.target.value)
              }
              placeholder="Enter delivery location"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            {isUploadingImage ? "Uploading Image..." : "Submit Requirement"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default PostLeads;
