# CRM System

A customer relationship management (CRM) system for call centers, designed to improve operations management and follow-up with potential customers. The system allows for data registration, customer classification, interaction management, and provides a comprehensive dashboard for performance tracking.

## User Journeys

1. [User Authentication](docs/journeys/user-authentication.md) - Sign in and access the system using ZAPT authentication.
2. [Add New Customer](docs/journeys/add-new-customer.md) - Register a new potential customer into the system.
3. [View Customer List](docs/journeys/view-customer-list.md) - View and manage the list of customers.
4. [Edit Customer Information](docs/journeys/edit-customer-information.md) - Update customer details as needed.
5. [Sign Out](docs/journeys/sign-out.md) - Safely sign out from the system.

## Environment Variables

The following environment variables are required for the app to function correctly:

- `COCKROACH_DB_URL`: The database connection URL.
- `NPM_TOKEN`: NPM token for package installation.
- `VITE_PUBLIC_APP_ID`: The public App ID.
- `VITE_PUBLIC_APP_ENV`: The environment (e.g., production, development).
- `VITE_PUBLIC_SENTRY_DSN`: Sentry Data Source Name for error logging.
- `VITE_PUBLIC_UMAMI_WEBSITE_ID`: Umami Analytics website ID.

You need to set these variables in your deployment environment.
