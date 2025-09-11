import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function ModalForm({ tenantPrefill, setTenantPrefill, handleUpdateTenant }) {
  return (
    <form onSubmit={(event) => handleUpdateTenant(event)}>
      <TextField
        id="tenantName"
        label="Name"
        name="tenantName"
        variant="outlined"
        margin="normal"
        value={tenantPrefill.name}
        onChange={(event) =>
          setTenantPrefill({
            id: tenantPrefill.id,
            name: event.target.value,
            phone: tenantPrefill.phone,
            property: tenantPrefill.property,
            utilitiesIncluded: tenantPrefill.utilitiesIncluded,
          })
        }
      />
      <TextField
        id="tenantPhone"
        label="Phone Number"
        name="tenantPhone"
        variant="outlined"
        margin="normal"
        value={tenantPrefill.phone}
        onChange={(event) =>
          setTenantPrefill({
            id: tenantPrefill.id,
            name: tenantPrefill.name,
            phone: event.target.value,
            property: tenantPrefill.property,
            utilitiesIncluded: tenantPrefill.utilitiesIncluded,
          })
        }
      />
      <TextField
        id="propertyLeased"
        label="Property Leased"
        name="Property Leased"
        variant="outlined"
        margin="normal"
        value={tenantPrefill.property}
        onChange={(event) =>
          setTenantPrefill({
            id: tenantPrefill.id,
            name: tenantPrefill.name,
            phone: tenantPrefill.phone,
            property: event.target.value,
            utilitiesIncluded: tenantPrefill.utilitiesIncluded,
          })
        }
      />
      <div>
        <FormControlLabel
          control={<Checkbox name="utilitiesIncluded" id="utilitiesIncluded" />}
          label="Utilities Included"
          onChange={(event) =>
            setTenantPrefill({
              id: tenantPrefill.id,
              name: tenantPrefill.name,
              phone: tenantPrefill.phone,
              property: tenantPrefill.property,
              utilitiesIncluded: event.target.checked,
            })
          }
        />
      </div>
      <br />

      <Button type="submit" variant="contained">
        Update Tenant
      </Button>
    </form>
  );
}
