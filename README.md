# Web Form Frontend

Web Form Frontend is a Next.js 15 project to display and manipulate API data.

## Description

This project utilizes Next.js 15, Fetch, React Table, React Hook Forms, and MUI styled components to create an application that allows users to view, manipulate, and persist submitted form data.

## Purpose

I worked on a finTech application for almost 3 years and before it went live the project was halted so I was never able to share the things I learned and built during that period with the world. My main reason for building this application is to be an example of the work I completed during that time and showcase my understanding as well as abilities regarding frontend design, form creation, data collection/presentation, and data persistence.

The second reason for building this application was to act as a companion for the C# API I built to further my skills as a software engineer.

---

Web Form Frontend is designed to work with the Web Form API application

Without both running you will not be able to visualize any data.

Web Form API => https://github.com/JamesFThomas/Web-Form-API

---

## Installation

- Clone this repo to local directory

- Install packages

```text
npm i
```

- ensure you're using Node version ^14

### Features

Each page or component performs a different http request

Home

- GET - user by email
- POST - add new user

Home Page / LoginReg Form
![Image](https://github.com/user-attachments/assets/331964f8-5efe-4b1b-b0fd-3def071d8dcb)

Registration Modal / LoginReg Form
![Image](https://github.com/user-attachments/assets/e1b165a2-70b7-4cd7-8c0d-d018376a7db4)

FormsTable

- GET - all forms
- GET - form by id
- GET - all completed forms
- PUT - update form by id#
- POST - add new form
- DELETE - remove form by id#

Forms Table
![Image](https://github.com/user-attachments/assets/31383db7-0e3c-442b-a09d-0b0f3b8faa41)

Forms Modal
![Image](https://github.com/user-attachments/assets/e7458a98-d715-48a8-82e9-a7601a5e98ad)

example API fetch

```typescript
const fetchReFetchData = useCallback(async () => {
  try {
    const fetchedData = await fetch('https://localhost:5001/Forms', {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
    });

    const data = await fetchedData.json();
    setForms(data); // set data to local component state
  } catch (error) {
    console.error('Fetch Error', error);
  }
}, []);
```

### Tests

The component tests for this application were created using the React Testing Library && Jest dependencies

### TODO

- Complete component testing suites
- Imagine users for this application and upgrade with them in mind
- Add/Create different form types
