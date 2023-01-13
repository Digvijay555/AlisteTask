const { ToWords } = require('to-words')
const moment = require('moment');
module.exports = (layout) => {

    const date = new Date(layout?.InstalledDate);

    const isFirstInvoice = layout.isFirstInvoice;
    const toWords = new ToWords({
        localeCode: 'en-IN',
        converterOptions: {
            currency: true,
            ignoreDecimal: false,
            ignoreZeroCurrency: false,
            doNotAddOnly: false,
            currencyOptions: { // can be used to override defaults for the selected locale
                name: 'Rupee',
                plural: 'Rupees',
                symbol: '₹',
                fractionalUnit: {
                    name: 'Paisa',
                    plural: 'Paise',
                    symbol: '',
                },
            }
        }
    });

    if (layout?.planFrequency === "Monthly") {
        date.setDate(date.getDate() + 30)
    } else if (layout?.planFrequency === "Quarterly") {
        date.setDate(date.getDate() + 100)
    } else if (layout?.planFrequency === "Semi Annualy") {
        date.setDate(date.getDate() + 210)
    } else if (layout?.planFrequency === "Annualy") {
        date.setDate(date.getDate() + 455)
    } else if (layout?.planFrequency === "Test (Weekly)") {
        date.setDate(date.getDate() + 7)
    }
    const state = [{ value: "Delhi" }, { value: "Noida" }, { value: "Gurgaon" }, { value: "Faridabad" }, { value: "Greater Noida" }, { value: "Ghaziabad" }];
    let taxType;
    if (layout?.city === "Delhi" || layout?.city === "Gurgaon" || layout?.city === "Faridabad") {
        taxType = "IGST"
    } else {
        taxType = "CGST"
    }
    return `
    <!doctype html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <title>PDF Result Template</title>
        <style>
        .Invoice-top-header{
            height: 98px;
            display: flex;
            position: relative;
            border-bottom: 1px solid black;
         }
         .Invoice-top-header-left{
             display: grid;
            grid: 100% / auto auto
         }
         .Invoice-top-header-left img{
             width: 91px;
             margin-left: 3px;
         }
         .Invoice-logo-name{
             display: inline-block;
             font-size: 25px;
         }
         .Invoice-top-header-right{
             display: inline-block;
             margin-left: 39px;
             margin-top: 18px;
         }
         .Invoice-top-header-right-name{
             font-size: 13px;
             font-weight: bold;
         }
         .Invoice-number-detail{
            display: grid;
            grid: 100% / auto auto
             border-bottom: 1px solid black;
         }
         .Invoice-number-detail-left{
            width: 50%;
            border-right:1px solid black ;
            margin-left: 3px;
            display:inline-block;
         }
         .Invoice-number-detail-right{
             width: 50%;
             display:inline-block;
             margin-left: 3px;
         }
         .Invoice-number-detail-left td,.Invoice-number-detail-left th{
             font-size: 12px;
             text-align: left;
         }
         .Invoice-number-detail-right td,.Invoice-number-detail-right th{
             font-size: 12px;
             text-align: left;
         }
         .Invoice-number-BILL-SHIP{
             border-bottom: 1px solid black;
             display: flex;
             flex-direction:row;
             background-color: #D3D3D3;
         }
         .Invoice-number-BILL{
             width: 50%;
             font-size: 12px;
             margin-left: 3px;
             font-weight: bolder;
             border-right:1px solid black;
         }
         .Invoice-number-SHIP{
             width: 50%;
             font-size: 12px;
             margin-left: 3px;
             font-weight: bolder;
           
         }
         .Invoice-number-BILL-SHIP-cus{
             
             display: flex;
         }
         .Invoice-number-BILL-to{
             width: 267.5px;
             font-size: 12px;
             margin-left: 3px;
             font-weight: bolder;
             border-right:1px solid black;
         }
         .Invoice-number-SHIP-to{
             width: 267.5px;
             font-size: 12px;
             margin-left: 3px;
             font-weight: bolder;
         }
         .Invoice-payment-Detail{
             width: 100%;
         }
         
         .Invoice-payment-Detail table,.Invoice-payment-Detail th,.Invoice-payment-Detail td{
             border: 1px solid #454545;
             font-size: 12px;
             text-align: right;
             border-collapse: collapse;
         }
         .Invoice-payment-Detail table{
             width: 100%;
             border-left: none;
             border-right: none;
             
         }
         .Invoice-payment-Detail th,.Invoice-payment-Detail td{
             padding-left: 5px;
         }
         .Invoice-payment-Detail th{
             font-weight: bolder;
             background-color: #D3D3D3;
         }
         .Invoice-payment-Detail td{
             font-weight: bold;
         }
         .Invoice-payment-detail-total{
             display: flex;
         }
         .Invoice-payment-detail-total-left{
             width: 287.5px;
             border-right:1px solid black;
             font-size: 12px;
             font-weight: bolder;
             padding-left: 3px;
         }
         .Invoice-payment-detail-total-right{
             width: 247.5px;
             border-bottom: 1px solid black;
         }
         .Invoice-payment-detail-total-right table{
             width: 100%;
         }
         .Invoice-payment-detail-total-right th,.Invoice-payment-detail-total-right td{
             text-align: right;
             font-size: 12px;
         }
         .Invoice-payment-detail-total-left-signatur{
             width: 284.5px;
             font-size: 10px;
             padding-left: 3px;
             
         }
         .Invoice-payment-detail-total-right-signatur{
             width: 247.5px;
             height: 80px;
             border-left: 1px solid black;
         }
         .Invoice-payment-detail-singnature{
             font-size: 12px;
             width: 100%;
             height: 80px;
             display: flex;
             align-items: flex-end;
             justify-content: center;
             border-bottom: 1px solid black;
         }
         
        </style>
    </head>
    <body>    


        <div id="content" style="border: 1px solid black; width: 535px; height: 772px; margin: 5%;">
            <div class='Invoice-top-header'>
                <div class='Invoice-top-header-left'>
                    <img src={process.env.PUBLIC_URL + "/assets/icon/logoWithName.png"}></img>

                </div>
                <div>
                    <div class='Invoice-top-header-right'>
                        <div class='Invoice-top-header-right-name'>ALISTE &nbsp; TECHNOLOGIES  &nbsp; &nbsp; PRIVATE &nbsp; &nbsp;  LIMITED<br /></div>
                        <div style="font-size: 9px;">B-56,Sector-64, Noida,Gautam Buddha Nagar,Uttar Pradesh, 201301<br />India<br />GSTIN 09AAVCA8533A1ZH</div>
                    </div>
                </div>
                <div style="
                    position: absolute;
                    right: 3px;
                    bottom: 3px;
                    font-size: 21px;"
                >TAX &nbsp;&nbsp;INVOICE</div>
            </div>
            <div class='Invoice-number-detail'>
                <div class='Invoice-number-detail-left'>
                    <table>

                        <tr>
                            <td>Invoice Number</td>
                            <th>:${layout?.invoiceNumber}</th>
                        </tr>
                        <tr>
                            <td>Invoice Date</td>
                            <th>:${moment(layout?.InstalledDate).format('L')}</th>
                        </tr>


                    </table>
                </div>
                <div class='Invoice-number-detail-right'>
                    <table>


                        <tr>
                            <td>Reference #</td>
                            <th>:${layout?.generatedHex}</th>
                        </tr>
                    </table>
                </div>
            </div>
            <div class='Invoice-number-BILL-SHIP'>
                <div class='Invoice-number-BILL'>Bill To</div>
                <div class="Invoice-number-SHIP">Ship To</div>
            </div>
            <div class='Invoice-number-BILL-SHIP-cus'>
                <div class='Invoice-number-BILL-to'>
                    <div>${layout.name}</div>
                    <div>${layout?.address}</div>
                    <div>${layout?.gstName}</div>
                    <div>${layout?.gstNumber}</div>
                    <div>India</div>
                </div>
                <div class="Invoice-number-SHIP-to">
                    <div>${layout?.address}</div>
                    <div>India</div>
                </div>
            </div>
            <div class='Invoice-payment-Detail'>
                <table>
                    <tr>
                        <th rowSpan="2" style="text-align: center;">#</th>
                        <th rowSpan="2" style="text-align: left;">Item & Description</th>
                        <th rowSpan="2" style="text-align: left;">HSN/SAC</th>
                        <th rowSpan="2">Qty</th>
                        <th rowSpan="2">Rate</th>
                        <th colSpan="2" style="border-bottom: 1px solid black;">${taxType}</th>
                        <th rowSpan="2">Amount</th>
                    </tr>
                    <tr >
                        <th>%</th>
                        <th>Amt </th>
                    </tr>
                    <tr>
                        <td class='Invoice-detail-cell' style="text-align: center;">1</td>
                        
                        {
                            ${layout?.isFirstInvoice === true ?
                            `<td class='Invoice-detail-cell' style="text-align: left;">Automation -${layout?.planFrequency}<span style="font-weight: lighter;"><br />Charges for this duration (from ${moment(layout?.InstalledDate).format('L')} to ${moment(date).format('L')} )</span></td>`:
                            `<td class='Invoice-detail-cell' style="text-align: left;">${layout?.additionalInfo[0].description}</td>`
                            }
                        }

                        <td class='Invoice-detail-cell' style="text-align: left;">85365090</td>
                        <td class='Invoice-detail-cell'>${layout?.totalAppliances} pcs</td>
                        <td class='Invoice-detail-cell'>${layout?.isFirstInvoice === true ? (layout?.finalCalculatedRecursiveAmount) : layout?.additionalInfo[0].item_total}</td>
                        <td class='Invoice-detail-cell'>18%</td>
                        <td class='Invoice-detail-cell'>${layout?.isFirstInvoice === true ? ((layout?.finalCalculatedRecursiveAmount * 0.18).toFixed(2)) : ((layout?.additionalInfo[0].item_total) * 0.18).toFixed(2)}</td>
                        <td class='Invoice-detail-cell'>${layout?.isFirstInvoice === true ? (Number(layout?.finalCalculatedRecursiveAmount * 1.18).toFixed(2)) : layout?.amount}</td>
                    </tr>
                    {
                        ${layout?.isFirstInvoice === true ?
                            `<>
                               <tr>
                                    <td class='Invoice-detail-cell' style="text-align: center;">2</td>
                                    <td class='Invoice-detail-cell' style="text-align: left;">Installation</td>
                                    <td class='Invoice-detail-cell' style="text-align: left;"></td>
                                    <td class='Invoice-detail-cell'>1 pcs</td>
                                    <td class='Invoice-detail-cell'>${layout?.finalCalculatedInstallation}</td>
                                    <td class='Invoice-detail-cell'>18%</td>
                                    <td class='Invoice-detail-cell'>${(layout?.finalCalculatedInstallation * 0.18).toFixed(2)}</td>
                                    <td class='Invoice-detail-cell'>${Number(layout?.finalCalculatedInstallation * 1.18).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td class='Invoice-detail-cell' style="textAlign: center;">3</td>
                                    <td class='Invoice-detail-cell' style="text-align: left;">Security</td>
                                    <td class='Invoice-detail-cell' style="text-align: left;"></td>
                                    <td class='Invoice-detail-cell'>${layout?.totalAppliances} pcs</td>
                                    <td class='Invoice-detail-cell'>${layout?.finalCalculatedSecurity}</td>
                                    <td class='Invoice-detail-cell'></td>
                                    <td class='Invoice-detail-cell'></td>
                                    <td class='Invoice-detail-cell'>${layout?.finalCalculatedSecurity.toFixed(2)}</td>
                                </tr>
                            </>` :null
                        }
                    }
                </table>
            </div>
            <div class='Invoice-payment-detail-total'>
                <div class='Invoice-payment-detail-total-left'>
                    <div style=" font-weight: lighter; margin-top: 8px;">Total In Words</div>
            
            <div>${layout?.isFirstInvoice === true ? (toWords.convert(layout?.orignalTotalAmount.toFixed(2), { currency: true })) : (toWords.convert(((layout?.additionalInfo[0].item_total) * 1.18).toFixed(2), { currency: true }))} </div> 
        
                    <div style=" font-weight: lighter; margin-top: 8px;">Thanks for your business</div>
                </div>
                <div class='Invoice-payment-detail-total-right'>
                    <table>
                        <tr>
                            <td>Sub Total</td>
                            <td>${layout?.isFirstInvoice === true ? ((layout?.finalCalculatedRecursiveAmount + layout?.finalCalculatedSecurity + layout?.finalCalculatedInstallation).toFixed(2)) : layout?.additionalInfo[0].item_total}</td>
                        </tr>
                        <tr>
                            <td>IGST18(18%)</td>
                            <td>${layout?.isFirstInvoice === true ? (((layout?.finalCalculatedRecursiveAmount + layout?.finalCalculatedInstallation) * 0.18).toFixed(2)) : (((layout?.additionalInfo[0].item_total) * 0.18).toFixed(2))}</td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <th>Rs.${layout?.isFirstInvoice === true ? (layout?.orignalTotalAmount.toFixed(2)) : (((layout?.additionalInfo[0].item_total) * 1.18).toFixed(2))}</th>
                        </tr>
                        
                    </table>
                </div>

            </div>
            <div class='Invoice-payment-detail-total'>
                <div class='Invoice-payment-detail-total-left-signatur'>

                    <div style="margin-top:12px;">Term & Conditions :-</div>
                    <pre>Visit:- www.alistetechnologies.com/subscriptionterms</pre>


                </div>
                <div class='Invoice-payment-detail-total-right-signatur'>
                    <img src={process.env.PUBLIC_URL + "/assets/icon/signature.png"} style="
                        width: 82px;
                        position: absolute;
                        left: 394px;
                        margin-top: 2px;"
                    ></img>
                    <div class='Invoice-payment-detail-singnature'>Authorized Signature</div>
                </div>

            </div>
        </div>
    </body>
    </html>`
        ;
};

