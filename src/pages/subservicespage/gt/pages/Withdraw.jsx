import  React, { useState, useEffect,useRef }  from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import

// import "./cbhiList.css";
import Box from "@mui/material/Box";
import { Alert, Button, CircularProgress, Collapse, Container, Grid, Tooltip } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { valiateNidDetailsDetailsAction } from "../../../../redux/actions/validateNidAction";
import "jspdf-autotable";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";

import { ButtonGroup, Stack } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';

import ReactToPrint, { useReactToPrint } from "react-to-print";
import jwt from "jsonwebtoken";
import Typography from "@mui/material/Typography";
// import logo from "../../Assets/images/logo.png"
import { transactionsAction } from "../../../../redux/actions/transactionsAction";
import { authorizeTransactionsAction } from '../../../../redux/actions/authorizeTransactionAction';
import { useDispatch } from "react-redux";
import PrintIcon from '@mui/icons-material/Print';
import { useTranslation } from "react-i18next";
import AuthContext from "../../../../context";
import ClearAllIcon from '@mui/icons-material/ClearAll';

import { IconButton} from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
// import  {ComponentToPrint}  from "./ComponentToPrint";
// import './style.css'
// export let amountPaid=[]

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F9842C',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function CustomizedTables() {
  const { t } = useTranslation(["home","common","login"]);
 // const todaydate = new Date().toISOString().slice(0, 10);
 const { auth}=React.useContext(AuthContext)
  const transactionsDetails = useSelector((state) => state.transactions);
  const authorizeTransaction=useSelector((state) => state.authorizeTransaction);
  const validateNid=useSelector((state)=>state.validateNid);
 const dispatch=useDispatch();
  const [agentTransactionsDetails, setAgentTransactionDetails] = useState([]);
  const [limit, setLimit] = useState(40);
  const [selectedExamIds, setSelectedExamIds] = useState([]);
  const [results, setResults] = useState({});
  const [search, setSearch] = useState(false);
  const [numberOfTransaction,setNumberOfTransaction]=useState(0)
  const [agentName,setAgentName]=useState('')
  const componentRef = useRef(null);
 const [basicAuth,setBasicAuth]=useState('')
 const [username,setUsername]=useState('')
 const [password,setPassword]=useState('')
 const [passwordError,setPasswordError]=useState('')
 const [errorMessage,setErrorMessage]=useState('');
 const [nidErrorMessage,setNidErrorMessage]=useState('');
 const [open,setOpen]=React.useState(true);
 const [openNidDialog,setOpenNidDialog]=React.useState(false);
 const [openErrorMessage,setOpenErrorMessage]=useState(false)
 const [opennidErrorMessage,setOpennidErrorMessage]=useState(true)
 const [transactionId,setTransactionId]=useState("")
 const [nidError,setNidError]=useState("")
 const [nid,setNid]=useState("") 
 const [amount,setAmount]=useState('') 
 const [date,setDate]=useState('')
 const [description,setDescription]=useState('')
 const [firstName,setFirstName]=useState("")
 const [lastName,setLastName]=useState("");
 const [placeOfIssue,setPlaceOfIssue]=useState("");
 const [documentNumber,setDocumentNumber]=useState("")
 const [image,setImage]=useState("")
  const trimString = (s) => {
    var l = 0,
      r = s.length - 1;
    while (l < s.length && s[l] === " ") l++;
    while (r > l && s[r] === " ") r -= 1;
    return s.substring(l, r + 1);
  };
  const compareObjects = (o1, o2) => {
    var k = "";
    for (k in o1) if (o1[k] !== o2[k]) return false;
    for (k in o2) if (o1[k] !== o2[k]) return false;
    return true;
  };
  const itemExists = (haystack, needle) => {
    for (var i = 0; i < haystack.length; i++)
      if (compareObjects(haystack[i], needle)) return true;
    return false;
  };
  const searchHandle = async (e) => {
    setSearch(true);
    const searchKey = e.target.value;
    // console.log(e.target.value)
    try {
      var results = [];
      const toSearch = trimString(searchKey); // trim it
      for (var i = 0; i < agentTransactionsDetails.length; i++) {
        for (var key in agentTransactionsDetails[i]) {
          if (agentTransactionsDetails[i][key] !== null) {
            if (
              agentTransactionsDetails[i][key].toString().toLowerCase().indexOf(toSearch) !==
              -1
            ) {
              if (!itemExists(results, agentTransactionsDetails[i]))
                results.push(agentTransactionsDetails[i]);
            }
          }
        }
      }
      setResults(results);
    } catch (error) {
      console.log(error);
    }
  };
  const decode= (token) => {
    const JWT_SECRET="tokensecret";
    const payload =jwt.verify(token, JWT_SECRET);
     return payload;
  }
  useEffect(() => {
  async function fecthData(){
    const token =localStorage.getItem('mobicashAuth');
    if (token) {
    const {name}=decode(token);
    const {basicAuth}=decode(token)
    setAgentName(name)
  }
  }
fecthData();

  }, []);

  useEffect(() => {
    async function fecthData(){
   if(auth){
  await dispatch(transactionsAction(auth))
   }
    }
  fecthData();
  
    }, [auth]);


  useEffect(() => {
    async function fetchData() {
      if (!transactionsDetails.loading) {
        if (transactionsDetails.details) {
          setAgentTransactionDetails(transactionsDetails.details);
          setNumberOfTransaction(transactionsDetails.details.length)
        }
      }
    }
    fetchData();
  }, [transactionsDetails.details]);
  const headers = [
    { label: "Collection Date", key: "collectionDate" },
    { label: "Service", key: "service" },
    { label: "Amount", key: "amount" },
    { label: "Bank reference", key: "bank_reference" },
    { label: "Mobicash reference", key: "mobicash_reference" },
  ];

 
  const [openApprove,setOpenApprove]=useState(false)
  const handleClose=()=>{
    setTransactionId("")
    setOpenApprove(false);
    setOpenNidDialog(false)
  }
  const handleCloseNid=()=>{
   setNidError("")
   setNid("")
    setOpenNidDialog(false)
  }

  const handleCloseErrorMessage=()=>{
   
    setOpenErrorMessage(false);
  }
  const handleClosenidErrorMessage=()=>{
   
    setOpennidErrorMessage(false);
  }

  const handleOpenApprove=(id)=>{
   authorizeTransaction.details=['']
   authorizeTransaction.error=['']
    setTransactionId(id)
    setOpenNidDialog(true)
    // setOpenApprove(true)
  }

  const handeAuthorization=async()=>{
    if(password===""){
      setPasswordError("PIN is required")
    }
   else if(transactionId){
    setPasswordError("")
    await dispatch(authorizeTransactionsAction(transactionId,auth,password))
   }

  }

  useEffect(()=>{
    async function fetchData(){
     if (!authorizeTransaction.loading) {
       if (authorizeTransaction.details.length !== 0) {
         if (authorizeTransaction.details.responseCode === 204) {
          setOpenApprove(false)
          await dispatch(transactionsAction(auth))
         } else {
           return null;
         }
       }
       if (authorizeTransaction.error) {
         setErrorMessage(authorizeTransaction.error);
         setOpenErrorMessage(true)
       }
     }
    
    }
    fetchData();
     },[authorizeTransaction.details,authorizeTransaction.error])

     const handleValidateNid=async()=>{
      
      if(nid === ""){
        setNidError("NID is required")
      }
      else{
        setNidError("")
        await dispatch(valiateNidDetailsDetailsAction({nid}))
      }
     }

     
