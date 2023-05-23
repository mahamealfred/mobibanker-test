import  React, { useState, useEffect,useRef }  from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import { Button, Container, Grid, Tooltip } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import "jspdf-autotable";
import { useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import ReactToPrint, { useReactToPrint } from "react-to-print";
import jwt from "jsonwebtoken";
import Typography from "@mui/material/Typography";
// import logo from "../../Assets/images/logo.png"
import { transactionsAction } from "../../redux/actions/transactionsAction";
import { useDispatch } from "react-redux";
import PrintIcon from '@mui/icons-material/Print';
import { useTranslation } from "react-i18next";
import AuthContext from "../../context";
import  {ComponentToPrintDeposit}  from "./ComponentToPrintDeposit";
import logo from "../../assets/images/logo.png";
import { getPreviousdepositTransactionsAction } from '../../redux/actions/getPreviousdepositTransactionsAction';
//import logo from "../../assets/images/logo.png"

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



export default function Transactions() {
  const { t } = useTranslation(["home","common","login"]);
 // const todaydate = new Date().toISOString().slice(0, 10);
 const { auth}=React.useContext(AuthContext)

  const getPreviousdepositTransactions = useSelector((state) => state.getPreviousdepositTransactions);

 const dispatch=useDispatch();
  const [transactionsDetails, setTransactionsDetails] = useState([]);
  const [limit, setLimit] = useState(40);
  const [selectedExamIds, setSelectedExamIds] = useState([]);
  const [results, setResults] = useState({});
  const [search, setSearch] = useState(false);
  const [numberOfTransaction,setNumberOfTransaction]=useState(0)
  const [agentName,setAgentName]=useState('')
  const [agentPhoneNumber,setAgentPhonenumber]=useState("")
  const componentRef = useRef(null);
 
 
 const [id,setId]=useState("") 
 const [amount,setAmount]=useState('') 
 const [date,setDate]=useState('')
 const [description,setDescription]=useState('')
 const [clientName,setClientName]=useState('')
 const [clientAccount,setClientAccount]=useState("")
 const [bankRefrence,setBankReference]=useState('')
 const [mobicashReference,setMobicashReference]=useState('')

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
      for (var i = 0; i < transactionsDetails.length; i++) {
        for (var key in transactionsDetails[i]) {
          if (transactionsDetails[i][key] !== null) {
            if (
                transactionsDetails[i][key].toString().toLowerCase().indexOf(toSearch) !==
              -1
            ) {
              if (!itemExists(results, transactionsDetails[i]))
                results.push(transactionsDetails[i]);
            }
          }
        }
      }
      setResults(results);
    } catch (error) {
   return error
    }
  };
 
  useEffect(() => {
    async function fecthData(){
   if(auth){
  await dispatch(getPreviousdepositTransactionsAction(auth))
   }
    }
  fecthData();
  
    }, [auth]);
    useEffect(() => {
        async function fetchData() {
          if (!getPreviousdepositTransactions.loading) {
            if (getPreviousdepositTransactions.details) {
              setTransactionsDetails(getPreviousdepositTransactions.details);
              setNumberOfTransaction(getPreviousdepositTransactions.details.length)
              setAgentPhonenumber(auth.phonenumber)
              setAgentName(auth.names)
            }
          }
        }
        fetchData();
      }, [getPreviousdepositTransactions.details]);


  const headers = [
    { label: "Collection Date", key: "collectionDate" },
    { label: "Service", key: "service" },
    { label: "Amount", key: "amount" },
    { label: "Bank reference", key: "bank_reference" },
    { label: "Mobicash reference", key: "mobicash_reference" },
  ];

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <React.Fragment>
      <Box m="10px">
      <Typography
          component="h1" variant="h6"
          color="gray"
          textAlign="center"
          padding="0 0px 10px 0px"
          sx={{ fontSize: { xs: 20 },mb:1 }}
        >
     <DialogTitle>
     <Typography id="transition-modal-title" textAlign="center" variant="h6" component="h2">
     {/* {t("common:preioustransaction")} */}
     Previous Deposit Transactions
     </Typography> 
     </DialogTitle>
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
       <StyledTableCell>Date</StyledTableCell>
       <StyledTableCell align="center">Bank reference</StyledTableCell>
       <StyledTableCell align="center">Client Account</StyledTableCell>
       <StyledTableCell align="center">Client Name</StyledTableCell>
       <StyledTableCell align="center"> Amount (Rwf)</StyledTableCell>
       <StyledTableCell align="center">Action</StyledTableCell>
     </TableRow>
   </TableHead>
   <TableBody>
  
             <>
             {transactionsDetails.slice(0, limit).map((details) => (
               <StyledTableRow  key={details.id}  selected={selectedExamIds.indexOf(details.id) !== -1} >
              <StyledTableCell component="th" scope="row">{details.date}</StyledTableCell>
               <StyledTableCell align="center">{details.bank_reference}</StyledTableCell>
               <StyledTableCell align="center">{details.client_account}</StyledTableCell>
               <StyledTableCell align="center">{details.client_name}</StyledTableCell>
               <StyledTableCell align="center">{details.deposit_amount<0?(details.deposit_amount).toLocaleString()*-1:(details.deposit_amount).toLocaleString()}</StyledTableCell>
               <StyledTableCell align="center">
               <ReactToPrint
                trigger={()=>{
                  return  <Tooltip title={t("common:receipt")} sx={{ mt: 1 }}><Button
                  startIcon={(<PrintIcon fontSize="small"   sx={{ color:"#F9842C" }}/>)}
                  sx={{ mr: 1,color:"gray"}}
                  onClick={async()=>{ 
                    await setId(details.id);
                    await  setAmount(details.deposit_amount)
                    await  setClientName(details.client_name)
                    await setClientAccount(details.client_account)
                    await  setBankReference(details.bank_reference)
                    await setDescription(details.deposit_bank_response)
                   await setMobicashReference(details.mobicore_reference)
                    await  setDate(details.date)
                  await handlePrint()
                  }
                  }
                  >
               </Button>
               </Tooltip>
                }}
              //  content={()=> componentRef.current}
                />
              
             {
              id==details.id?
              <Box style={{ display: "none" }}>
             <ComponentToPrintDeposit
                ref={componentRef}
               id={id}
               amount={amount}
               date={date}
               description={description}
               clientName={clientName}
               clientAccount={clientAccount}
               bankRefrence={bankRefrence}
               agentName={agentName}
               agentPhoneNumber={agentPhoneNumber}
               logo={logo}
               />
                </Box>
               :null
             }  
               </StyledTableCell>
             </StyledTableRow>
            ))}
            </>
      
   </TableBody>
 </Table>
</TableContainer>
</Box>
    </React.Fragment>
  );
}