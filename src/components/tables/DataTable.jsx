import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

export const DataTable = ({ columns, rows }) => {
  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
};