import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [metadata, setMetadata] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus('');
    setMetadata(null); // Clear previous metadata
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus('Please upload a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://wordtopdf-l959.onrender.com/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { downloadUrl, metadata } = response.data;
      setMetadata(metadata);

      // Trigger file download
      const downloadResponse = await axios.get(`https://wordtopdf-l959.onrender.com/${downloadUrl}`, {
        responseType: 'blob', // To handle binary data
      });

      // Create a blob and download the file
      const url = window.URL.createObjectURL(new Blob([downloadResponse.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', metadata.originalName.replace('.docx', '.pdf'));
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      setStatus('File uploaded and downloaded successfully!');
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to upload or download file.');
    }
  };

  return (
    <div>
      <h1>Word to PDF Converter</h1>
      <form onSubmit={handleFileUpload}>
        <input type="file" accept=".doc,.docx" onChange={handleFileChange} />
        <button type="submit">Convert to PDF</button>
      </form>
      <p>{status}</p>
      {metadata && (
        <div>
          <h2>File Metadata</h2>
          <ul>
            <li><strong>Original Name:</strong> {metadata.originalName}</li>
            <li><strong>MIME Type:</strong> {metadata.mimeType}</li>
            <li><strong>Size:</strong> {metadata.size}</li>
            <li><strong>Upload Date:</strong> {metadata.uploadDate}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
