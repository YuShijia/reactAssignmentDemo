import { useState, useEffect } from "react";

// ******************************
const useForm = ({ initState, callback, validator }) => {
  const [state, setState] = useState(initState);
  const [errors, setErrors] = useState({});
  const [isSubmited, setIsSubmited] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploadVisible, setIsUploadVisible] = useState(true);

  const [selectedImageSec, setSelectedImageSec] = useState(null);
  const [imageUrlSec, setImageUrlSec] = useState(null);
  const [isUploadVisibleSec, setIsUploadVisibleSec] = useState(true);

  // ******************************
  useEffect(() => {
    const isValidErrors = () =>
      Object.values(errors).filter(error => typeof error !== "undefined")
        .length > 0;
    if (isSubmited && !isValidErrors()) callback();
  }, [errors]);

  // ******************************
  const handleChange = e => {
    const { name, value } = e.target;
    setState(() => ({
      ...state,
      [name]: value
    }));
  };
  // ******************************
  const handleBlur = e => {
    const { name: fieldName } = e.target;
    const faildFiels = validator(state, fieldName);
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(faildFiels)[0]
    }));
  };

  // *********Handle Primary Image Upload*********************
  const handleImageUpload = e => {
    setSelectedImage(e.target.files[0])
  };

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
      setIsUploadVisible(false);
    }
  }, [selectedImage]);

    // *********Handle Sencondary Image Upload*********************
    const handleImageUploadSec = e => {
        setSelectedImageSec(e.target.files[0])
      };
    
      useEffect(() => {
        if (selectedImageSec) {
          setImageUrlSec(URL.createObjectURL(selectedImageSec));
          setIsUploadVisibleSec(false);
        }
      }, [selectedImageSec]);

    // *********Handle Clear Images*********************
    const handleClearImages = e => {
        setSelectedImage(null);
        setIsUploadVisible(true);
        setImageUrl(null);

        setSelectedImageSec(null);
        setIsUploadVisibleSec(true);
        setImageUrlSec(null);
    };


  // ******************************
  const handleSubmit = e => {
    e.preventDefault();
    const { name: fieldName } = e.target;
    const faildFiels = validator(state, fieldName);
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(faildFiels)[0]
    }));
    setIsSubmited(true);
  };

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    handleImageUpload,
    handleImageUploadSec,
    handleClearImages,
    state,
    errors,
    selectedImage,
    imageUrl,
    isUploadVisible,
    selectedImageSec,
    imageUrlSec,
    isUploadVisibleSec
  };
};

export default useForm;