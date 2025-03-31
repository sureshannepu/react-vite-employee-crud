import axios from "axios";

const API_URL = "https://67e385a52ae442db76d06d08.mockapi.io/api/v1/employees";

// Fetch all employees
export const fetchEmployees = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.map((emp) => ({
      id: Number(emp.id),
      firstName: emp.firstName || "N/A",
      lastName: emp.lastName || "N/A",
      email: emp.email || "N/A",
      phone: emp.phone || "N/A",
      dob: emp.dob || "N/A",
      qualification: emp.qualification || "N/A",
      createdAt: emp.createdAt || "N/A",
    }));
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};

// Add an employee
export const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post(API_URL, employeeData);
    return response.data;
  } catch (error) {
    console.error("Error adding employee:", error);
    return null;
  }
};

// Delete an employee
export const deleteEmployee = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting employee:", error);
    return false;
  }
};

// Update an employee
export const updateEmployee = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    return null;
  }
};
