import React from "react";
import axios from "axios";
import { GetGlobalData } from "../../useContext/AuthProviders";
const Token = localStorage.getItem("token");

export const APIdelete = (id) => {

    var config = {
        method: 'get',
        url: `https://localhost:8000/api/admin/delete/${id}`,
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


export const getItem = (setData) => {
    const Token = localStorage.getItem("token");
    var config = {
        method: 'get',
        url: 'https://localhost:8000/api/admin/show',
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

    export const getRole = (setRole, setInfoPerso) => {

      const Token = localStorage.getItem("token");
      var config = {
          method: 'get',
          url: 'https://localhost:8000/api/user/role',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`
          }
        };
        
        axios(config)
        .then(response => {setInfoPerso(response.data);setRole(response.data.roles[0]);})
        .catch(error => {
          console.log(error);
        });
  
      }
     
      export const getStock = (setData, setIsLoading) => {
        const Token = localStorage.getItem("token");
        var config = {
            method: 'get',
            url: 'https://localhost:8000/api/admin/showStock',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Token}`
            }
          };
          
          axios(config)
          .then(response => {setData(response.data); setIsLoading(false);})
          .catch(error => {
            console.log(error);
          });
    
        }      

        export const getUser= (token) => {

          var config = {
              method: 'get',
              url: 'https://localhost:8000/api/user/role',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            };
            
                 axios(config)
            
      
          }
         