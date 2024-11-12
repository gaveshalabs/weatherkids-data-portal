# WeatherKids Data Portal

Welcome to the WeatherKids Data Portal! This project is an interactive and educational web application where young users can view and engage with weather data collected from automated weather stations. The portal supports our mission to inspire children to understand climate change, participate in scientific data collection, and raise awareness about the impact of data-driven solutions.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview
The WeatherKids Data Portal provides an engaging platform for children to:
- Visualize real-time and historical weather data.
- Earn rewards for their contributions to climate science.

This project is built using Angular and integrates with Firebase for seamless data management and hosting.

## Features
- **Real-Time Data Visualization**: View and interact with live weather data using dynamic charts and maps.
- **Reward System**: Track progress and receive rewards for active participation in data collection.
- **Responsive Design**: Access the portal on various devices, ensuring a user-friendly experience.

## Technologies Used
- **Frontend**: Angular, Bootstrap, Nebular UI, Chart.js, Leaflet
- **Backend Services**: Firebase for authentication, MongoDB for database
- **Additional Libraries**: Eva Icons, ng2-charts, Moment.js

## Getting Started
### Prerequisites
- **Node.js**: Ensure that Node.js (version `^16.20.1`) is installed on your machine.
- **Angular CLI**: You can install Angular CLI globally using:
  ```bash
  npm install -g @angular/cli
  ```

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/gaveshalabs/weatherkids-data-portal.git
   cd weatherkids-data-portal
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run start
   ```
   The application will be served at `http://localhost:4200/`.

### Environment Variables
Ensure that environment variables, such as Firebase API keys, are correctly set up for development and production environments. [Details for setting up environment variables will be provided soon.]

## Scripts
- **Development Server**: `npm run start` (or `npm run start:dev` for the dev environment)
- **Production Build**: `npm run build:prod`
- **Linting**: `npm run lint` (ESLint for TypeScript and Stylelint for SCSS)
- **Unit Tests**: `npm run test`
- **Documentation**: `npm run docs` (Generates documentation using Compodoc)

For the complete list of scripts, refer to the `package.json` file.

## Deployment
Deployment is managed through Firebase. To deploy:
- **Dev Environment**: 
  ```bash
  npm run deploy:dev
  ```
- **Production Environment**: 
  ```bash
  npm run deploy:prod
  ```

Ensure you have the Firebase CLI installed and configured for your project.

## Contributing
We welcome contributions! Here are some ways you can help:
- Reporting issues
- Fixing bugs
- Suggesting new features or improvements

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions, feedback, or collaboration inquiries, please open an issue or reach out through our official channels.
