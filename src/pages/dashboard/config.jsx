export const columns = [
  { field: '_id', headerName: 'ID' },
  { field: 'firstName', headerName: 'First name' },
  { field: 'lastName', headerName: 'Last name' },
  { field: 'email', headerName: 'Email' },
  {
    field: 'registrationDate', headerName: 'Registration date', type: 'dateTime', width: 230,
  },
  {
    field: 'lastLoginDate', headerName: 'Last login date', type: 'dateTime', width: 230,
  },
  { field: 'status', headerName: 'Status', width: 130 },

];
