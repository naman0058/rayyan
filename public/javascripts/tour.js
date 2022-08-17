
let addgroup = []
let wishes = []
let subcategories = []
let table = 'tour'

$.getJSON(`/country/show`, data => {
    addgroup = data
    console.log('leagues',data)
    fillDropDown('leagueid', data, 'Choose Country', 0)
  
})



$.getJSON(`/state/show`, data => {
  subcategories = data
    console.log('leagues',data)
    fillDropDown('stateid', [], 'Choose State', 0)
  
})


$('#leagueid').change(() => {
  const filteredData = subcategories.filter(item => item.countryid == $('#leagueid').val())
  fillDropDown('stateid', filteredData, 'Choose State', 0)
})



$('#show').click(function(){
$.getJSON(`/${table}/show`, data => {
    console.log(data)
    wishes = data
    makeTable(data)
  
})
})



$('.save').click(function(){
  if($('#name').val()==[] || $('#name').val()=="") alert('Enter Name')
  else if($('#short_name').val()==[] || $('#short_name').val()=="") alert('Enter Short Name')
  else{
   let insertObj = {
    name : $('#name').val(),
    short_name:$('#short_name').val()
   }
   $.post(`/${table}/insert`,insertObj,data=>{
    alert('Successfully Inserted')
   })
  }
})




function fillDropDown(id, data, label, selectedid = 0) {
    $(`#${id}`).empty()
    $(`#${id}`).append($('<option>').val("null").text(label))

    $.each(data, (i, item) => {
        if (item.id == selectedid) {
            $(`#${id}`).append($('<option selected>').val(item.id).text(item.name))
        } else {
            $(`#${id}`).append($('<option>').val(item.id).text(item.name))
        }
    })
}

    





function makeTable(board){
    let table = ` <div class="row mt-5">
    <div class="col">
      <div class="card bg-default shadow">
        <div class="card-header bg-transparent border-0">
          <h3 class="text-white mb-0">All Tour</h3>
          <br>
          <button type="button" id="back" class="btn btn-sm btn-primary">BacK</button>
        </div>
       
      
      
        <div class="table-responsive">
          <table class="table align-items-center table-dark table-flush">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Country Name</th>
                <th scope="col">State Name</th>
                <th scope="col">Name</th>
             
                <th scope="col">Price</th>


                <th scope="col">Image</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
                  <tr>`
                  $.each(board, function(i, item) {
                    table += `
                    
                    
                    <th scope="row">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <span class="mb-0 text-sm">${item.countryname}</span>
                        </div>
                      </div>
                    </th>
                   
                    
                    <th scope="row">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <span class="mb-0 text-sm">${item.statename}</span>
                        </div>
                      </div>
                    </th>


                     
                    <th scope="row">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <span class="mb-0 text-sm">${item.name}</span>
                        </div>
                      </div>
                    </th>
                   



                     
                   



                     
                    <th scope="row">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <span class="mb-0 text-sm">ر.ع.${item.price}</span>
                        </div>
                      </div>
                    </th>
                   
                   
                   



   <th scope="row">
            <div class="media align-items-center">
              <a href="#" class="avatar rounded-circle mr-3">
                <img alt="Image placeholder" src="/images/${item.logo}">
              </a>
              
            </div>
          </th>
         
                    <td class="text-right">
                      <div class="dropdown">
                        <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-ellipsis-v"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                       <button class=" dropdown-item btn btn-outline-success edit" id="${item.id}">Edit Data</button>
                       <button class=" dropdown-item btn btn-outline-success updateimage" id="${item.id}">Edit Image</button>
                      <button class=" dropdown-item btn btn-outline-success delete" id="${item.id}">Delete</button>
                        </div>
                      </div>
                    </td>
                  </tr>`
                  })
                  
              table +=` </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>`
      $('#result').html(table)
      $('#insertdiv').hide()
      $('#result').show()
}


