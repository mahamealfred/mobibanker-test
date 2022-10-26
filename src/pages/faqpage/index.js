import { Box, useTheme } from "@mui/material";
import Header from "../header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
// import { tokens } from "../../theme";

const data=[
  {
    id:1,
    question:"What are Mobicash agent categories?",
    answer:"Agent: means a natural person or legal entity providing payment services to the customers of MobiCash on behalf of MobiCash under a valid agent agreement,"
  },
  {
    id:2,
    question:"What are the requirements needed to become a Mobicash Agent?",
    answer:"Agent: means a natural person or legal entity providing payment services to the customers of MobiCash on behalf of MobiCash under a valid agent agreement,"
  }
]

const FAQ = () => {
  const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px"
    >
      <Grid
  // container
  // spacing={0}
  // direction="column"
  // alignItems="center"
  // justifyContent="center"
  // style={{ minHeight: '100vh' }}
>
{/* defaultExpanded */}
<Header title="FAQ"  subtitle="Frequently Asked Questions Page" />
     <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="h5" >
      ⦁	What are Mobicash agent categories?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
⦁	Agent: means a natural person or legal entity providing payment services to the customers of MobiCash on behalf of MobiCash under a valid agent agreement.<br></br>
⦁	Sub-Agents/Operator: refers to a person mandated by the agent of Mobicash who already has an agreement with Mobicash to operate under his/her account.<br></br>
⦁	Super-Agent: means a person, natural or legal, authorised by MobiCash to recruit, manage and supervise agents appointed to provide MobiCash Payment Solution services.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="h5" >
      ⦁	What are the requirements needed to become a Mobicash Agent?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      To become Mobicash agents, you must bring the following generic documents:<br></br>
⦁	Copy of company registration document (RDB Certificate or Notice of registration or RCA Certificate),<br></br>
⦁	Copies of IDs of Directors or persons playing an equivalent role,<br></br>
⦁	Criminal Record document.<br></br>
⦁	Complete agent application forms, agreement and sign a form of training acknowledgement of the platform and AML (Anti Money Laundering)/ CFT (Combating the Financing of Terrorism).
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="h5" >
      ⦁	What are Mobicash Services?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      MobiCash has partnered with government institutions as government services aggregators to provide the following services:<br></br>
      <Typography color="black" fontWeight="800">
      RRA (Rwanda Revenue Authority) 
      </Typography>
      RRA and MobiCash Rwanda have launched a new application that see taxpayers remit taxes using MobiCash powered solution.<br></br> 
      The partnership allows Mobicash, the single cashless mobile financial platform,<br></br> 
      To collect tax and non-tax fees on behalf of RRA.
      <Typography color="black" fontWeight="800">
      RSSB (Rwanda Social Security Board)
      </Typography>
      The MobiCash scheme is a result of partnership entered between RSSB and <br></br> 
      MobiCash is designed to ease subscription to the community-based health insurance <br></br> 
      (CBHI) scheme, Mutuelle de Santé.
      <Typography color="black" fontWeight="800">
      LTSS (long-Term Saving Scheme) / Ejoheza
      </Typography>
      It’s a defined contribution scheme, established on voluntary basis by opening a savings account<br></br> 
      With a scheme administrator which is Rwanda Social Security Board (RSSB)<br></br>  
      And covers both salaried and unsalaried people.
      <Typography color="black" fontWeight="800">
      RNIT (Rwanda National Investment Trust)
      </Typography>
      Mobicash platform will be used to collect and manage collective investment schemes <br></br> 
      To provide professional investment management and administration and to promote <br></br> 
      The culture of savings among nationals of Rwanda; and also to enlighten the people <br></br> 
      0f Rwanda on prospects, opportunities and risks of participating in financial markets.
      <Typography color="black" fontWeight="800">
      Electricity
      </Typography>
      To pay electricity, is one of the services provided by   Mobicash
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="h5" >
      ⦁	How do Mobicash Services operate?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      With Mcash Agent Application, a registered agent with a float can start making transactions for different services to his/her clients.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="h5" >
      ⦁	What to do when the system fails to provide a transaction receipt automatically?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      It’s true that this issue may happen when the system fails to provide a transaction receipt at time. Here what an agent needs to do is to go to the home page of the app, click on Log, and find that Transaction details in the historic report where he can be able to print it after selecting the transaction.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="h5" >
      ⦁	How to top up Mobicash float?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
To start doing Mobicash services, the Mobicash agent must transfer/ pay enough funds to one of MobiCash Ltd accounts in different banks<br></br> 
⦁	Cogebanque No. 00018-01390166908-52<br></br> 
⦁	BPR No. 400414294810248<br></br> 
⦁	GT Bank No. 2110108027<br></br> 
⦁	I&M Bank No. 25044794003<br></br> 
⦁	Equity Bank No. 4001200734926<br></br> 
⦁	Top Up Mobile Money (A phone number which is used in Mobicash system)
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="h5" >
      ⦁	What to do when the real time float top up fails?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      When the real time float top up fails an agent have to make a complain via any type of Mobicash support line and submit the float receipt to be given manually the next day.
     <Link href="https://support.mobicash.rw/" >support.mobicash.rw </Link> Phone: +250787797979
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="h5" >
      ⦁	How does the agent benefit from working with Mobicash?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      Through commissions, Commission fee is a fee paid to agents/brokers for the services they provided to the public through the MobiCash platform.
      </Typography>
    </AccordionDetails>
  </Accordion>
</Grid>   
  </Box>
  );
};

export default FAQ;
