import { useState, useEffect } from "react";
import {
  createItem,
  updateItem,
  deleteItem,
  listAllItems,
} from "../utils/dynamo";

// Main component exported to App.jsx for more organized code

// Schema:
// id: String,
// name: String,
// phone: number,
// property: string,
// utilitiesIncluded: boolean

export default function Main() {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    (async () => {
      const items = await listAllItems("Tenants");
      console.log(items);

      setTenants(items);
    })();
  }, []);

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

  return (
    <main>
      <h2>New Tenant Intake Form</h2>
      <form onSubmit={(event) => handleAddTenant(event)}>
        <label htmlFor="">Name</label>
        <input type="text" name="tenantName" id="tenantName" />
        <br />

        <label htmlFor="">Phone Number</label>
        <input type="number" name="tenantPhone" id="tenantPhone" />
        <br />

        <label htmlFor="">Property Leased</label>
        <input type="text" name="propertyLeased" id="propertyLeased" />
        <br />

        <label htmlFor="">Utilities Included</label>
        <input
          type="checkbox"
          name="utilitiesIncluded"
          id="utilitiesIncluded"
        />
        <br />

        <button type="submit">Add Tenant</button>
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
                  </div>
                );
              })}
          </div> // If tenants are greater than 0, div will display them all
        )}
      </section>
    </main>
  );
}
