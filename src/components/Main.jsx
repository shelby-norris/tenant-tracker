import { useState, useEffect } from "react";
import {
  createItem,
  updateItem,
  deleteItem,
  listAllItems,
} from "../utils/dynamo";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// Main component exported to App.jsx for more organized code

// Schema:
// id: String,
// name: String,
// phone: number,
// property: string,
// utilitiesIncluded: boolean

// state
export default function Main() {
  const [tenants, setTenants] = useState([]);
  const [open, setOpen] = useState(false); // modal open state
  const [tenantPrefill, setTenantPrefill] = useState({}); // fills text fields in update modal form

  // modal styling
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

  useEffect(() => {
    (async () => {
      const items = await listAllItems("Tenants");
      console.log(items);
      setTenants(items);
    })();
  }, []);

  const handleOpen = (tenantObject) => {
    // fills modal with existing info
    setTenantPrefill(tenantObject);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleAddTenant = async (event) => {
    event.preventDefault();

    const newTenant = {};

    newTenant.id = Date.now().toString(); // unique identifier
    newTenant.name = event.target.tenantName.value;
    newTenant.phone = parseInt(event.target.tenantPhone.value);
    newTenant.property = event.target.propertyLeased.value;
    newTenant.utilitiesIncluded = event.target.utilitiesIncluded.checked;

    console.log(newTenant);

    await createItem("Tenants", newTenant);

    setTenants((oldTenants) => {
      return [...oldTenants, newTenant];
    });
  };

  const handleUpdateTenant = async (event) => {
    event.preventDefault();
    console.log(tenantPrefill);
    const { name, phone, property, utilitiesIncluded } = tenantPrefill;

    console.log(tenantPrefill.id);

    await updateItem(
      "Tenants",
      { id: tenantPrefill.id },
      { name, phone, property, utilitiesIncluded }
    );

    setTenants((oldTenants) => {
      return oldTenants.map((tenantObject) => {
        return tenantObject.id === tenantPrefill.id
          ? tenantPrefill
          : tenantObject;
      });
    });

    setOpen(false);
  };

  const handleDeleteTenant = async (id) => {
    await deleteItem("Tenants", { id: id });
    console.log(id);
    setTenants((oldTenants) => {
      return oldTenants.filter((tenantObject) => {
        return tenantObject.id !== id;
      });
    });
  }

  return (
    <main>
      <h2>New Tenant Intake Form</h2>
      <form onSubmit={(event) => handleAddTenant(event)}>
        <TextField id="tenantName" label="Name" name="tenantName" variant="outlined" margin="normal" />
        <TextField id="tenantPhone" label="Phone Number" name="tenantPhone" variant="outlined" margin="normal" />
        <TextField id="propertyLeased" label="Property Leased" name="Property Leased" variant="outlined" margin="normal" />

        <div>
          <FormControlLabel control={<Checkbox name="utilitiesIncluded" id="utilitiesIncluded"/>} label="Utilities Included" />
        </div>
        <br />
        <Button type="submit" variant="contained">Add Tenant</Button>
      </form>

      <section>
        <h2>All Tenants</h2>
        {tenants.length == 0 ? (
          <p>No Current Tenants</p> // If no tenants in database, p will display
        ) : (
          <div>
            {tenants &&
              tenants.map((tenantObject, index) => {
                return (
                  <div key={index}>
                    <p>{tenantObject.name}</p>
                    <p>{tenantObject.phone}</p>
                    <p>{tenantObject.property}</p>
                    <p>
                      {tenantObject.utilitiesIncluded
                        ? "Utilities Included"
                        : "Utilities Not Included"}
                    </p>
                    <Button onClick={() => handleOpen(tenantObject)}>
                      Edit
                    </Button>

                    <Button onClick={() => handleDeleteTenant(tenantObject.id)}>
                      Delete
                    </Button>
                  </div>
                );
              })}
          </div> // If tenants are greater than 0, div will display them all
        )}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Update Tenant Info
            </Typography>
            <form onSubmit={(event) => handleUpdateTenant(event)}>
              <label htmlFor="">Name</label>
              <input
                onChange={(event) =>
                  setTenantPrefill({
                    id: tenantPrefill.id,
                    name: event.target.value,
                    phone: tenantPrefill.phone,
                    property: tenantPrefill.property,
                    utilitiesIncluded: tenantPrefill.utilitiesIncluded,
                  })
                }
                value={tenantPrefill.name}
                type="text"
                name="tenantName"
                id="tenantName"
              />
              <br />

              <label htmlFor="">Phone Number</label>
              <input
                onChange={(event) =>
                  setTenantPrefill({
                    id: tenantPrefill.id,
                    name: tenantPrefill.name,
                    phone: event.target.value,
                    property: tenantPrefill.property,
                    utilitiesIncluded: tenantPrefill.utilitiesIncluded,
                  })
                }
                value={tenantPrefill.phone}
                type="number"
                name="tenantPhone"
                id="tenantPhone"
              />
              <br />

              <label htmlFor="">Property Leased</label>
              <input
                onChange={(event) =>
                  setTenantPrefill({
                    id: tenantPrefill.id,
                    name: tenantPrefill.name,
                    phone: tenantPrefill.phone,
                    property: event.target.value,
                    utilitiesIncluded: tenantPrefill.utilitiesIncluded,
                  })
                }
                value={tenantPrefill.property}
                type="text"
                name="propertyLeased"
                id="propertyLeased"
              />
              <br />

              <label htmlFor="">Utilities Included</label>
              <input
                onChange={(event) =>
                  setTenantPrefill({
                    id: tenantPrefill.id,
                    name: tenantPrefill.name,
                    phone: tenantPrefill.phone,
                    property: tenantPrefill.property,
                    utilitiesIncluded: event.target.checked,
                  })
                }
                type="checkbox"
                name="utilitiesIncluded"
                id="utilitiesIncluded"
              />
              <br />

              <Button type="submit" variant="contained">Update Tenant</Button>
            </form>
          </Box>
        </Modal>
      </section>
    </main>
  );
}
