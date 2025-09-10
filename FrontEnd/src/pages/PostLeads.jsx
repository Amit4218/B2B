import React, { useRef, useState } from "react";
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

function PostLeads() {
  const [form, setForm] = useState({
    product_title: "",
    description: "",
    category: "",
    image: null,
    quantity_needed: "",
    city: "",
    state: "",
    price_range: "",
    delivery_location: "",
  });

  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    ["Apparel", "Textiles", "Organic"],
    ["Industrial Supplies", "Metals", "Construction"],
    ["Agriculture", "Spices", "Food & Beverage"],
    ["Corporate Gifting", "Customized Products", "Events"],
    ["Leather", "Fashion", "Raw Materials"],
    ["Recycled Materials", "Plastics", "Manufacturing"],
    ["Machinery", "Food & Beverage", "Cafe Supplies"],
    ["Cosmetics", "Ayurveda", "Herbs"],
  ];

  const allCategories = [...new Set(categories.flat())];

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return toast("Please upload a reference image..");

    try {
      setLoading(true);
      const url = await UploadImg(image);
      handleChange("image", url);

      const data = await postRequirements(form);

      toast(data == 200 ? "Requirement submitted!" : "Subbmission went wrong");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast("Image upload failed. Try again.");
      console.error(err);
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
    <Card className="max-w-2xl mx-auto shadow-md rounded-xl border mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Create New Requirement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
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
                {allCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reference Image */}
          <div className="space-y-2">
            <Label htmlFor="image">Reference Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>

          {/* Quantity Needed */}
          <div className="space-y-2">
            <Label htmlFor="quantity_needed">Quantity Needed</Label>
            <Input
              id="quantity_needed"
              type="number"
              value={form.quantity_needed}
              onChange={(e) => handleChange("quantity_needed", e.target.value)}
              placeholder="Enter required quantity"
              required
            />
          </div>

          {/* price Range */}

          <div className="space-y-2">
            <Label htmlFor="quantity_needed">Price Range (per item )</Label>
            <Input
              id="quantity_needed"
              type="number"
              value={form.price_range}
              onChange={(e) => handleChange("price_range", e.target.value)}
              placeholder="Enter required quantity"
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

          <div className="pt-4">
            <Button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className="w-full"
            >
              Submit Requirement
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PostLeads;
