"use client";
import { toBase64 } from '@/utils/utils';
import { UploadFile } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState, ChangeEvent, useEffect } from 'react';
interface FileInputProps {
  onFileChange: (file: File | null) => void;
  file?: File | null | string;
}

const IFilePicker: React.FC<FileInputProps> = ({ onFileChange, file = null }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!!file) {
      if (typeof file === "string") {
        setImagePreview(file);
      } else {
        toBase64(file).then((result) => {
          setImagePreview(result as string);
        });
      }
    }
  }, [file])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileChange(file);
    } else {
      onFileChange(null);
    }
  };

  const handleDivClick = () => {
    // Trigger file input click when the Box is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileInputRef = React.createRef<HTMLInputElement>();

  return (
    <Box onClick={handleDivClick} sx={{ position: "relative" }}>
      <Box
        sx={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: "center",
          height: 200,
          width: "100%",
          border: "1px dashed #D7D7D7",
          borderRadius: 2
        }}
      >
        <UploadFile />
        <Typography>Click to upload or drag and drop</Typography>
        <Typography>SVG, PNG, JPG or GIF (max. 3MB)</Typography>
      </Box>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {!!imagePreview && (
        <Image
          src={imagePreview}
          alt="Chosen Preview"
          style={{ width: '100%', height: '200px', position: "absolute", top: 0, left: 0, borderRadius: "8px" }}
          width={0}
          height={0}
          quality={100}
          priority
        />
      )}
    </Box>
  );
};

export default IFilePicker;
