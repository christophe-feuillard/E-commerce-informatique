import axios from "axios";

export const APIdelete = (id, setEdit, token) => {

    var config = {
        method: 'get',

        url: `http://localhost:8000/api/admin/delete/${id}`,

        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }

      axios(config)
          .then(response => setEdit('home'))
          .catch(error => {
          console.log(error);
          });
}


export const APIadd = (url, data, token) => {

    var config = {
        method: 'post',
        url: url,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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


export const APIupdate = (url, data, setEdit, token) => {

    var config = {
        method: 'post',
        url: url,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }, 
        data : data
      }

      axios(config)
          .then(response => setEdit('home'))
          .catch(error => {
            console.log(error);
          });
          
}


export const getItem = (setData, token) => {
    const Token = localStorage.getItem("token");


    console.log(Token)
    var config = {
        method: 'get',

        url: 'http://localhost:8000/api/admin/show',

        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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

          url: 'http://localhost:8000/api/user/role',

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
     
      export const getStock = (setData, setIsLoading, token) => {
        var config = {
            method: 'get',

            url: 'http://localhost:8000/api/admin/showStock',

            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          };
          
          axios(config)
          .then(response => {setData(response.data); setIsLoading(false);})
          .catch(error => {
            console.log(error);
          });
    
        }      

        export const setDiscount = (id, data, setEdit, token) => {
          var config = {
              method: 'post',
              url: `http://localhost:8000/api/admin/setdiscount/${id}`,
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              data : data
            };
            
            axios(config)
            .then(response => setEdit('home'))
            .catch(error => {
              console.log(error);
            });
      
          } 


          export const removeDiscount = (elementUpdate, setEdit, setElementUpdate, token) => {
            const Token = localStorage.getItem("token");
            var config = {
                method: 'get',
                url: `http://localhost:8000/api/admin/removeDicount/${elementUpdate.id}`,
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              };
              
              axios(config)
              .then(response => {setEdit('home')})
              .catch(error => {
                console.log(error);
              });
        
            } 


            export const getUsers = (setUserData, token) => {
              var config = {
                  method: 'get',
                  url: `http://localhost:8000/api/admin/user`,
                  headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }
                };
                
                axios(config)
                .then(response => {setUserData(response.data)})
                .catch(error => {
                  console.log(error);
                });
          
              } 

              export const updateUser = (id, data, setEdit, token) => {
                var config = {
                    method: 'post',
                    url: `http://localhost:8000/api/admin/user/update/${id}`,
                    headers: { 
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                    },
                    data : data
                  };
                  
                  axios(config)
                  .then(response => setEdit('users'))
                  .catch(error => {
                    console.log(error);
                  });
            
                } 


                export const getCountry = (setCountry, token) => {
                  var config = {
                      method: 'get',
                      url: `http://localhost:8000/api/admin/country`,
                      headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                      }
                    };
                    
                    axios(config)
                    .then(response => {setCountry(response.data)})
                    .catch(error => {
                      console.log(error);
                    });
              
                  }
                  
                  export const BanCountry = (data, token) => {
        
                    var config = {
                        method: 'post',
                        url: `http://localhost:8000/api/admin/ban/country`,
                        headers: { 
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${token}`
                        },
                        data : data
                      };
                      
                      axios(config)
                      .then(response => console.log(response))
                      .catch(error => {
                        console.log(error);
                      });
                
                    } 


                    export const getCountryBan = (setCountryBan, token) => {
                      var config = {
                          method: 'get',
                          url: `http://localhost:8000/api/admin/countryban`,
                          headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                          }
                        };
                        
                        axios(config)
                        .then(response => {setCountryBan(response.data)})
                        .catch(error => {
                          console.log(error);
                        });
                  
                      }

                      export const RemoveBan = (data, token) => {
                        const test = {
                          "country" : data
                        }
                        var config = {
                            method: 'post',
                            url: `http://localhost:8000/api/admin/ban/remove`,
                            headers: { 
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`
                            },
                            data : test
                          };
                          
                          axios(config)
                          .then(response => console.log(response))
                          .catch(error => {
                            console.log(error);
                          });
                    
                        } 
