import React from "react";
import axios from "axios";
const Token = localStorage.getItem("token");

export const APIdelete = (id) => {

    var config = {
        method: 'get',
        url: `/api/admin/delete/${id}`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Token}`
        }
      }

      axios(config)
          .then(response => {
          return response.data;
          })
          .catch(error => {
          console.log(error);
          });
}


export const APIadd = (url, data) => {

    var config = {
        method: 'post',
        url: url,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Token}`
        }, 
        data : data
      }

      axios(config)
          .then(response => {
            return response.data;
          })
          .catch(error => {
            console.log(error);
          });
}


export const APIupdate = (url, data) => {

    var config = {
        method: 'post',
        url: url,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Token}`
        }, 
        data : data
      }

      axios(config)
          .then(response => {
          return response.data;
          })
          .catch(error => {
            console.log(error);
          });
}


export const getItem = (url, setData) => {
    const Token = localStorage.getItem("token");
    var config = {
        method: 'post',
        url: url,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Token}`
        }
      };
      
      axios(config)
      .then(response => setData(response.data))
      .catch(error => {
        console.log(error);
      });

    }


