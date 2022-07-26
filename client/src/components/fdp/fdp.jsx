import React from 'react'
import axios from 'axios'
const Token = localStorage.getItem("token");
const TokenApi = "prod_6nD0NB4l8FKLC/LtP/3ENOz+hDbf3I19179iQ2UUSqM="


const fdp = (id) => {
    var data = JSON.stringify({
        origin_address: {
            state: "Madame",
            line_1: "5 RUE DE LA PRÉVOYANCE",
            city: "PARIS",
            postal_code: "75019",
            contact_name: "Tene Coulibaly",
            contact_phone: "0658286380",
            contact_email: "Coulibalytene75@gmail.com"
       },
        destination_address: {
        line_1: "19 rue turgot",
        city: "PARIS",
        postal_code: "75009",
        country_alpha2: "France",
        contact_name: "John Doe",
        contact_email: "JohnDoe@gmail.com",
        state: "Madame",
        contact_phone: "0658286380"
   },
   incoterms: "DDU",
   insurance: {
        is_insured: false
   },
   courier_selection: {
        apply_shipping_rules: true
   },
   shipping_settings: {
        units: {
             weight: "kg",
             dimensions: "cm"
        }
   },
   parcels: [
        {
             total_actual_weight: 1
        },
        {
             total_actual_weight: 1
        },
        {
             total_actual_weight: 1
        }
   ]
      });

    var config = {
        method: 'POST',
        url: `https://api.easyship.com/v2/rates`,
        headers: { 
          'Accept': 'text/plain',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TokenApi}`
        }
      }


  return (
    <div></div>
  )
}

export default fdp