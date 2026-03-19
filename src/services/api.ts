const API_BASE_URL = "/api";

export const getDentists = async () => {
  const response = await fetch(`${API_BASE_URL}/dentists`);
  if (!response.ok) throw new Error("Failed to fetch dentists");
  return response.json();
};

export const getDentistById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/dentists/${id}`);
  if (!response.ok) throw new Error("Failed to fetch dentist details");
  return response.json();
};

export const getAppointments = async () => {
  const response = await fetch(`${API_BASE_URL}/appointments`);
  if (!response.ok) throw new Error("Failed to fetch appointments");
  return response.json();
};

export const createAppointment = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create appointment");
  }
  return response.json();
};

export const updateAppointmentStatus = async (id: string, status: string) => {
  const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("Failed to update appointment status");
  return response.json();
};

export const deleteAppointment = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete appointment");
  return true;
};
