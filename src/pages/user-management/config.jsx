export const columns = [
  { field: '_id', headerName: 'ID' },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  {
    field: 'registrationDate', headerName: 'Registration date', type: 'dateTime', width: 230,
  },
  {
    field: 'lastLoginDate', headerName: 'Last login date', type: 'dateTime', width: 230,
  },
  { field: 'status', headerName: 'Status', width: 130 },

];
