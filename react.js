// React Component
import React from 'react';

const DocumentGenerator = () => {
  const handleGenerateDocument = async () => {
    try {
      // Prepare your form data
      const formData = new FormData();
      formData.append('template', templateFile); // Your template file
      formData.append('questions', JSON.stringify(questions)); // Your questions data

      const response = await fetch('http://your-backend-url/generate-document', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Document generation failed');
      }

      // Get the blob from the response
      const blob = await response.blob();
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link element and trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'generated_document.docx';
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating document:', error);
      // Handle error appropriately
    }
  };

  return (
    <button onClick={handleGenerateDocument}>
      Generate Document
    </button>
  );
};

export default DocumentGenerator;