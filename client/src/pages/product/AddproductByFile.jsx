"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { getEnv } from "@/components/Helpers/getenv";
import { showToast } from "@/components/Helpers/showToast";

const AddProductByFile = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      showToast("error", "Please select an Excel file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/product/upload-excel`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.message || "Error uploading file.");
      } else {
        showToast("success", data.message || "Products uploaded successfully!");
        setFile(null);
      }
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Upload Products via Excel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-400
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-600 file:text-white
            hover:file:bg-blue-700"
        />

        <Button
          onClick={handleUpload}
          disabled={loading}
          className="w-full flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          {loading ? "Uploading..." : "Upload Excel"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddProductByFile;
