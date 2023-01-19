import React, { useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { Paper } from '@mui/material';
import QRCode from "react-qr-code";
import "./index.css";


export const OpenAccountReceipt = React.forwardRef((props, ref) => {
           
    return (
      <div ref={ref}>
		< CssBaseline/>
       <div className="wrapper">
	<div className="invoice_wrapper">
		<div className="header">
			<div className="logo_invoice_wrap">
				<div className="logo_sec">
				</div>
				<div className="invoice_sec">
                <div className="logo_sec">
					<img src="../../images/gtbanklogo.png" className='logo' alt="code logo"/>
				</div>
				</div>
			</div>
		</div>
		<div className="body">
			<div className="main_table">
				<div className="table_header">
                    <div className="left_header">
                    </div>
                    <div className="center_header">
                    <div className="row">
					<div className="col col_price"></div>
						<div className="col">OPEN ACCOUNT RECEIPT</div>
					</div>
                    </div>
                    <div className="right_header">
                    </div>
				</div>
				<div className="table_body">
					<div className="row">
                    <div className="col col_no">
						</div>
						<div className="col col_des">
							<p className="bold">Date:</p>
						</div>
						<div className="col col_total">
							<p>{moment(props.date).format("L")}</p>
						</div>
					</div>
					<div className="row">
                    <div className="col col_no">
						</div>
						<div className="col col_des">
							<p className="bold">Time:</p>
						</div>
						<div className="col col_total">
							<p>{moment(props.date).format("LTS")}</p>
						</div>
					</div>
          <div className="row">
						<div className="col col_no">
						</div>
						<div className="col col_des">
							<p className="bold">Beneficiary Name</p>
						</div>
						<div className="col col_total">
							<p>{props.names}</p>
						</div>
					</div>
          <div className="row">
						<div className="col col_no">
						</div>
						<div className="col col_des">
							<p className="bold">Beneficiary Account</p>
						</div>
						<div className="col col_total">
							<p>{props.fullAccount}</p>
						</div>
					</div>
                    <div className="row">
                    <div className="col col_no">
						</div>
						<div className="col col_des">
							<p className="bold">Phone No:</p>
							
						</div>
						<div className="col col_total">
							<p>{props.mobilePhone}</p>
						</div>
					</div>
                    
                    <div className="row">
                    <div className="col col_no">
						</div>
						<div className="col col_des">
							<p className="bold">Reference ID:</p>
						
						</div>
						<div className="col col_total">
                            
							<p>xxxxxx.xx</p>
						</div>
					</div>
                    <div className="row">
                    <div className="col col_no">
						</div>
						<div className="col col_des">
							<p className="bold">==================================================================</p>
						</div>
					
					</div>
                    <div className="row">
                    <div className="col col_no">
						</div>
						<div className="col col_des">
							<p className="bold">Agent name:</p>
							
						</div>
						<div className="col col_total">
							<p>{props.agentName}</p>
						</div>
					</div>
                    <div className="row">
                    <div className="col col_no">
						</div>
						<div className="col col_des">
							<p className="bold">Agent phone No:</p>
							
						</div>
						<div className="col col_total">
							<p>{props.agentPhonenumber}</p>
						</div>
					</div>
				</div>
			</div>
           
		</div>

		<div className="footer">
		<p>Thank you for banking with us</p>
			{/* <div className="terms">
		        <p className="tc bold">Terms & Coditions</p>
		        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit non praesentium doloribus. Quaerat vero iure itaque odio numquam, debitis illo quasi consequuntur velit, explicabo esse nesciunt error aliquid quis eius!</p>
		    </div> */}
		</div>
	</div>
</div>
      </div>
    );
  });
