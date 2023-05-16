import axios from "axios";
import CryptoJS from "crypto-js";
import qs from "qs";
import {configZLP, ZLP_API_PATH} from "../../config";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let params = {
        appId: configZLP.app_id,
        mcRefId: req.body.mcRefId,
      }

      let data = params.appId + "|" + params.mcRefId; // appId|mcRefId
      params.mac = CryptoJS.HmacSHA256(data, configZLP.key1).toString();

      let config = {
        method: 'get',
        url: configZLP.zlp_endpoint + ZLP_API_PATH.ZOD_QUERY_STATUS,
        headers: {
          'Content-Type': 'application/json'
        },
        params
      };

      axios(config)
      .then(function (response) {
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
    } catch (err) {
      res.status(500).json({statusCode: 500, message: err.message});
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}