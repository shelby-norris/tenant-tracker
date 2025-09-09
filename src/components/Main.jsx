import { useState, useEffect } from "react";
import {
  // listAllItems,
  createItem,
  updateItem,
  deleteItem,
} from "../utils/dynamo";

// Main component exported to App.jsx for more organized code

// Schema:
// id: String,
// name: String,
// phone: number,
// property: string,
// utilitiesIncluded: boolean

export default function Main() {
  return (
    <main>
      <form action="">
        <label htmlFor="">Name</label>
        <input type="text" name="" id="" />
        <br />

        <label htmlFor="">Phone Number</label>
        <input type="number" name="" id="" />
        <br />

        <label htmlFor="">Property Leased</label>
        <input type="text" name="" id="" />
        <br />

        <label htmlFor="">Utilities Included</label>
        <input type="checkbox" name="" id="" />
      </form>
    </main>
  );
}
