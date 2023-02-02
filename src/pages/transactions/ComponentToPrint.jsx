import React from 'react';
import QRCode from "react-qr-code";
import "../../style.css";
//import logo from "../../assets/images/logo.png"
import CssBaseline from '@mui/material/CssBaseline';
export const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <div ref={ref}>
		< CssBaseline/>
       <div className="wrapper">
	<div className="invoice_wrapper">
		<div className="header">
			<div className="logo_invoice_wrap">
				<div className="logo_sec">
					<img src={props.logo} className='logo' alt="code logo"/>
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
					{props.date}
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
					{/* <p>Service</p>
	          		<p className="bold price">RRA Tax Payment</p> */}
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
							<p className="bold">Mobicash reference</p>
							{/* <p>Lorem ipsum dolor sit.</p> */}
						</div>
						<div className="col col_total">
						<p>{props.id}</p>
						</div>
					</div>
					<div className="row">
						<div className="col col_no">
							
						</div>
						<div className="col col_des">
							<p className="bold">description</p>
							{/* <p>Lorem ipsum dolor sit.</p> */}
						</div>
						<div className="col col_total">
							<p>{props.description}</p>
						</div>
					</div>
					<div className="row">
						<div className="col col_no">
							
						</div>
						<div className="col col_des">
							<p className="bold">Agent Name</p>
							{/* <p>Lorem ipsum dolor sit.</p> */}
						</div>
						<div className="col col_total">
							<p>{props.agentName}</p>
						</div>
					</div>
					<div className="row">
						<div className="col col_no">
							
						</div>
						<div className="col col_des">
							<p className="bold">Agent Phone</p>
							{/* <p>Lorem ipsum dolor sit.</p> */}
						</div>
						<div className="col col_total">
							<p>{props.agentPhoneNumber}</p>
						</div>
					</div>
					
					
					
					
				</div>
			</div>
			<div className="paymethod_grandtotal_wrap">
				{/* <div className="paymethod_sec">
					<p className="bold">AGENT NAME</p>
					<p>{props.agentName}</p>
				</div> */}
				<div className="grandtotal_sec">
			        <p className="bold">
			            <span>AMOUNT </span>
			        </p>
			     
			        {/* <p>
			            <span>Discount 10%</span>
			            <span>-$700</span>
			        </p> */}
			       	<p className="bold">
			            <span>Grand Total</span>
			            <span> {props.amount<0?(props.amount).toLocaleString()*-1:(props.amount).toLocaleString()} Rwf</span>
			        </p>
				</div>
			</div>
		</div>
		{/* <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
    <QRCode
    size={256}
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={props.id}
    viewBox={`0 0 256 256`}
    />
</div> */}
		<div className="footer">
		<p>Thank you for using MobiCash</p>
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