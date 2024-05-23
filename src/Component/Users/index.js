import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import {
  approveUserApi,
  deleteUserApi,
  getUsersApi,
  registerUserapi,
  updateUserApi,
} from "../../Config/API";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { ApprovalRounded, Delete, Edit } from "@mui/icons-material";
import moment from "moment/moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Users() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [tableUser, setTableUsers] = useState("");
  const [actions, setActions] = useState(0);

  const navigate = useNavigate();

  /**
   * Handles the approval of a user.
   *
   * @param {Event} event - The event object.
   * @return {Promise<void>} - A promise that resolves when the user is approved.
   */
  const handleApprove = async (event) => {
    // Get the ID of the user to be approved from the event target
    const id = event.target.id;
    const data = tableUser.find((user) => user.id === parseInt(id));
    // Prompt the user for confirmation
    const confirmation = window.confirm("User ini akan di approve?");

    // If the user confirms
    if (confirmation && data) {
      try {
        // Send a PUT request to the approve user API with the user ID and authorization token
        await axios.put(approveUserApi(id), data, {
          headers: {
            ["authorization"]: localStorage.getItem("token"),
          },
        });

        // Update the number of actions
        setActions((prevActions) => prevActions + 1);
      } catch (error) {
        // Log the error and return
        console.error(error);
        return;
      }

      // Show a success message
      window.alert("Approve Success");
    }
  };

  /**
   * Handles the deletion of a user.
   *
   * @param {Event} event - The event object.
   * @return {Promise<void>} - A promise that resolves when the user is deleted.
   */
  const handleDelete = async (event) => {
    const userId = event.target.id;
    const userToDelete = tableUser.find((user) => user.id === parseInt(userId));

    const confirmation = window.confirm("apakah data ini akan di hapus?");
    if (userToDelete && confirmation) {
      try {
        const response = await axios.delete(deleteUserApi(userId), {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        setActions((prevActions) => prevActions + 1);
      } catch (error) {
        localStorage.clear();
        navigate("/");
      }
    }
  };

  /**
   * Handles the editing of a user.
   *
   * @param {Event} e - The event object.
   * @return {void}
   */
  const handleEdit = (e) => {
    // Get the ID of the user to be edited from the event target
    const id = e.target.id;

    // Find the user in the tableUser array based on the ID
    const data = tableUser.find((user) => user.id === parseInt(id));

    // If the user is found
    if (data) {
      // Update the state variables with the user data
      setEdit(id);
      setName(data.name);
      setLastName(data.last_name);
      setEmail(data.email);
      setCompany(data.company);
      setPhotoPreview(data.photo);

      // Open the modal for editing
      setOpen(true);
    } else {
      // If the user is not found, show an alert
      window.alert("User tidak ditemukan");
    }
  };

  useEffect(() => {
    axios
      .get(getUsersApi, {
        headers: {
          ["authorization"]: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        setTableUsers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        localStorage.clear();
        navigate("/");
      });
  }, [actions]);

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "company", headerName: "Company", width: 200 },
    {
      field: "create_date",
      headerName: "Create Date",
      width: 200,
      valueFormatter: (value) => {
        return moment(value).format("lll");
      },
    },
    {
      field: "role",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.row.role === 1 ? (
              <span style={{ color: "red", fontWeight: "bold" }}>
                Waiting Approval
              </span>
            ) : (
              <span style={{ color: "green", fontWeight: "bold" }}>Active</span>
            )}
          </>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 350,
      renderCell: (params) => {
        return (
          <>
            <Button id={params.row.id} onClick={handleApprove}>
              {" "}
              <ApprovalRounded style={{ pointerEvents: "none" }} />
              Approve
            </Button>{" "}
            <Button id={params.row.id} onClick={handleEdit}>
              {" "}
              <Edit style={{ pointerEvents: "none" }} />
              Edit
            </Button>{" "}
            <Button id={params.row.id} onClick={handleDelete}>
              {" "}
              <Delete style={{ pointerEvents: "none" }} />
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const handleClose = () => {
    setOpen(false);
    setEdit("");
  };

  const resetForm = () => {
    setName("");
    setLastName("");
    if (!edit) {
      setEmail("");
    }
    setPassword("");
    setPhoto("");
    setPhotoPreview("");
  };

  const handleRegisterUser = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name + " " + lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", 2);
    formData.append("company", company);
    formData.append("photo", photo);
    axios
      .post(registerUserapi, formData)
      .then((response) => {
        console.log(response);
        resetForm("");
        setActions((prev) => prev + 1);
        window.alert("Register Succeess");
      })
      .catch((error) => {
        console.log(error);
        window.alert("Register Gagal");
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", edit);
    formData.append("name", name + " " + lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", 2);
    formData.append("company", company);
    formData.append("photo", photo);
    axios
      .put(updateUserApi, formData, {
        headers: {
          ["authorization"]: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        resetForm();
        setActions((prev) => prev + 1);
        setOpen(false);
        window.alert("Update Success");
      })
      .catch((error) => {
        console.log(error);
        window.alert("Update Failed");
      });
  };

  const setImagePreview = (e) => {
    const file = e.target.files[0];
    const photoPreviewUrl = URL.createObjectURL(file);
    setPhotoPreview(photoPreviewUrl);
    setPhoto(file);
  };

  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
          setEdit("");
        }}
      >
        Add Users
      </Button>
      <br />
      <br />
      {tableUser && (
        <DataGrid
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          columns={columns}
          rows={tableUser}
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
        />
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Register Form
            </Typography>
            <br></br>
            <Form onSubmit={edit ? handleUpdate : handleRegisterUser}>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={name}
                    placeholder={"Enter Your Name"}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    required
                    value={lastName}
                    type="text"
                    placeholder={"Enter Your LastName"}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={email}
                    placeholder={"Enter Email"}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={edit ? true : false}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={company}
                    placeholder={"Enter Company Name"}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Enter Password</Form.Label>
                  <Form.Control
                    required
                    value={password}
                    type="password"
                    placeholder={"Enter Pasword"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Form.Label>Upload Photo</Form.Label>
                <Form.Control
                  type={"file"}
                  className="custom-file-input backgroundFileInput"
                  accept=".gif,.jpg,.jpeg,.png"
                  onChange={setImagePreview}
                />
              </Row>
              <Row>
                {photoPreview && (
                  <img
                    alt="profile"
                    src={photoPreview}
                    height={200}
                    className="imageProfile"
                  />
                )}
              </Row>
              <Row className="mb-3"></Row>
              <Row style={{ textAlign: "right" }}>
                <Col>
                  <Button type="submit">Save</Button>
                  <Button
                    type="button"
                    onClick={resetForm}
                    style={{ marginLeft: 5 }}
                    variant="warning"
                  >
                    Reset
                  </Button>
                </Col>
              </Row>
            </Form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default Users;
