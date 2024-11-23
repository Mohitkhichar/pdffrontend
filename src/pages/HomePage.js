import React from 'react';
import UploadForm from '../components/UploadForm';
import DocumentList from '../components/DocumentList';

const HomePage = () => (
  <div>
    <h1>Document Manager</h1>
    <UploadForm />
    <DocumentList />
  </div>
);

export default HomePage;