$('#result').on('click', '.delete', function() {
    const id = $(this).attr('id')
    $.get(`/${table}/delete`,  { id }, data => {
        refresh()
    })
})



$('#pleagueid').change(() => {
  const filteredData = subcategories.filter(item => item.countryid == $('#pleagueid').val())
  fillDropDown('pstateid', filteredData, 'Choose State', 0)
})



$('#result').on('click', '.edit', function() {
    const id = $(this).attr('id')
    const result = wishes.find(item => item.id == id);
    fillDropDown('pleagueid', addgroup, 'Country Name', result.countryid)
    $('#pstateid').append($('<option>').val(result.stateid).text(result.statename))

    $('#editdiv').show()
    $('#insertdiv').hide() 
    $('#result').hide()
    $('#pid').val(result.id)
   $('#pprice').val(result.price)
    $('#pname').val(result.name)
    $('#pcheck_in_time').val(result.check_in_time)
    $('#pcheck_out_time').val(result.check_out_time)

    $('#pchildren').val(result.children)
    $('#pdining').val(result.dining)
    $('#pACCOMMODATION').val(result.ACCOMMODATION)
    $('#pTRANSPORT').val(result.TRANSPORT)

    $('#pinternational_flights').val(result.international_flights)
    $('#ptravel_insurance').val(result.travel_insurance)
    $('#pshort_description').val(result.short_description)
    $('#ptype').val(result.type)




    let table = `<p>${result.overview}</p>
    `
    $('.peditor').html(table)


    let table1 = `<p>${result.unique}</p>
    `
    $('.peditor1').html(table1)


    let table2 = `<p>${result.include}</p>
    `
    $('.peditor2').html(table2)


 })


 
$('#update').click(function(){  //data insert in database


  let content = $(".peditor").html().trim();

  let content1 = $(".peditor1").html().trim();

  let content2 = $(".peditor2").html().trim();



    let updateobj = {
        id: $('#pid').val(),
        name: $('#pname').val(),
        countryid:$('#pleagueid').val(),
        stateid:$('#pstateid').val(),
        price:$('#pprice').val(),
        check_in_time:$('#pcheck_in_time').val(),
        check_out_time:$('#pcheck_out_time').val(),

        children:$('#pchildren').val(),
        dining:$('#pdining').val(),
        ACCOMMODATION:$('#pACCOMMODATION').val(),
        TRANSPORT:$('#pTRANSPORT').val(),
        international_flights:$('#pinternational_flights').val(),

      travel_insurance:$('#ptravel_insurance').val(),
        short_description:$('#pshort_description').val(),
        type:$('#ptype').val(),

        overview:content,
        unique:content1,
        include:content2,





        
      
    }

    $.post(`/${table}/update`, updateobj , function(data) {
       update()
    })
})


function refresh() 
{
    $.getJSON(`/${table}/show`, data => makeTable(data))
}
function update()
{
    $('#result').show()
    $('#editdiv').hide()
    $('#insertdiv').show() 
    refresh()
    refresh()
}

//================================Page Functionality=============================//
$('#editdiv').hide()
$('#updateimagediv').hide()

$('#result').on('click', '#back', function() {
    $('#result').hide()
    $('#insertdiv').show()
})

$('#back1').click(function(){
    $('#result').show()
    $('#insertdiv').hide()
    $('#editdiv').hide()
    $('#updateimagediv').hide()

})

$('#back2').click(function(){
    $('#result').show()
    $('#insertdiv').hide()
    $('#editdiv').hide()
    $('#updateimagediv').hide()
})



$('#result').on('click', '.updateimage', function() {
    const id = $(this).attr('id')
    const result = wishes.find(item => item.id == id);
    $('#peid').val(result.id)
    $('#updateimagediv').show()
    $('#result').hide()
    $('#insertdiv').hide()
    $('#editdiv').hide()
})

//===================================Page Functioality Ends========================//