import React, { useEffect, useState } from 'react';
import { fetchDocuments } from '../services/apiService';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const docs = await fetchDocuments();
      setDocuments(docs);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Uploaded Documents</h2>
      <ul>
        {documents.map((doc, index) => (
          <li key={index}>{doc.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
