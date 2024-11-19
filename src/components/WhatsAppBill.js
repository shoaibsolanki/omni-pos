import React, { useState } from 'react';
import axios from 'axios';

const WhatsAppForm = () => {
  const [contactNumber, setContactNumber] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Replace 'BACKEND_API_URL' with the actual URL of our backend API endpoint.
                    

    const apiUrl = 'YOUR_BACKEND_API_URL';

    try {
      const response = await axios.post(apiUrl, { contactNumber });

      if (response.data.success) {
        alert('Payment bill sent successfully!');
        setContactNumber('');
      } else {
        alert('Failed to send payment bill. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      alert('Failed to send payment bill. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Enter Your Contact Number:
        <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
      </label>
      <button type="submit">Send Payment Bill</button>
    </form>
  );
};

export default WhatsAppForm;
