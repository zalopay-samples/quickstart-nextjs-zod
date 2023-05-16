import axios from "axios";
import CryptoJS from "crypto-js";
import {configZLP, ZLP_API_PATH} from "../../config";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let params = {
        app_id: configZLP.app_id,
        mc_ref_id: req.body.mc_ref_id,
      }

      let data = params.app_id + "|" + params.mc_ref_id; // app_id|mc_ref_id
      params.mac = CryptoJS.HmacSHA256(data, configZLP.key1).toString();


      let config = {
        method: 'get',
        url: configZLP.zlp_endpoint + ZLP_API_PATH.ZOD_QUERY_INVOICE,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params
      };

      axios(config)
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