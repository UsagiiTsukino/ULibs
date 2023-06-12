// Call the dataTables jQuery plugin
$(document).ready(function() {

 

  fetchUserData()
	function formatPrice(price){
		return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}

  function fetchUserData() {
    $.ajax({
      url: "products",
      type: "POST",
    })
      .then((data) => {
        console.log(data);
        if (data.success) {
      $('#dataTable.products').DataTable( {
        data: data.books,
        columns: [
            { data: 'image',
              render : function(data) {
                return `<img src="${data}" width="80px">`;
              }
            },
            { data: 'bookName' },
            { data: 'authorName' },
            { data: 'catelogy' },
            { data: 'price',
              render : function(data) {
                return `${formatPrice(data)} đ`;
              },
            },
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
    } );
        } else {
         console.log("Khong co data")
        }
      })
      .catch((err) => console.log(err));

  }
  
});
