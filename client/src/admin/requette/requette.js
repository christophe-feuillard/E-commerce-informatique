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


export const getItem = (setData) => {
    const Token = localStorage.getItem("token");
    var config = {
        method: 'get',
        url: '/api/admin/show',
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
          url: '/api/user/role',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`
          }
        };
        
        axios(config)
        .then(response => {setInfoPerso(response.data); setRole(response.data.roles[0]);})
        .catch(error => {
          console.log(error);
        });
  
      }
     
      export const getStock = (setData, setIsLoading) => {
        const Token = localStorage.getItem("token");
        var config = {
            method: 'get',
            url: '/api/admin/showStock',
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


