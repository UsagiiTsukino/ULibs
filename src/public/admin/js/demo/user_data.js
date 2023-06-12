// Call the dataTables jQuery plugin
$(document).ready(function() {
    // $('#dataTable').DataTable();
   
  
    fetchUserData()
      function formatPrice(price){
          return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
  
    function fetchUserData() {
      $.ajax({
        url: "users",
        type: "POST",
      })
        .then((data) => {
          console.log(data);
        if (data.success) {
        $('#dataTable.users').DataTable( {
          data: data.users,
          "autoWidth" : false,
          columns: [
              { data: 'avatar_img',
                render : function(data) {
                  return `<img src="${data}" width="80px">`;
                }
              },
              { data: 'displayName' },
              { data: 'username' },
              { data: 'email' },
              { data: 'phoneNumber'},
              { data: 'role'},
              { data: 'address',
                "width" : '500px'
              },
              { data: 'dob'},
              { data: 'gender'},
              { data: 'createdAt' },
              { data: 'updatedAt' },
              {
                render : function() {
                  return `
                  <div class="btn-group">                
                    <button type="button" class="btn">
                      <i class="fa-solid fa-pen-to-square text-success"></i>
                    </button>
                    <button type="button" class="btn">
                      <i class="fa-solid fa-trash text-danger"></i>
                    </button>
                  </div>
                  `
                },
              }
  
  
          ]
      } ).columns.adjust().draw();
          } else {
           console.log("Khong co data")
          }
        })
        .catch((err) => console.log(err));

    }
    
  });
  