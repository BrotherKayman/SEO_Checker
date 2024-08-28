import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const AdminDashboard: React.FC = () => {
  const [insights, setInsights] = useState({
    totalUsers: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const transactions = [
    { id: 1, user: 'Prince Segole', amount: 'R129', date: '2024-08-24' },
    { id: 2, user: 'Jane Smith', amount: 'R199', date: '2024-08-23' },
    { id: 3, user: 'Andrew Ngumbao', amount: 'R199', date: '2024-08-12' },
    { id: 4, user: 'Veronica Madison', amount: 'R99', date: '2024-07-10' },
    { id: 5, user: 'Moses Adams', amount: 'R49', date: '2024-07-07' },
    { id: 6, user: 'John Modise', amount: 'R199', date: '2024-07-07' },
    { id: 7, user: 'Peter Handricks', amount: 'R99', date: '2024-07-07' },
  ];

  const revenueData = [
    { date: '2024-08-01', revenue: 12099 },
    { date: '2024-08-05', revenue: 15049 },
    { date: '2024-08-10', revenue: 18000 },
    { date: '2024-08-15', revenue: 22000 },
    { date: '2024-08-20', revenue: 25099 },
    { date: '2024-08-24', revenue: 30000 },
  ];

  const pieData = [
    { name: 'Total Users', value: insights.totalUsers },
    { name: 'Total Sales', value: insights.totalSales },
    { name: 'Total Revenue', value: insights.totalRevenue },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  useEffect(() => {
    setTimeout(() => {
      setInsights({
        totalUsers: 1200,
        totalSales: 300,
        totalRevenue: 48199,
      });
      setLoading(false);
    }, 1000);
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'user', headerName: 'User', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 110 },
    { field: 'date', headerName: 'Date', width: 130 },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>

          <Box mb={4}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  Revenue Trend
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => `R${value}`} />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  Insights Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h4">{insights.totalUsers}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">Total Sales</Typography>
                <Typography variant="h4">{insights.totalSales}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">Total Revenue</Typography>
                <Typography variant="h4">R{insights.totalRevenue}</Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box mt={4}>
            <Typography variant="h5" gutterBottom>
              Recent Transactions
            </Typography>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={transactions}
                columns={columns}
                paginationModel={{ pageSize: 5, page }}
                pageSizeOptions={[5]}
                onPaginationModelChange={(model) => setPage(model.page)}
              />
            </div>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AdminDashboard;
