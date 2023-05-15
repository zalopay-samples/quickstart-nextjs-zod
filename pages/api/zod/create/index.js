import axios from "axios";
import CryptoJS from "crypto-js";
import {configZLP, ZLP_API_PATH} from "../../config";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const mcExtInfo = {};
      const zodInvoice = {
        appId: configZLP.app_id,
        mcRefId: req.body.mcRefId,
        hubId: "",
        driverId: "",
        amount: req.body.amount,
        receiver: req.body.receiver,
        orderInfo: req.body.orderInfo,
        mcExtInfo: JSON.stringify(mcExtInfo)
      };

      // appId|mcRefId|amount|mcExtInfo
      const data = zodInvoice.appId + "|" + zodInvoice.mcRefId + "|" + zodInvoice.amount + "|" + zodInvoice.mcExtInfo;
      zodInvoice.mac = CryptoJS.HmacSHA256(data, configZLP.key1).toString();

      console.log(zodInvoice);

      const config = {
        method: 'post',
        url: configZLP.zlp_endpoint + ZLP_API_PATH.ZOD_CREATE_INVOICE,
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(zodInvoice)
      };

      axios.request(config)
      .then(result => {
        res.status(200).json({
          orderUrl: result.data.orderUrl,
        });
      })
      .catch(err => console.log(err.response.data));
    } catch (err) {
      res.status(500).json({statusCode: 500, message: err.message});
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}