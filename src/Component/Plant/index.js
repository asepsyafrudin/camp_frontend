import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import {
  createMasterPlantApi,
  deleteMasterPlantApi,
  getMasterPlantApi,
  setStatusActiveMasterPlant,
  updateMasterPlantApi,
} from "../../Config/API";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { ApprovalRounded, Delete, Edit } from "@mui/icons-material";

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

function Plant() {
  const [name, setName] = useState("");
  const [tablePlant, setTablePlant] = useState("");
  const [actions, setActions] = useState(0);
  const [edit, setEdit] = useState("");
  const [open, setOpen] = useState(false);
  const [plantId, setPlantId] = useState("");

  const navigate = useNavigate();

  /**
   * Handles the approval of a user.
   *
   * @param {Event} event - The event object.
   * @return {Promise<void>} - A promise that resolves when the user is approved.
   */
  const handleActive = async (event) => {
    // Get the ID of the user to be approved from the event target
    const id = event.target.id;
    const data = tablePlant.find((user) => user.id === parseInt(id));
    // Prompt the user for confirmation
    const confirmation = window.confirm("Plant ini akan di active-kan?");

    // If the user confirms
    if (confirmation && data) {
      try {
        // Send a PUT request to the approve user API with the user ID and authorization token
        await axios.put(setStatusActiveMasterPlant(id), data, {
          headers: {
            ["authorization"]: localStorage.getItem("token"),
          },
        });

        // Update the number of actions
        setActions((prevActions) => prevActions + 1);
      } catch (error) {
        // Log the error and return
        console.error(error);
        localStorage.clear();
        navigate("/");
        return;
      }

      // Show a success message
      window.alert("Active Plant Success");
    }
  };

  /**
   * Handles the deletion of a user.
   *
   * @param {Event} event - The event object.
   * @return {Promise<void>} - A promise that resolves when the user is deleted.
   */
  const handleDelete = async (event) => {
    // Retrieve the ID of the user to be deleted from the event target
    const plantId = event.target.id;

    // Find the plant to be deleted from the tablePlant array
    const plantToDelete = tablePlant.find(
      (plant) => plant.id === parseInt(plantId)
    );

    // Prompt the user for confirmation
    const confirmation = window.confirm("apakah data ini akan di hapus?");

    // If the user confirms and the plant to be deleted is found
    if (plantToDelete && confirmation) {
      try {
        // Send a DELETE request to the delete user API with the user ID and authorization token
        const response = await axios.delete(deleteMasterPlantApi(plantId), {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        // Update the number of actions
        setActions((prevActions) => prevActions + 1);
      } catch (error) {
        // If an error occurs, clear the local storage and navigate to the home page
        localStorage.clear();
        navigate("/");
      }
    }
  };

  /**
   * Handles the editing of a plant.
   *
   * @param {Event} e - The event object.
   * @return {void}
   */
  const handleEdit = (e) => {
    // Retrieve the ID of the plant to be edited from the event target
    const id = e.target.id;

    // Find the plant in the tablePlant array based on the ID
    const plant = tablePlant.find((plant) => plant.id === parseInt(id));

    // If the plant is found
    if (plant) {
      // Update the state variables with the plant data
      setEdit(id); // Set the ID of the plant to be edited
      setName(plant.plant_name); // Set the name of the plant to be edited
      setPlantId(plant.plant_id);

      // Open the modal for editing
      setOpen(true);
    } else {
      // If the plant is not found, show an alert
      window.alert("Plant tidak ditemukan");
    }
  };

  const getTablePlant = async () => {
    try {
      const response = await axios.get(getMasterPlantApi, {
        headers: {
          ["authorization"]: localStorage.getItem("token"),
        },
      });
      setTablePlant(response.data.data);
    } catch (error) {
      localStorage.clear();
      navigate("/");
    }
  };

  useEffect(() => {
    getTablePlant();
  }, [actions]);

  const columns = [
    { field: "plant_id", headerName: "Plant ID", width: 150 },
    { field: "plant_name", headerName: "Plant Name", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      valueGetter: (value) => {
        if (value === 1) {
          return "Active";
        } else {
          return "Not Active";
        }
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 350,
      renderCell: (params) => {
        return (
          <>
            <Button id={params.row.id} onClick={handleActive}>
              {" "}
              <ApprovalRounded style={{ pointerEvents: "none" }} />
              set As Active
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
  };

  const handleRegisterUser = (e) => {
    e.preventDefault();
    const checkPlantId = tablePlant.find((plant) => plant.plant_id === plantId);
    if (checkPlantId) {
      window.alert("Plant ID sudah ada");
      return;
    }

    const data = {
      plant_name: name,
      plant_id: plantId,
      create_by: "Admin",
      update_by: "Admin",
    };

    axios
      .post(createMasterPlantApi, data, {
        headers: {
          ["authorization"]: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        resetForm();
        setActions((prev) => prev + 1);
        window.alert("Register Succeess");
      })
      .catch((error) => {
        console.log(error);
        window.alert("Register Gagal");
        localStorage.clear();
        navigate("/");
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const data = {
      id: edit,
      plant_name: name,
      update_by: "Admin",
    };

    axios
      .put(updateMasterPlantApi, data, {
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
        localStorage.clear();
        navigate("/");
      });
  };

  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
          setEdit("");
        }}
      >
        Add Plant
      </Button>
      <br />
      <br />
      {tablePlant && (
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
          rows={tablePlant}
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
                  <Form.Label>Plant ID</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={plantId}
                    placeholder={"Enter Plant ID"}
                    onChange={(e) => setPlantId(e.target.value)}
                    disabled={edit ? true : false}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Plant Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={name}
                    placeholder={"Enter Plant Name"}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </Row>

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

export default Plant;
