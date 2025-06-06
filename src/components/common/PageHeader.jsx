import { Typography } from '@mui/material';

export const PageHeader = ({ title, subtitle }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {subtitle}
        </Typography>
      )}
    </>
  );
};