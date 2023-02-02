import { Box, Button, CircularProgress, DialogTitle, FormControl, FormHelperText, Input, InputLabel, TextField, Typography } from '@mui/material'
import React from 'react'
import { IconButton} from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
const index = () => {
  return (
   <>
    <DialogTitle id="alert-dialog-title">
          <Typography variant="46" textAlign="center" color="gray" >
    Top Up Mobile Money
          </Typography>
          <IconButton
          aria-label="close"
          // onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        </DialogTitle>
{/* {   !errorMessage ? null : (
                <Collapse in={openErrorMessage}>
                    <Alert severity="error"
                        action={
                            <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"onClick={handleCloseErrorMessage}>
                        <CloseIcon
                        fontSize="inherit"/></IconButton>
                        }
                        sx={
                            {mb: 0.2}
                    }>
                        {errorMessage}  
                        </Alert>
                </Collapse>
            )
        } */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <TextField
      margin="normal"
      variant="standard"
      id="1i"
      label="Enter Phone Number"
      type="text"
      fullWidth
      required
      // value={password}
      // onChange={(e)=>setPassword(e.target.value)}
      // helperText={passwordError? passwordError : ""}
      // error={passwordError}
      // inputProps={{ minLength: 6 }}
    />
         <TextField
      margin="normal"
      variant="standard"
      id="1i"
      label="Enter Amount"
      type="text"
      fullWidth
      required
      // value={password}
      // onChange={(e)=>setPassword(e.target.value)}
      // helperText={passwordError? passwordError : ""}
      // error={passwordError}
      // inputProps={{ minLength: 6 }}
    />
{/* {!authorizeTransaction.loading?  */}
           <Button
           type="submit"
           fullWidth
           variant="contained"
           color="warning"
           sx={{ mt: 3, mb: 2 }}
          // onClick={handeAuthorization} 
         > Submit</Button>: 
         {/* <Box sx={{ display: 'flex',justifyContent:"center" }}>
         <CircularProgress  sx={{ color: 'orange' }} />
          </Box> */}
         {/* } */}
          </DialogContentText>
        </DialogContent>
   </>
  )
}

export default index