import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Slide,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function EmployeeDialog({
  open,
  onClose,
  onSave,
  employee,
  editMode,
}) {
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone must be 10 digits")
      .required("Phone is required"),
    dob: Yup.date().required("Date of Birth is required"),
    qualification: Yup.string().required("Qualification is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: null,
      qualification: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSave(values);
      onClose();
    },
  });

  useEffect(() => {
    if (employee) {
      formik.setValues({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        dob: employee.dob ? dayjs(employee.dob) : null,
        qualification: employee.qualification || "",
      });
    } else {
      formik.resetForm();
    }
  }, [employee]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{editMode ? "Edit Employee" : "Add Employee"}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="First Name"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Last Name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Phone"
            name="phone"
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            sx={{ mb: 2 }}
          />
          <DatePicker
            label="Date of Birth"
            value={formik.values.dob}
            onChange={(date) => formik.setFieldValue("dob", date)}
            format="YYYY-MM-DD"
            maxDate={dayjs()}
            slotProps={{
              textField: { fullWidth: true, margin: "dense", sx: { mb: 2 } },
            }}
          />

          <TextField
            fullWidth
            select
            margin="dense"
            label="Qualification"
            name="qualification"
            value={formik.values.qualification}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.qualification &&
              Boolean(formik.errors.qualification)
            }
            helperText={
              formik.touched.qualification && formik.errors.qualification
            }
            sx={{ mb: 2 }}
          >
            <MenuItem value="Bachelor's">Bachelor's</MenuItem>
            <MenuItem value="Master's">Master's</MenuItem>
            <MenuItem value="PhD">PhD</MenuItem>
            <MenuItem value="Diploma">Diploma</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            {editMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
