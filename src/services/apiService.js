const API_URL = 'http://localhost:8000/api';

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_URL}/documents/upload`, {
    method: 'POST',
    body: formData,
  });
  return response.json();
};

export const fetchDocuments = async () => {
  const response = await fetch(`${API_URL}/documents/list`);
  return response.json();
};
