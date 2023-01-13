const connetToMongo = require("./db")
const express = require("express")
const axios = require('axios')

var fs = require('fs');
var pdf = require('html-pdf');
const pdfTemplate = require('./card1');

var cors = require('cors')

connetToMongo();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

app.get("/home",async(req,res)=>{
    
    var options = {
        format: "A3",
        orientation: "landscape",
        border: "10mm"
    };
//    var html = fs.readFileSync('./card.html','utf8');

   
//     pdf.create(html, options).toFile('./invoice.pdf',function(err,res){
//         if(err) return console.log(err);

//         console.log(res);
//     })

//     res.status(200);

    const layout = {
        "isFirstInvoice": true,
        "invoiceDate": "1999-01-01T00:00:00.000Z",
        "createdTime": "2022-11-02T12:20:31.000Z",
        "invoiceUrl": "https://subscriptions.alistetechnologies.com/portal/alistetechnologies/secure?CInvoiceID=2-3bb5a6d550c4a40e69dd8c0f000fc92b459c757df339048a9c789ac7a4c39d7483a8fc305b6392e625cfb4581913efb3109cc9aa38e8b559438f7041fe6e7264ab2e67f7acee8330 ",
        "zohoInvoiceNumber": "INV-000042",
        "name": "saransh gupta ",
        "teleCallerId": "Udit",
        "status": "paid",
        "subscriptionId": "3457590000000182356",
        "enteringPerson": "empty",
        "comments": "empty",
        "cancelled": false,
        "amount": 895.6,
        "problem": false,
        "invoiceNumber": 3,
        "_id": "63bc7f5365f90cc4e730992a",
        "additionalInfo": [
            {
                "item_id": "3457590000000182422",
                "product_id": "3457590000000079005",
                "name": "automation-monthly",
                "description": "Charges for this duration (from 2-November-2022 to 1-December-2022)",
                "unit": "pcs",
                "code": "a1",
                "account_id": "3457590000000000388",
                "account_name": "Sales",
                "price": 30,
                "quantity": 4,
                "discount_amount": 0,
                "item_total": 120,
                "gst_treatment_code": "",
                "tax_name": "IGST18",
                "tax_type": "tax",
                "tax_percentage": 18,
                "tax_id": "3457590000000081085",
                "product_type": "goods",
                "hsn_or_sac": "85365090",
                "item_custom_fields": [],
                "has_invalid_hsn": false
            },
            {
                "item_id": "3457590000000182418",
                "product_id": "3457590000000079014",
                "name": "Installation",
                "description": "",
                "unit": "pcs",
                "code": "ins",
                "account_id": "3457590000000000388",
                "account_name": "Sales",
                "price": 300,
                "quantity": 1,
                "discount_amount": 0,
                "item_total": 300,
                "gst_treatment_code": "",
                "tax_name": "IGST18",
                "tax_type": "tax",
                "tax_percentage": 18,
                "tax_id": "3457590000000081085",
                "product_type": "goods",
                "hsn_or_sac": "",
                "item_custom_fields": [],
                "has_invalid_hsn": false
            },
            {
                "item_id": "3457590000000182420",
                "product_id": "3457590000000079027",
                "name": "security",
                "description": "",
                "unit": "pcs",
                "code": "security",
                "account_id": "3457590000000000388",
                "account_name": "Sales",
                "price": 400,
                "quantity": 1,
                "discount_amount": 0,
                "item_total": 400,
                "gst_treatment_code": "",
                "tax_name": "",
                "tax_type": "tax",
                "tax_percentage": 0,
                "tax_id": "",
                "tax_exemption_id": "3457590000000095076",
                "tax_exemption_code": "SECURITY MONEY",
                "product_type": "goods",
                "hsn_or_sac": "",
                "item_custom_fields": [],
                "has_invalid_hsn": false
            }
        ],
        "billingDetials": [
            {
                "payment_id": "3457590000000182453",
                "payment_mode": "wallet",
                "card_type": "unknown",
                "invoice_payment_id": "3457590000000182455",
                "amount_refunded": 0,
                "gateway_transaction_id": "20221102111212800110168560096275991",
                "description": "AutoPayment has been added to INV-000042",
                "date": "2022-11-02",
                "reference_number": "20221102111212800110168560096275991",
                "amount": 895.6,
                "bank_charges": 0,
                "exchange_rate": 1,
                "last_four_digits": "",
                "settlement_status": ""
            }
        ],
        "generatedHex": "18c83d",
        "createdAt": "2023-01-09T20:55:47.018Z",
        "updatedAt": "2023-01-09T21:11:06.916Z",
        "__v": 0,
        "houseId": "636e646650ac7d02eeb519e7",
        "active": true,
        "InstallationDate": "2022-11-05T11:50:42.205Z",
        "address": "C-2/9 FIRST FLOOR YAMUNA VIHAR SHAHDARA DELHI ",
        "city": "Delhi",
        "commentTele": "",
        "zip": "110053",
        "sub_id": "636260af0826a31ad47cdf0c",
        "mandateDate": "2022-11-02T12:20:31.000Z",
        "totalAppliances": 4,
        "startTakingPaymentOverdue": false,
        "deleteRequested": false,
        "cancelRequested": false,
        "startTakingPaymentOverdue": false,
        "cancelled": false,
        "cancellationDate": "2022-12-13T10:57:23.828Z",
        "InstalledDate": "2022-11-23T12:18:40.649Z",
        "mandateDate": "2022-11-02T12:20:31.000Z",
        "houseId": "636e646650ac7d02eeb519e7",
        "addressHyperlink": "",
        "invoiceId": "",
        "dispatchStatus": "ready to dispatch",
        "dispatched": true,
        "origin": "Zoho Hosted Page",
        "teleCallerId": "Udit",
        "paymentLinkGenerated": true,
        "hostedPageId": "",
        "paymentLink": "https://subscriptions.zoho.com/hostedpage/2-3bb5a6d550c4a40e69dd8c0f000fc92b149675963254dd649f7674016b9677dff9ac4c1147caf88a75cae0d6e3a6bf71/checkout",
        "firstName": "",
        "lastName": "",
        "zip": "110053",
        "city": "Delhi",
        "address": "C-2/9 FIRST FLOOR YAMUNA VIHAR SHAHDARA DELHI ",
        "paymentStatus": "Paid",
        "totalAppliances": 4,
        "pageName": "none",
        "leadQuality": 0,
        "houseStructure": [
            {
                "roomName": "Living Room",
                "roomId": 0,
                "switchboards": [
                    {
                        "switchboardNumber": "1",
                        "appliances": {
                            "fans": 0,
                            "light": 0,
                            "ac": 0,
                            "geyser": 0,
                            "tv": 1,
                            "socket": 0,
                            "other": 0,
                            "ir": 0
                        }
                    }
                ]
            },
            {
                "roomName": "Room 1",
                "roomId": 1,
                "switchboards": [
                    {
                        "switchboardNumber": 1,
                        "appliances": {
                            "fans": 0,
                            "light": 1,
                            "ac": 0,
                            "geyser": 0,
                            "tv": 1,
                            "socket": 0,
                            "other": 0,
                            "ir": 0
                        }
                    }
                ]
            },
            {
                "roomName": "Bathroom",
                "roomId": 2,
                "switchboards": [
                    {
                        "switchboardNumber": 1,
                        "appliances": {
                            "fans": 0,
                            "light": 0,
                            "ac": 0,
                            "geyser": 1,
                            "tv": 0,
                            "socket": 0,
                            "other": 0,
                            "ir": 0
                        }
                    }
                ]
            }
        ],
        "devices": [
            "S050047",
            "S010134",
            "S010114",
            "S010108"
        ],
        "faultyDevices": [],
        "newDevices": [],
        "extraDevices": [],
        "subscription_logs": [],
        "secondarySalesPerson": "AASTHA",
        "planFrequency": "Monthly",
        "priority": false,
        "InstallationDate": "2022-11-05T11:50:42.205Z",
        "comments": "",
        "installed": true,
        "pickedForInstallation": true,
        "extra1": "false",
        "extra2": "false",
        "extra3": "false",
        "refferals": [],
        "security": 400,
        "installation": 300,
        "recursiveAmount": 120,
        "totalAmount": 895.6,
        "addOnAmount": 0,
        "discountValue": 0,
        "finalCalculatedSecurity": 400,
        "finalCalculatedInstallation": 300,
        "finalCalculatedRecursiveAmount": 120,
        "finalTotalAmount": 895.6,
        "finalAddOnAmount": 0,
        "finalDiscountValue": 0,
        "zohoSecurity": 400,
        "zohoInstallation": 300,
        "zohoRecursiveAmount": 120,
        "zohoTotalAmount": 895.6,
        "zohoAddOnAmount": 0,
        "zohoDiscountValue": 0,
        "orignalRecursiveAmount": 120,
        "orignalTotalAmount": 895.6,
        "addOns": [],
        "extraSubscriptions": [],
        "oldConfiguration": [],
        "extraSubscriptionTo": "empty",
        "partialPayment": false,
        "partialAmount": 0,
        "LayoutVisitDone": false,
        "AssignedElectritian": "empty",
        "finalInstalled": false,
        "invoiceNumber": 3,
        "isPartialPaymentClient": false,
        "onlinePayment": true,
        "paymentCarrier": "Paytm",
        "priorityNumber": 1,
        "grivience": false,
        "grivienceNumber": 0,
        "installerComments": "",
        "subscriptionStage": "installed",
        "calculatedMrr": 141.6,
        "gstName": "",
        "gstNumber": "",
        "isGstClient": false,
        "lastConnectionDetails": {
            "remoteAddress": "",
            "userAgent": ""
        },
        "active": true,
        "additionalPartialPayments": [],
        "_id": "636260af0826a31ad47cdf0c",
        "customerId": "3457590000000182357",
        "subscriptionId": "3457590000000182356",
        "generatedHex": "18c83d",
        "phone": "8447715256",
        "name": "saransh gupta ",
        "devicesAlgo": {
            "roomData": [
                {
                    "roomName": "Living Room",
                    "roomId": 0,
                    "switchboards": [
                        {
                            "switchboardNumber": "1",
                            "appliances": {
                                "fans": 0,
                                "light": 0,
                                "ac": 0,
                                "geyser": 0,
                                "tv": 1,
                                "socket": 0,
                                "other": 0,
                                "ir": 0
                            },
                            "switchBoardConfig": {
                                "1": 1,
                                "2": 0,
                                "3": 0,
                                "4": 0,
                                "5": 0,
                                "f": 0
                            }
                        }
                    ]
                },
                {
                    "roomName": "Room 1",
                    "roomId": 1,
                    "switchboards": [
                        {
                            "switchboardNumber": 1,
                            "appliances": {
                                "fans": 0,
                                "light": 1,
                                "ac": 0,
                                "geyser": 0,
                                "tv": 1,
                                "socket": 0,
                                "other": 0,
                                "ir": 0
                            },
                            "switchBoardConfig": {
                                "1": 0,
                                "2": 0,
                                "3": 0,
                                "4": 0,
                                "5": 1,
                                "f": 0
                            }
                        }
                    ]
                },
                {
                    "roomName": "Bathroom",
                    "roomId": 2,
                    "switchboards": [
                        {
                            "switchboardNumber": 1,
                            "appliances": {
                                "fans": 0,
                                "light": 0,
                                "ac": 0,
                                "geyser": 1,
                                "tv": 0,
                                "socket": 0,
                                "other": 0,
                                "ir": 0
                            },
                            "switchBoardConfig": {
                                "1": 1,
                                "2": 0,
                                "3": 0,
                                "4": 0,
                                "5": 0,
                                "f": 0
                            }
                        }
                    ]
                }
            ],
            "totalDevices": {
                "1": 2,
                "2": 0,
                "3": 0,
                "4": 0,
                "5": 1,
                "f": 0,
                "ir": 0
            }
        },
        "planId": 1,
        "createdAt": "2022-11-02T12:21:03.491Z",
        "updatedAt": "2023-01-03T04:14:35.820Z",
        "__v": 9,
        "partialPaymentAmount": 0,
        "hardwarePassed": false
    }

    let result ={
        id:12,
        name:"Rana"
    }
    pdf.create(pdfTemplate(
        layout
      ),options).toFile('./result.pdf', function(err,res){
        if (err) {
          console.log(err);
          return res.send(res);
        }
      });
    //   return res.json(res);
     res.status(200).json(result);
})


app.use('/api/user',require('./routes/user'));

app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})