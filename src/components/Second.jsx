import { TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

export default function Second(props) {

  const {register, setValue, handleSubmit, watch, formState: { errors } } = useForm({defaultValues: {
    name: "",
    email: "",
    request: "",
  }})

  const nameValue = watch("name")
  const emailValue = watch("email")
  const requestValue = watch("request")
  const [avatarPreview, setAvatarPreview] = useState("")
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const cld = new Cloudinary({ cloud: { cloudName: 'duilaadex' } });


  useEffect(() => {
    if (nameValue !== "") localStorage.setItem("name", nameValue || "")
    if (emailValue !== "") localStorage.setItem("email", emailValue || "")
    if (requestValue !== "") localStorage.setItem("request", requestValue || "")
    if (uploadedImageUrl) localStorage.setItem("avatar", uploadedImageUrl)
  }, [nameValue, emailValue, requestValue, uploadedImageUrl])

  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatar")
    const savedName = localStorage.getItem("name")
    const savedEmail = localStorage.getItem("email")
    const savedRequest = localStorage.getItem("request")

    if (savedAvatar) setUploadedImageUrl(savedAvatar)
    setValue("name", savedName)
    setValue("email", savedEmail)
    setValue("request", savedRequest)
  }, [setValue])

  const handleSubmitRequest = handleSubmit((data) => {
    if (uploadedImageUrl) {
      props.goNext()
    } else {
      alert("Please upload a profile picture!")
    }
  })

  async function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "hng-preset")
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/duilaadex/image/upload", {
        method: "POST",
        body: formData,
      });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        setUploadedImageUrl(data.secure_url); // Save the uploaded image URL
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    // setAvatarPreview(URL.createObjectURL(file))
    // localStorage.setItem("avatar", file)
  };
    
  

  const uploadedImage = uploadedImageUrl ? cld.image(uploadedImageUrl) : null;

  return (
    <>
      <form className="flex flex-col">
        {/* <div className="flex flex-col gap-3">
          <p>profile photo avatar</p>
          <TextField
            required
            id="outline-required"
            className="w-full"
            {...register("avatar", {
              required: "This field is required!",
            })}
          />
          <p className="text-red-500">{errors.avatar?.message}</p>
        </div> */}
        <div className="flex flex-col gap-3">
          <p>Upload Profile Photo</p>
          <label
            htmlFor="file-upload"
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-600 transition"
          >
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden" // Hide the actual input
          />
          {uploadedImageUrl && (
          <div className="mt-5">
            <p>Uploaded Image Preview:</p>
            {/* <AdvancedImage cldImg={uploadedImage} /> */}
            <img src={uploadedImageUrl} className="h-36" />
          </div>
          )}

        </div>
        <div className="flex flex-col gap-3">
          <p>Enter your name</p>
          <TextField
            required
            id="outline-required"
            className="w-full"
            {...register("name", {
              required: "This field is required!"
            })}
            sx={{
              input: {
                color: "white"
              }
            }}
          />
          <p className="text-red-500">{errors.name?.message}</p>
        </div>
        <div className="flex flex-col gap-3">
          <p>Enter your email</p>
          <TextField
            required
            id="outline-required"
            className="w-full"
            {...register("email", {
              required: "This field is required!"
            })}
            sx={{
              input: {
                color: "white"
              }
            }}
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </div>
        <div className="flex flex-col gap-3">
          <p>Special request?</p>
          <TextField
            id="outline-required"
            className="w-full"
            {...register("request")}
            sx={{
              input: {
                color: "white"
              }
            }}
          />
        </div>
        <div className='flex gap-3 mt-5'>
          <button className='rounded-3xl basis-1/2 p-2 border-indigo-300 border-2 cursor-pointer' onClick={props.goBack}>Back</button>
          <button className='bg-indigo-300 rounded-3xl basis-1/2 p-2 border-indigo-900 border cursor-pointer' onClick={handleSubmitRequest}>Get My Free Ticket</button>
        </div>
      </form>
    </>
  )
}