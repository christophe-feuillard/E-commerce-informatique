import React from "react";
import axios from "axios";
import { GetGlobalData } from "../../useContext/AuthProviders";
const Token = localStorage.getItem("token");

export const APIdelete = (id, setEdit) => {

    var config = {
        method: 'get',
        url: `https://localhost:8000/api/admin/delete/${id}`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Token}`
        }
      }

      axios(config)
          .then(response => console.log(response))
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


export const APIupdate = (url, data, setEdit) => {

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
          .then(response => setEdit('home'))
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
         


        export const setDiscount = (id, data, setEdit) => {
          const Token = localStorage.getItem("token");
          var config = {
              method: 'post',
              url: `/api/admin/setdiscount/${id}`,
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Token}`
              },
              data : data
            };
            
            axios(config)
            .then(response => setEdit('home'))
            .catch(error => {
              console.log(error);
            });
      
          } 


          export const removeDiscount = (elementUpdate, setEdit, setElementUpdate) => {
            const Token = localStorage.getItem("token");
            var config = {
                method: 'get',
                url: `/api/admin/removeDicount/${elementUpdate.id}`,
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${Token}`
                }
              };
              
              axios(config)
              .then(response => {setEdit('home')})
              .catch(error => {
                console.log(error);
              });
        
            } 


            export const getUsers = (setUserData) => {
              const Token = localStorage.getItem("token");
              var config = {
                  method: 'get',
                  url: `/api/admin/user`,
                  headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Token}`
                  }
                };
                
                axios(config)
                .then(response => {setUserData(response.data)})
                .catch(error => {
                  console.log(error);
                });
          
              } 

              export const updateUser = (id, data, setEdit) => {
                const Token = localStorage.getItem("token");
                var config = {
                    method: 'post',
                    url: `/api/admin/user/update/${id}`,
                    headers: { 
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${Token}`
                    },
                    data : data
                  };
                  
                  axios(config)
                  .then(response => setEdit('users'))
                  .catch(error => {
                    console.log(error);
                  });
            
                } 


                export const getCountry = (setCountry) => {
                  const Token = localStorage.getItem("token");
                  var config = {
                      method: 'get',
                      url: `/api/admin/country`,
                      headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Token}`
                      }
                    };
                    
                    axios(config)
                    .then(response => {setCountry(response.data)})
                    .catch(error => {
                      console.log(error);
                    });
              
                  }
                  
                  export const BanCountry = (data) => {
                    const Token = localStorage.getItem("token");
                    var config = {
                        method: 'post',
                        url: `/api/admin/ban/country`,
                        headers: { 
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${Token}`
                        },
                        data : data
                      };
                      
                      axios(config)
                      .then(response => console.log(response))
                      .catch(error => {
                        console.log(error);
                      });
                
                    } 


                    export const getCountryBan = (setCountryBan) => {
                      const Token = localStorage.getItem("token");
                      var config = {
                          method: 'get',
                          url: `/api/admin/countryban`,
                          headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${Token}`
                          }
                        };
                        
                        axios(config)
                        .then(response => {setCountryBan(response.data)})
                        .catch(error => {
                          console.log(error);
                        });
                  
                      }

                      export const RemoveBan = (data) => {
                        const test = {
                          "country" : data
                        }
                        const Token = localStorage.getItem("token");
                        var config = {
                            method: 'post',
                            url: `/api/admin/ban/remove`,
                            headers: { 
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${Token}`
                            },
                            data : test
                          };
                          
                          axios(config)
                          .then(response => console.log(response))
                          .catch(error => {
                            console.log(error);
                          });
                    
                        } 
