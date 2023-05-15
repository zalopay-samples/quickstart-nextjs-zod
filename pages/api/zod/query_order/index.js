import axios from "axios";
import CryptoJS from "crypto-js";
import qs from "qs";
import {configZLP, ZLP_API_PATH} from "../../config";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let postData = {
        appId: configZLP.app_id,
        mcRefId: req.body.mc_ref_id,
      }

      let data = postData.appId + "|" + postData.mcRefId; // appId|mcRefId
      postData.mac = CryptoJS.HmacSHA256(data, configZLP.key1).toString();


      let postConfig = {
        method: 'get',
        url: configZLP.zlp_endpoint + ZLP_API_PATH.ZOD_QUERY_STATUS,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(postData)
      };

      axios(postConfig)
      .then(function (response) {
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    } catch (err) {
      res.status(500).json({statusCode: 500, message: err.message});
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}