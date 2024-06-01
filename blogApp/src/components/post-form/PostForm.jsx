import React, { useEffect ,useState } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE, Loader } from "../index";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function PostForm({ post }) {
  console.log("Post in Postform from Edit post : ", post);
  const { register, handleSubmit, watch, setValue, control, getValues,reset } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || " ",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const options = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const submit = async (data) => {
    if (post) {
      console.log("file for edit data.image: ",data.image);
      const file = data.image ? await service.uploadFile(data.image) : null;
      console.log("file for edit: ",file);
      if (file) {
        console.log("file for edit file: ",file);
        console.log("file for edit delete : ",post.featuredImage);
        await service.deleteFile(post.featuredImage);
      }
      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      console.log("data in else data: ",data);
      console.log("data in else: ",data.image);
      const file = await service.uploadFile(data.image);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        console.log(data);
        const dbPost = await service.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    console.log("Data before file changes: ", getValues())
    if (file) {
      setValue("image", file); // Update the form value manually
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      console.log("Data after file changes: ", getValues())
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-z\d\s]+/g, "_")
        .replace(/\s/g, "_");
    }
    return "";
  });
  useEffect(() => {
    if (post!=undefined && post.length!=0) {
      reset({
        title: post.title,
        slug: post.$id,
        content: post.content,
        status: post.status,
      });
      console.log("Default values: ", getValues());
      setFeaturedImagePreview(service.getFilePreview(post?.featuredImage));
    }
  }, [post, reset]);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (featuredImagePreview && post) || true  ? (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
         <label className="block mb-2">Featured Image:</label>
        {featuredImagePreview && (
          <div className="w-full mb-4">
            <img
              src={featuredImagePreview}
              alt={post?.title || "Featured"}
              className="rounded-lg"
            />
          </div>
        )}
        <input
          type="file"
          className="hidden"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image")}
          onChange={handleFileChange}
          id="featuredImageInput"
        />
        <label htmlFor="featuredImageInput" className="cursor-pointer bg-gray-200 py-2 px-4 rounded-lg inline-block">
          {featuredImagePreview ? "Change Image" : "Choose Image"}
        </label>

        <Select
          options={options}
          label="Status"
          className="mb-4"
          {...register("status")}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full bg-black"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  ) : <Loader></Loader>
}

export default PostForm;
