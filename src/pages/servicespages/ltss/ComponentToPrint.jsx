import React, { useRef } from 'react';
import moment from 'moment';
import { Paper } from '@mui/material';
import "../../../style.css"
import QRCode from "react-qr-code";
export const ComponentToPrint = React.forwardRef((props, ref) => {
           
    return (
      <div ref={ref}>
       <div className="wrapper">
	<div className="invoice_wrapper">
		<div className="header">
			<div className="logo_invoice_wrap">
				<div className="logo_sec">
					<img src="../../images/logo.png" className='logo' alt="code logo"/>
					<div className="title_wrap">
						{/* <p className="title bold">Coding Boss</p>
						<p className="sub_title">Privite Limited</p> */}
					</div>
				</div>
				<div className="invoice_sec">
					<p className="invoice bold">Receipt</p>
					<p className="invoice_no">
						<span className="bold">VALIDATION</span>
						<span>*745*3#</span>
					</p>
					<p className="date">
						<span className="bold">Date</span>
						<span>{moment(props.dateTime).format("llll")}</span>
					</p>
				</div>
			</div>
			<div className="bill_total_wrap">
				<div className="bill_sec">
        <p className="bold name">MobiCash Ltd</p>
					
					<p>Tel: (+250)787797979</p> 
			        <span>
			           Remera, Rukiri 1, Kigali, Rwanda<br/>
			         KN3 3Road, Gasabo District
			        </span>
				</div>
				<div className="total_wrap">
					<p>Service</p>
	          		<p className="bold price">LTSS EjoHeza</p>
				</div>
			</div>
		</div>
		<div className="body">
			<div className="main_table">
				<div className="table_header">
					<div className="row">
					<div className="col col_des"></div>
						
						<div className="col col_des">DETAILS</div>
					</div>
				</div>
				<div className="table_body">
					<div className="row">
						<div className="col col_no">
							
						</div>
						<div className="col col_des">
							<p className="bold">Beneficiary Name</p>
							{/* <p>Lorem ipsum dolor sit.</p> */}
						</div>
						{/* <div className="col col_price">
							<p>$350</p>
						</div>
						<div className="col col_qty">
							<p>2</p>
						</div> */}
						<div className="col col_total">
							<p>{props.payerName}</p>
						</div>
					</div>
					<div className="row">
						<div className="col col_no">
							
						</div>
						<div className="col col_des">
							<p className="bold">Beneficiary NID</p>
							{/* <p>Lorem ipsum dolor sit.</p> */}
						</div>
						{/* <div className="col col_price">
							<p>$350</p>
						</div>
						<div className="col col_qty">
							<p>2</p>
						</div> */}
						<div className="col col_total">
							<p>{props.formData.nId}</p>
						</div>
					</div>
					<div className="row">
						<div className="col col_no">
							
						</div>
						<div className="col col_des">
							<p className="bold">Mobicash reference</p>
							{/* <p>Lorem ipsum dolor sit.</p> */}
						</div>
						{/* <div className="col col_price">
							<p>$120</p>
						</div>
						<div className="col col_qty">
							<p>1</p>
						</div> */}
						<div className="col col_total">
							<p>{props.transactionId}</p>
						</div>
					</div>
					
					<div className="row">
						<div className="col col_no">
							
						</div>
						<div className="col col_des">
							<p className="bold">Description</p>
							{/* <p>Lorem ips</p> */}
						</div>
						{/* <div className="col col_price">
							<p>$150</p>
						</div>
						<div className="col col_qty">
							<p>1</p>
						</div> */}
						<div className="col col_total">
							<p>LTSS EjoHeza</p>
						</div>
					</div>
				</div>
			</div>
			<div className="paymethod_grandtotal_wrap">
				<div className="paymethod_sec">
					<p className="bold">AGENT NAME</p>
					<p>NSANZINEZA JEAN CLAUDE</p>
				</div>
				<div className="grandtotal_sec">
			        <p className="bold">
			            <span>AMOUNT PAID</span>
			            <span>{props.amount.toLocaleString()} Rwf</span>
			        </p>
					<p>
			            <span>Client Charges</span>
			            <span> Rwf</span>
			        </p>
			       	<p className="bold">
			            <span>Grand Total</span>
			            <span>{props.amount.toLocaleString()} Rwf</span>
				
			        </p>
				</div>
			</div>
		</div>
		<div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
    <QRCode
    size={256}
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={props.transactionId}
    viewBox={`0 0 256 256`}
    />
   </div>
		<div className="footer">
			<p>Thank you and Best Wishes</p>
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