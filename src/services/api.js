import React from 'react';


const API_BASE_URL = 'http://localhost:5000';

export const getComponent2Data = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/component2`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};