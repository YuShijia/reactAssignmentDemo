import React from "react";
import "./styles.css";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { validator } from "./Validator";
import useForm from "./useForm";

export default function App() {
  const initState = {
    firstName:"",
    lastName:"",
    description:"",
    email: ""
  };

  const submit = () => {
    console.log(" Submited");
  };

  const {
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
  } = useForm({
    initState,
    callback: submit,
    validator
  });

  let isValidForm =
    Object.values(errors).filter(error => typeof error !== "undefined")
      .length === 0;

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Paper 
        elevation={4} square={false}
        className="Paper">
        <form onSubmit={handleSubmit}>
          <div>

            <Typography variant="h5" gutterBottom>
              Application Form (Scarlett Yu)
            </Typography>

            {/* First Name */}
            <TextField
              required
              label="First Name"
              name="firstName"     
              defaultValue={state.firstName}
              onChange={handleChange}
              error={errors.firstName ? true : false}
              helperText={errors.firstName}
              onBlur={handleBlur}
              className="InputItemMargin InputItemShort"
              style={{margin: "40px 10px 20px 0"}}
            />

            {/* Last Name */}
            <TextField
              required
              label="Last Name"
              name="lastName"
              defaultValue={state.lastName}
              onChange={handleChange}
              error={errors.lastName ? true : false}
              helperText={errors.lastName}
              onBlur={handleBlur}
              className="InputItemShort"
              style={{margin: "40px 0 20px 0"}}
            />
            <br />

            {/* Small Description */}
            <TextField
              required
              label="Small Description"
              name="description"
              defaultValue={state.description}
              onChange={handleChange}
              error={errors.description ? true : false}
              helperText={errors.description}
              onBlur={handleBlur}
              className="InputItemMultiline"
              multiline
              rows={5}
              style={{margin: "10px 0 20px 0"}}
            />
            <br />

            {/* EMAIL */}
            <TextField
              required
              label="Email Address"
              name="email"
              defaultValue={state.email}
              onChange={handleChange}
              error={errors.email ? true : false}
              helperText={errors.email}
              onBlur={handleBlur}
              className="InputItemLong"
              style={{margin: "10px 0 30px 0"}}
            />

          </div>

          {/* Image Upload */}
          <Typography variant="body2" gutterBottom>
              You may upload additional images (maximum of 2):
          </Typography>

          {/* Fixed Image Slot - Primary*/}
          <input 
            accept="image/*" 
            type="file" 
            id="select-image" 
            onChange={handleImageUpload}
            style={{ display: 'none' }}/>
          <br />
          {isUploadVisible && (<label htmlFor="select-image">
            <Button 
              variant="outlined" 
              color="primary" 
              component="span"
              style={{margin: "0px 50px 30px 0", width: "30%", height: "100px", border: "1px dashed"}}
              className="UploadBox">
              Upload
            </Button>
          </label>)}
          {imageUrl && selectedImage && (
            <Box 
              mt={2}
              style={{margin: "0 0 20px 0", width: "80%"}}>
              <img src={imageUrl} alt={selectedImage.name} height="200px" />
            </Box>
          )}

          {/* Fixed Image Slot - Secondary*/}
          <input 
            accept="image/*" 
            type="file" 
            id="select-image-sec" 
            onChange={handleImageUploadSec}
            style={{ display: 'none' }}/>
          {isUploadVisibleSec && (<label htmlFor="select-image-sec">
            <Button 
              variant="outlined" 
              color="primary" 
              component="span"
              style={{margin: "0px 0 30px 0", width: "30%", height: "100px", border: "1px dashed"}}
              className="UploadBox">
              Upload
            </Button>
          </label>)}
          <br />
          {imageUrlSec && selectedImageSec && (
            <Box 
              mt={2}
              style={{margin: "0 0 20px 0", width: "80%"}}>
              <img src={imageUrlSec} alt={selectedImageSec.name} height="200px" />
            </Box>
          )}

          <Button
            onClick={handleClearImages}
            style={{margin: "0px 0 20px 0"}}
          > Clear Images</Button>

          <div>
            <Button
              disabled={!isValidForm}
              type="submit"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </div>
        </form>
      </Paper>
    </Grid>
  );
}
