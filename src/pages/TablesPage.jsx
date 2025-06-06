import { Box, Typography } from '@mui/material';
import { DataTable } from '../components/tables/DataTable';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  { field: 'status', headerName: 'Status', width: 130 },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'jon@snow.com', age: 35, status: 'Active' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', email: 'cersei@lannister.com', age: 42, status: 'Active' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', email: 'jaime@lannister.com', age: 45, status: 'Inactive' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', email: 'arya@stark.com', age: 16, status: 'Active' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', email: 'daenerys@targaryen.com', age: null, status: 'Pending' },
  { id: 6, lastName: 'Melisandre', firstName: null, email: 'melisandre@unknown.com', age: 150, status: 'Active' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', email: 'ferrara@clifford.com', age: 44, status: 'Inactive' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', email: 'rossini@frances.com', age: 36, status: 'Active' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', email: 'harvey@roxie.com', age: 65, status: 'Pending' },
];

export const TablesPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Data Tables
        <Typography variant="body2" color="textSecondary" gutterBottom>
               Sample data table*
      </Typography>
      </Typography>
      <Box width="80%"> {/* Optional: control table width */}
        <DataTable columns={columns} rows={rows} />
      </Box>
    </Box>
  );
};
