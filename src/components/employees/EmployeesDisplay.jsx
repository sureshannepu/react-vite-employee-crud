import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import SnackbarAlert from "./SnackbarAlert";
import EmployeeTable from "./EmployeeTable";
import EmployeeDialog from "./EmployeeDialog";
import DeleteDialog from "./DeleteDialog";
import { fetchEmployees, addEmployee, deleteEmployee, updateEmployee } from "../../api";

export default function EmployeesDisplay() {
  const [employees, setEmployees] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEmployeeDialog, setOpenEmployeeDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const getEmployees = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
    };
    getEmployees();
  }, []);

  const handleAddEmployee = async (newEmployee) => {
    const addedEmployee = await addEmployee(newEmployee);
    if (addedEmployee) {
      setEmployees([...employees, addedEmployee]);
      setSnackbarMessage("Employee added successfully!");
    }
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    const updated = await updateEmployee(updatedEmployee.id, updatedEmployee);
    if (updated) {
      setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updated : emp));
      setSnackbarMessage("Employee updated successfully!");
    }
  };

  const handleDeleteEmployee = async () => {
    if (selectedEmployee) {
      const success = await deleteEmployee(selectedEmployee.id);
      if (success) {
        setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
        setSnackbarMessage("Employee deleted successfully!");
      }
      setOpenDeleteDialog(false);
    }
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <h1>Employees</h1>
      <Button variant="contained" color="primary" style={{ marginBottom: 10 }} onClick={() => setOpenEmployeeDialog(true)}>
        Add Employee
      </Button>
      <EmployeeTable
        employees={employees}
        onEdit={(employee) => { setSelectedEmployee(employee); setEditMode(true); setOpenEmployeeDialog(true); }}
        onDelete={(employee) => { setSelectedEmployee(employee); setOpenDeleteDialog(true); }}
      />
      <EmployeeDialog
        open={openEmployeeDialog}
        onClose={() => { setOpenEmployeeDialog(false); setSelectedEmployee(null); setEditMode(false); }}
        onSave={editMode ? handleUpdateEmployee : handleAddEmployee}
        employee={selectedEmployee}
        editMode={editMode}
      />
      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDeleteEmployee}
      />
      <SnackbarAlert message={snackbarMessage} onClose={() => setSnackbarMessage("")} />
    </div>
  );
}
