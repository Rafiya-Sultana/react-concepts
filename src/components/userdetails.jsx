import React from 'react';
import { Table, IconButton, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, Typography, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

class UserDetailsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUser: null,
      loading: true,
      error: null,
      isModalOpen: false,
    };
  }

  // Fetch all users when the component mounts
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => this.setState({ users: data, loading: false }))
      .catch((error) => this.setState({ error: error.message, loading: false }));

    // Example of setting up a timer
    this.timer = setInterval(() => console.log('Timer active!'), 5000);
  }

  // Handle updates when `selectedUser` changes
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedUser !== this.state.selectedUser) {
      console.log('Selected user updated:', this.state.selectedUser);
    }
  }

  // Cleanup resources when the component unmounts
  componentWillUnmount() {
    console.log('Cleaning up resources...');
    clearInterval(this.timer); // Clear the example timer
  }

  // Open modal and set selected user
  handleUserClick = (user) => {
    this.setState({ selectedUser: user, isModalOpen: true });
  };

  // Close modal
  handleCloseModal = () => {
    this.setState({ isModalOpen: false, selectedUser: null });
  };

  render() {
    const { users, selectedUser, loading, error, isModalOpen } = this.state;

    const modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      height: 130,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      borderRadius: 2,
    };

    const contentStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    };

    const backButtonStyle = {
      position: "absolute",
      top: 8,
      left: 8,
    };

    return (
      <div>
        <h1>User Details App</h1>

        {/* Display loading/error for fetching users */}
        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <TableContainer component={Paper} sx={{bgcolor:'#fafafa'}}>
            <Table>
              <TableHead sx={{bgcolor:'#e0e0e0', fontWeight: 'bold'}}>
                <TableRow >
                  <TableCell sx={{fontWeight: 'bold'}}>ID</TableCell>
                  <TableCell sx={{fontWeight: 'bold'}}>Name</TableCell>
                  <TableCell sx={{fontWeight: 'bold'}}>Email</TableCell>
                  <TableCell sx={{fontWeight: 'bold'}}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => this.handleUserClick(user)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Modal for displaying user details */}
        <Modal open={isModalOpen} onClose={this.handleCloseModal}>
          <Box sx={modalStyle}>
            {selectedUser ? (
              <>
                <IconButton
                  sx={backButtonStyle}
                  onClick={this.handleCloseModal}
                >
                  <ArrowBackIosIcon />
                </IconButton>
                <Box sx={contentStyle}>
                  <Typography variant="h5" component="h2">
                    <b>User Details</b>
                  </Typography>
                  <Typography>
                    <strong>Name:</strong> {selectedUser.name}
                  </Typography>
                  <Typography>
                    <strong>Email:</strong> {selectedUser.email}
                  </Typography>
                  <Typography>
                    <strong>Phone:</strong> {selectedUser.phone}
                  </Typography>
                  <Typography>
                    <strong>Website:</strong> {selectedUser.website}
                  </Typography>
                </Box>
              </>
            ) : (
              <Typography>No User Selected</Typography>
            )}
          </Box>
        </Modal>
      </div>
    );
  }
}

export default UserDetailsApp;
