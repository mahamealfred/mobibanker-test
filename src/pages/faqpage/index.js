import { Box, useTheme } from "@mui/material";
import Header from "../header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";




const FAQ = () => {
  const theme = useTheme();

  return (
    <Box m="10px"
    >
      <Grid

>

<Header title="" subtitle="FAQ" />
     <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="body1" >
      +	What are Mobicash agent categories?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography color="gray"  variant="body2">
⦁	Agent: means a natural person or legal entity providing payment services to the customers of MobiCash on behalf of MobiCash under a valid agent agreement.<br></br>
⦁	Sub-Agents/Operator: refers to a person mandated by the agent of Mobicash who already has an agreement with Mobicash to operate under his/her account.<br></br>
⦁	Super-Agent: means a person, natural or legal, authorised by MobiCash to recruit, manage and supervise agents appointed to provide MobiCash Payment Solution services.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="body1" >
      +	What are the requirements needed to become a Mobicash Agent?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography color="gray" variant="body1">
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
      <Typography color="gray" variant="body1" >
      +	What are Mobicash Services?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography color="gray" variant="body2">
      MobiCash has partnered with government institutions as government services aggregators to provide the following services:<br></br>
      <Typography color="black" variant="body2" fontWeight="800">
      RRA (Rwanda Revenue Authority) 
      </Typography>
      RRA and MobiCash Rwanda have launched a new application that see taxpayers remit taxes using MobiCash powered solution.<br></br> 
      The partnership allows Mobicash, the single cashless mobile financial platform,<br></br> 
      To collect tax and non-tax fees on behalf of RRA.
      <Typography color="black" variant="body2" fontWeight="800">
      RSSB (Rwanda Social Security Board)
      </Typography>
      The MobiCash scheme is a result of partnership entered between RSSB and <br></br> 
      MobiCash is designed to ease subscription to the community-based health insurance <br></br> 
      (CBHI) scheme, Mutuelle de Santé.
      <Typography color="black" variant="body2" fontWeight="800">
      LTSS (long-Term Saving Scheme) / Ejoheza
      </Typography>
      It’s a defined contribution scheme, established on voluntary basis by opening a savings account<br></br> 
      With a scheme administrator which is Rwanda Social Security Board (RSSB)<br></br>  
      And covers both salaried and unsalaried people.
      <Typography color="black" variant="body2" fontWeight="800">
      RNIT (Rwanda National Investment Trust)
      </Typography>
      Mobicash platform will be used to collect and manage collective investment schemes <br></br> 
      To provide professional investment management and administration and to promote <br></br> 
      The culture of savings among nationals of Rwanda; and also to enlighten the people <br></br> 
      0f Rwanda on prospects, opportunities and risks of participating in financial markets.
      <Typography color="black" variant="body2" fontWeight="800">
      Electricity
      </Typography >
      To pay electricity, is one of the services provided by   Mobicash
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="body1" >
      +	How do Mobicash Services operate?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography color="gray" variant="body2">
      With Mcash Agent Application, a registered agent with a float can start making transactions for different services to his/her clients.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="body1" >
      +	What to do when the system fails to provide a transaction receipt automatically?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography color="gray" variant="body2">
      It’s true that this issue may happen when the system fails to provide a transaction receipt at time. Here what an agent needs to do is to go to the home page of the app, click on Log, and find that Transaction details in the historic report where he can be able to print it after selecting the transaction.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="body1" >
      +	How to top up Mobicash float?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography color="gray" variant="body2">
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
      <Typography color="gray" variant="body1" >
      +	What to do when the real time float top up fails?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography color="gray" variant="body2">
      When the real time float top up fails an agent have to make a complain via any type of Mobicash support line and submit the float receipt to be given manually the next day.
     <Link href="https://support.mobicash.rw/" >support.mobicash.rw </Link> Phone: +250787797979
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="body1" >
      +	How does the agent benefit from working with Mobicash?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography color="gray" variant="body2">
      Through commissions, Commission fee is a fee paid to agents/brokers for the services they provided to the public through the MobiCash platform.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="body1" >
      +	How are commissions paid?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography color="gray" variant="body2">
Commissions are paid every month on the float account of the agent. In the agent system there are two accounts: 
float account and commission account, when the commissions are paid the amount moves from commission account and are added to float account.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="body1" >
      +	What is fraud? and some examples of fraud
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography color="gray" variant="body2">
“Fraud” is a deliberate act (or failure to act) with the intention of obtaining an unauthorized benefit, either for oneself or for the institution, by using deception or false suggestions or suppression of truth or other unethical means, which are believed and relied upon by others.<br></br> 
Some categories comprise fraud types that impact agents are:<br></br> 
⦁	Common frauds affecting agents mainly involve float loss in the agent’s account arising from unauthorized use and compromising of PINs.<br></br> 
⦁	Agents who defraud customers primarily through OTC transactions, e.g overcharging for transactions, such as direct deposits or charging for normal deposits, which are typically free<br></br> 
⦁	Fake receipts provided by agents while giving services to customers.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="body1" >
      +	Does MobiCash Agent Application compatible in every device?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography color="gray" variant="body2">
      “It’s compatible with both devices (smartphone and computers)”.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="body1" >
      +	What is OS Ticket and how is it important to Mobicash agent?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography color="gray" variant="body2">
      OS Ticket is a system implemented by MobiCash in order to provide better and quick services to its agents. It is a system in which an agent can get support, guidance and more information about MobiCash services in Rwanda.
     The OS Ticket link is <Link href="https://support.mobicash.rw/">support.mobicash.rw</Link> 
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="body1" >
      +	What should I do when I pay RRA/MUSA and those payments didn’t reach the RRA/RSSB system?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography color="gray" variant="body2">
      It’s true this may happen and what you should do is to send us your issue on any type of MobiCash support line <Link href="https://support.mobicash.rw/">(support.mobicash.rw)</Link> Phone:/+250787797979. So that your issue may be followed up and be solved as soon as possible.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="body1" >
      +	What can I do if I have forgotten my pin?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography color="gray" variant="body2">
      If you forget your PIN, click on the forget PIN button and follow the instructions to change it.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="body1" >
      +	What is the minimum float for new agents?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography color="gray" variant="body2">
The minimum float for new agent is 100,000 Rwf.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="body1">
      +	What can I do if I want to change my profile?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography color="gray" variant="body2">
      If you want to change something on your profile, click on the change profile button and follow the instructions and you will be able to change where you want.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="body1" >
      +	What is the minimum amount to pay on Mutuelle de santé?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography color="gray" variant="body2">
The minimum amount to pay MUSA is 1000Rwf 
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="body1" >
      +	What are the requirements when you want to close your account?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography color="gray" variant="body2">
      When you want to close your account, write a letter requesting it, and have a float on the account indicating where it will be transferred if the account is closed.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="body1" >
      +	How do I access my account from a new device?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography color="gray" variant="body2">
    
The agent application must be installed in that new device, and then you will use the same credentials you used in old device.

      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion  >
    <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
      <Typography color="gray" variant="body1" >
      +	What to do if I made a transaction and amount is deducted two times on my account?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography color="gray" variant="body2">
      What you do is call the support number +250787797979 or submit your issue on the OS ticket <Link href="https://support.mobicash.rw/">(support.mobicash.rw)</Link>, and provide the necessary information to resolve the issue.
      </Typography>
    </AccordionDetails>
  </Accordion>
</Grid>   
  </Box>
  );
};

export default FAQ;
