import axios from "axios";
import CryptoJS from "crypto-js";
import {configZLP, ZLP_API_PATH} from "../../config";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const mcExtInfo = {};
      const request = {
        appId: configZLP.app_id,
        mcRefId: req.body.appTransID,
        hubId: "",
        driverId: "",
        amount: req.body.amount,
        receiver: {
          contact: "123"
        },
        orderInfo: req.body.orderInfo,
        mcExtInfo: JSON.stringify(mcExtInfo)
      };

      // appId|mcRefId|amount|mcExtInfo
      const data = request.appId + "|" + request.mcRefId + "|" + request.amount + "|" + request.mcExtInfo;
      request.mac = CryptoJS.HmacSHA256(data, configZLP.key1).toString();

      console.log(request);

      axios.post(configZLP.zlp_endpoint + ZLP_API_PATH.ZOD_CREATE_INVOICE, null, {params: request})
      .then(result => {
        res.status(200).json({
          orderUrl: result.data.orderUrl,
        });
      })
      .catch(err => console.log(err));
    } catch (err) {
      res.status(500).json({statusCode: 500, message: err.message});
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}