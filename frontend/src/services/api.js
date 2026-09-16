const API_URL = 'http://localhost:3001/api';

export const sendMessage = async (message, personality, history) => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, personality, history }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to send message:", error);
    return { success: false, error: "Unable to generate response" };
  }
};

export const createShareSession = async (profile, history) => {
  try {
    const response = await fetch(`${API_URL}/share`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ profile, history }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to create share session:", error);
    return { success: false, error: "Unable to create share session" };
  }
};

export const getShareSession = async (sessionId) => {
  try {
    const response = await fetch(`${API_URL}/share/${sessionId}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to get share session:", error);
    return { success: false, error: "Unable to get share session" };
  }
};