//render Nid details
useEffect(() => {
  async function fetchData() {
    if (!validateNid.loading) {
      if (validateNid.details.length !== 0) {
        if (validateNid.details.responseCode === 100) {
         setFirstName(validateNid.details.data.foreName)
         setLastName(validateNid.details.data.surnames)
         setPlaceOfIssue(validateNid.details.data.placeOfIssue)
         setDocumentNumber(validateNid.details.data.documentNumber);
         setImage(validateNid.details.data.photo)
         setOpenNidDialog(false)
         setOpenApprove(true)
        } else {
          return null;
        }
      }
      if (validateNid.error) {
        setNidErrorMessage(validateNid.error);
        setOpennidErrorMessage(true)
      }
    }
  }
  fetchData();
}, [validateNid.details,validateNid.error]);
  return (
    <React.Fragment>


<Dialog
        open={openNidDialog}
       // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="46" color="gray" textAlign="center" >
NID VERIFICATION
          </Typography>

          <IconButton
          aria-label="close"
          onClick={handleCloseNid}
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
       
{   !nidErrorMessage ? null : (
                <Collapse in={opennidErrorMessage}>
                    <Alert severity="error"
                        action={
                            <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"onClick={handleClosenidErrorMessage}>
                        <CloseIcon
                        fontSize="inherit"/></IconButton>
                        }
                        sx={
                            {mb: 0.2}
                    }>
                        {nidErrorMessage}  
                        </Alert>
                </Collapse>
            )
        }
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <TextField
      margin="normal"
      variant="standard"
      id="1i"
      label="Enter NID"
      type="text"
      fullWidth
      required
      value={nid}
      onChange={(e)=>setNid(e.target.value)}
      helperText={nidError? nidError : ""}
      error={nidError}
      // inputProps={{ minLength: 6 }}
    />
{!validateNid.loading? 
           <Button
           type="submit"
           fullWidth
           variant="contained"
           color="warning"
           sx={{ mt: 3, mb: 2 }}
          onClick={handleValidateNid} 
         > Submit</Button>: 
         <Box sx={{ display: 'flex',justifyContent:"center" }}>
         <CircularProgress  sx={{ color: 'orange' }} />
          </Box>
         }
          </DialogContentText>
        </DialogContent>
      </Dialog>




<Dialog
        open={openApprove}
       // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="46" color="gray" textAlign="center">
       Approve transactions
          </Typography>
          <IconButton
          aria-label="close"
          onClick={handleClose}
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

{   !errorMessage ? null : (
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
        }
         <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
     
    >
        <img style={{width:120,height:100,objectFit:"contain"}} src={`data:image/png;base64,${image}`}/>
        </Box>
          <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
           {lastName +" "+firstName} 
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
           {documentNumber} 
              </Typography>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <TextField
      margin="normal"
      variant="standard"
      id="1i"
      label="Enter PIN "
      type="password"
      fullWidth
      required
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      helperText={passwordError? passwordError : ""}
      error={passwordError}
      // inputProps={{ minLength: 6 }}
    />
{!authorizeTransaction.loading? 
           <Button
           type="submit"
           fullWidth
           variant="contained"
           color="warning"
           sx={{ mt: 3, mb: 2 }}
          onClick={handeAuthorization} 
         > Approve</Button>: 
         <Box sx={{ display: 'flex',justifyContent:"center" }}>
         <CircularProgress  sx={{ color: 'orange' }} />
          </Box>
         }
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Box m="10px"
    >
      <Typography
          component="h1" variant="h6"
          color="gray"
          textAlign="center"
          padding="0 0px 10px 0px"
          sx={{ fontSize: { xs: 20 },mb:1 }}
        >
 {
     numberOfTransaction===0?<>
       <DialogTitle>
       <Typography id="transition-modal-title" textAlign="center" variant="h6" component="h2">
       {t("common:cashwithdrawal")}
     </Typography>
       </DialogTitle>
     </>:
     <DialogTitle>
        <Typography id="transition-modal-title" textAlign="center" variant="h6" component="h2">
      {/* PREVIOUS {numberOfTransaction} TRANSACTONS */}
      
      {t("common:cashwithdrawal")}
     </Typography> 
     </DialogTitle>
    } 
        </Typography>
      <Container maxWidth="lg">
      
   <Box sx={{ maxWidth: 300, position:"center", display:"flex"}}>
         <TextField
           fullWidth
           size="small"
           onChange={(e) => searchHandle(e)}
           InputProps={{
             startAdornment: (
               <InputAdornment position="start">
                 <SearchIcon fontSize="small" color="action">
                   <SearchIcon />
                 </SearchIcon>
               </InputAdornment>
             ),
           }}
           placeholder={t("common:search")}
           variant="outlined"
         />
       </Box>
    
        </Container>
      </Box> 
<Box 
 sx={{
   
   display: "block",
   justifyContent: "center",
   alignContent: "center",
   width: "100%",
   height: "auto",

}}
>
  
     <TableContainer component={Paper}>
 <Table sx={{ minWidth: 700 }} aria-label="customized table">
   <TableHead>
     <TableRow>
       <StyledTableCell>{t("common:date")}</StyledTableCell>
       <StyledTableCell align="center">{t("common:mobicashreference")}</StyledTableCell>
       <StyledTableCell align="center"> {t("common:amount")} (Rwf)</StyledTableCell>
       <StyledTableCell align="center">{t("common:description")}</StyledTableCell>
       <StyledTableCell align="center">{t("common:status")}</StyledTableCell>
       <StyledTableCell align="center">{t("common:action")}</StyledTableCell>
     </TableRow>
   </TableHead>
   <TableBody>
   {
           search?(
             <>
             {results.slice(0, limit).map((details) => (
       <StyledTableRow key={details.id}  selected={selectedExamIds.indexOf(details.id) !== -1}>
         {
                 details.type==="gtbank_agent_float_account.gtbank_client_account_withdrawal"?<>  
                 <StyledTableCell component="th" scope="row"> {details.operationDate}</StyledTableCell>
         <StyledTableCell align="center">{details.id}</StyledTableCell>
         <StyledTableCell align="center">{(details.amount ).toLocaleString()}</StyledTableCell>
         <StyledTableCell align="center">{details.responseDescription}</StyledTableCell>
         <StyledTableCell align="center">{details.autorisationStatus}</StyledTableCell>
               <StyledTableCell align="center">
                {
                  details.autorisationStatus==="pending"?
                  <Tooltip title="Approve Transaction" sx={{ mt: 1 }}>
                  <Button
                  onClick={()=>{ 
                    setTransactionId(details.id)
                    handleOpenApprove(details.id)
                  }}
                      sx={{ mr: 1,color:"gray"}}
                  >
                  <ClearAllIcon fontSize="small"   sx={{ color:"#F9842C" }} />
                  </Button>
                 </Tooltip>
                  :
                  <Tooltip title="Authorized Transaction" sx={{ mt: 1 }}>
                   
                <TaskAltIcon fontSize="small"   sx={{ color:"#90EE90" }} />
               </Tooltip>
                }
                </StyledTableCell>
         </>:null
       }
       </StyledTableRow>
     ))}
        </>
           ):(
             <>
             {agentTransactionsDetails.slice(0, limit).map((details) => (
               <StyledTableRow key={details.id}  selected={selectedExamIds.indexOf(details.id) !== -1}>
               {
                       details.type==="gtbank_agent_float_account.gtbank_client_account_withdrawal"?
                       <>
                       <StyledTableCell component="th" scope="row"> {details.operationDate}</StyledTableCell>
               <StyledTableCell align="center">{details.id}</StyledTableCell>
               <StyledTableCell align="center">{(details.amount ).toLocaleString()}</StyledTableCell>
               <StyledTableCell align="center">{details.responseDescription}</StyledTableCell>
               <StyledTableCell align="center">{details.autorisationStatus}</StyledTableCell>
               <StyledTableCell align="center">
                {
                  details.autorisationStatus==="pending"?
                  <Tooltip title="Approve Transaction" sx={{ mt: 1 }}>
                  <Button
                  onClick={()=>{ 
                    setTransactionId(details.id)
                    handleOpenApprove(details.id)
                  }}
                      sx={{ mr: 1,color:"gray"}}
                  >
                  <ClearAllIcon fontSize="small"   sx={{ color:"#F9842C" }} />
                  </Button>
                 </Tooltip>
                  :
                  <Tooltip title="Authorized Transaction" sx={{ mt: 1 }}>
                   
                <TaskAltIcon fontSize="small"   sx={{ color:"#90EE90" }} />
               </Tooltip>
                }
             
               
                </StyledTableCell>
            
               </>:null
             }
             </StyledTableRow>
            ))}
            </>
          )}
   </TableBody>
 </Table>
</TableContainer>


</Box>
    </React.Fragment>
  );
}