# Tenant Tracker

A web application designed for managing and organizing tenants in commercial real estate properties.

Made with:

- React.js
- DynamoDB
- Material UI

## Features

- Add new tenants
- Update existing tenant information
- Remove tenant from database
- See which properties tenants are leasing

## Tenant Schema

### Table name: Tenants

`{ id: String, name: String, phone: number, property: string, utilitiesIncluded: boolean }`

