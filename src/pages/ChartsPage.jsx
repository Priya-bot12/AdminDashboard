import { Box, Grid, Paper, Typography, useTheme, useMediaQuery } from '@mui/material';
import { BarChart } from '../components/charts/BarChart';
import { LineChart } from '../components/charts/LineChart';
import { PieChart } from '../components/charts/PieChart';

export const ChartsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const getChartHeight = () => {
    if (isMobile) return 350;
    if (isTablet) return 400;
    return 500;
  };

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Charts
        <Typography variant="body2" color="textSecondary" gutterBottom>
              This is just a sample data*
            </Typography>
      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        {[ 
          { title: 'Sales Trend', Chart: LineChart },
          { title: 'Revenue Distribution', Chart: PieChart },
          { title: 'Annual Performance', Chart: BarChart }
        ].map(({ title, Chart }, index) => (
          <Grid item xs={12} md={10} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: getChartHeight(),
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
              <Box sx={{ width: '100%', height: '100%' }}>
                <Chart />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
