import React, { useState } from 'react';
import { uploadFile } from '../services/apiService';

const UploadForm = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const response = await uploadFile(file);
      console.log(response);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
