import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function TenantForm({ handleAddTenant }) {
  return (
    <form onSubmit={(event) => handleAddTenant(event)}>
      <TextField
        id="tenantName"
        label="Name"
        name="tenantName"
        variant="outlined"
        margin="normal"
      />
      <TextField
        id="tenantPhone"
        label="Phone Number"
        name="tenantPhone"
        variant="outlined"
        margin="normal"
      />
      <TextField
        id="propertyLeased"
        label="Property Leased"
        name="Property Leased"
        variant="outlined"
        margin="normal"
      />

      <div>
        <FormControlLabel
          control={<Checkbox name="utilitiesIncluded" id="utilitiesIncluded" />}
          label="Utilities Included"
        />
      </div>
      <br />
      <Button type="submit" variant="contained">
        Add Tenant
      </Button>
    </form>
  );
}
