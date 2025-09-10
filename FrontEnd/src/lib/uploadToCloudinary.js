const UploadImg = async (image) => {
  const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;
  const CLOUDINARY_API_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_URL;

  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", CLOUDINARY_PRESET);

  const res = await fetch(CLOUDINARY_API_UPLOAD_URL, {
    method: "POST",
    body: data,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Cloudinary upload failed: ${errorText}`);
  }

  const result = await res.json();
  return result.secure_url;
};

export default UploadImg;
