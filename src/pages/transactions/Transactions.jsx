import React, { useState, useEffect,useRef } from "react";
// import "./cbhiList.css";
import Box from "@mui/material/Box";
import { Button, Tooltip } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import "jspdf-autotable";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";

import { ButtonGroup, Stack } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';

import ReactToPrint, { useReactToPrint } from "react-to-print";
import jwt from "jsonwebtoken";
import Typography from "@mui/material/Typography";
// import logo from "../../Assets/images/logo.png"
import { transactionsAction } from "../../redux/actions/transactionsAction";
import { useDispatch } from "react-redux";
import PrintIcon from '@mui/icons-material/Print';
import { useTranslation } from "react-i18next";
import  {ComponentToPrint}  from "./ComponentToPrint";
import './style.css'
export let amountPaid=[]
const data = [
  {
    collectionDate: "12/12/2021",
    amount: 12000,
    service: "CBI",
    bank_reference: 125353663763,
    mobicash_reference: 1224255252,
  },
  {
    collectionDate: "04/06/2021",
    amount: 2000,
    service: "CBI",
    bank_reference: 115353663763,
    mobicash_reference: 13424255252,
  },
  {
    collectionDate: "03/06/2021",
    amount: 30000,
    service: "RRA",
    bank_reference: 132353663763,
    mobicash_reference: 15624255252,
  },
];

function Transactions() {
  const { t } = useTranslation(["home","common","login"]);
 // const todaydate = new Date().toISOString().slice(0, 10);
  const transactionsDetails = useSelector((state) => state.transactions);
 const dispatch=useDispatch();
  const [agentTransactionsDetails, setAgentTransactionDetails] = useState([]);
  const [limit, setLimit] = useState(5);
  const [selectedExamIds, setSelectedExamIds] = useState([]);
  const [results, setResults] = useState({});
  const [search, setSearch] = useState(false);
  const [numberOfTransaction,setNumberOfTransaction]=useState(0)
  const [agentName,setAgentName]=useState('')
  const componentRef = useRef(null);
 const [basicAuth,setBasicAuth]=useState('')
 const [username,setUsername]=useState('')
 const [password,setPassword]=useState('')
 
 const [id,setId]=useState("") 
 const [amount,setAmount]=useState('') 
 const [date,setDate]=useState('')
 const [description,setDescription]=useState('')

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
    const {username}=decode(token)
    const {password}=decode(token)
    await dispatch(transactionsAction(username,password))
    setAgentName(name)
    setPassword(password)
    setUsername(username)
    setBasicAuth(basicAuth)
  }
  }
fecthData();

  }, []);


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

 
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
    
      <div className="home">

        <div className="tableDisplay">
        {
          numberOfTransaction===0?<>
            <DialogTitle>
            <Typography variant="h6" textAlign="center" color="text.primary" >
           {t("common:previous40transaction")}
          </Typography>
            </DialogTitle>
          </>:
          <DialogTitle>
           <Typography variant="h6" textAlign="center" color="text.primary" 
           >
           {/* PREVIOUS {numberOfTransaction} TRANSACTONS */}
           {t("common:previous40transaction")}
          </Typography> 
          </DialogTitle>
         } 
          <Box component="div" sx={{ display: "inline" }}>
            <Box>
              <div className="datecontent">
                <Stack component="form" noValidate spacing={3}>
                  <ButtonGroup variant="text" aria-label="text button group">
                    {/* <Button onClick={generatePdf}>Generate PDF</Button> */}
                    <Button>
                      {data?.length && (
                        <CSVLink
                          headers={headers}
                          data={data}
                          filename="results.csv"
                          target="_blank"
                        >
                          {/* Generate Csv */}
                        </CSVLink>
                      )}
                    </Button>
                  </ButtonGroup>
                </Stack>
                <Box sx={{ maxWidth: 400, position:"center", display:"flex"}}>
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
              </div>
            </Box>
          </Box>
          
          <TableContainer component={Paper}>
            <Table aria-label="caption table">
              <caption className="textTitle">{t("common:previous40transaction")}</caption>
              <TableHead>
                <TableRow>
                  <TableCell align="center"> {t("common:mobicashreference")}</TableCell>
                  <TableCell> {t("common:date")}</TableCell>
                  <TableCell align="center"> {t("common:amount")} (Rwf)</TableCell>
                  <TableCell align="center"> {t("common:description")}</TableCell>
                  <TableCell align="center"> {t("common:action")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                search?(
                  <>
                  {results.slice(0, limit).map((details) => (
                  <TableRow
                    hover
                    key={details.id}
                    selected={selectedExamIds.indexOf(details.id) !== -1}
                  >
                    <TableCell align="center">{details.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {details.operationDate}
                    </TableCell>
                    <TableCell align="center"> {(details.amount * -1).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                    <TableCell align="center">{details.responseDescription}</TableCell>
                    <TableCell align="center">
                    <ReactToPrint
                trigger={()=>{
                  return  <Tooltip title={t("common:receipt")} sx={{ mt: 1 }}><Button
                  startIcon={(<PrintIcon fontSize="small"   sx={{ color:"#F9842C" }}/>)}
                  sx={{ mr: 1,color:"gray"}}
                  onClick={async()=>{ 
                    await setId(details.id);
                    await setAmount(details.amount)
                    await setDate(details.operationDate)
                    await setDescription(details.description)
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
             <ComponentToPrint
                ref={componentRef}
               id={id}
               amount={amount}
               date={date}
               description={description}
               agentName={agentName}
               />
                </Box>
               :null
             }  
                    </TableCell>
                  </TableRow>
                ))}
                  </>
                ):(
                  <>
                  {agentTransactionsDetails.slice(0, limit).map((details) => (
                  <TableRow
                    hover
                    key={details.id}
                    selected={selectedExamIds.indexOf(details.id) !== -1}
                  >
                    <TableCell align="center">{details.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {details.operationDate}
                    </TableCell>
                    <TableCell align="center"> {(details.amount * -1).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                    <TableCell align="center">{details.responseDescription}</TableCell>
                    <TableCell align="center">
                <ReactToPrint
                trigger={()=>{
                  return  <Tooltip title={t("common:receipt")} sx={{ mt: 1 }}><Button
                  startIcon={(<PrintIcon fontSize="small"   sx={{ color:"#F9842C" }}/>)}
                  sx={{ mr: 1,color:"gray"}}
                  onClick={async()=>{ 
                    await setId(details.id);
                    await setAmount(details.amount)
                    await setDate(details.operationDate)
                    await setDescription(details.description)
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
             <ComponentToPrint
                ref={componentRef}
               id={id}
               amount={amount}
               date={date}
               description={description}
               agentName={agentName}
               />
                </Box>
               :null
             }
              
                    </TableCell>
                  </TableRow>
                ))}
                  </>
                )}
                
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default Transactions;