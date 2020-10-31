console.log("Future computer front-end");
let url;

$(document).ready(function(){

  //get url and port from config.json
  $.ajax({
  url : 'config.json',
  type : 'GET',
  dataType : 'json',
  success : function(configData){
    console.log(configData);
    url=`${configData.SERVER_URL}:${configData.SERVER_PORT}`;
      console.log(url);
  },
  error : function(){
    console.log('Failed to get url for mongoDB');
  }
});


// add a Course


$('#addProduct').click(function(){

    event.preventDefault();

    let coursename = $('#a-coursename').val();
    let image_url = $('#a-image_url').val();
    let description = $('#a-description').val();
    let duration = $('#a-duration').val();
    let faculty = $('#a-faculty').val();

    console.log(coursename, image_url, description, duration, faculty);

    if (coursename == '' || image_url == '' || description == '' || duration == '' || faculty == ''){
      alert('Please enter all details');
    } else {

      $.ajax({
        url :`${url}/addProduct/`,
        type :'POST',
        data:{
          coursename : coursename,
          image_url : image_url,
          description : description,
          duration : duration,
          faculty : faculty
          },
        success : function(product){
          console.log(product);
          console.log('Data saved');
          alert('Data saved');
          $('#a-coursename').val('');
          $('#a-image_url').val('');
          $('#a-description').val('');
          $('#a-duration').val('');
          $('#a-faculty').val('');
        },//success
        error:function(){
          console.log('error: cannot call api');
        }//error
      });//ajax
    }//else
  });//submit function for addProduct


  //view products
    $('#viewProducts').click(function(){
      console.log('viewProducts clicked');//checking if button click responds
      $.ajax({
      url :`${url}/allProductsFromDB`,
      type :'GET',
      dataType :'json',
      success : function(productsFromMongo){
        console.log(productsFromMongo);
        document.getElementById('productCards').innerHTML = "";
        for(let i=0; i<productsFromMongo.length; i++){
          document.getElementById('productCards').innerHTML +=
          `<div class="col col-sm-12 col-md-12 col-lg-5 jumbotron border mr-5 mb-5 px-3 py-3">
          <img class="img-thumbnail" src="${productsFromMongo[i].image_url}" alt="Image">
          <h5 class="mt-3">${productsFromMongo[i].coursename}</h5>
          <span>By </span>
          <span class="faculty">${productsFromMongo[i].faculty}</span></br>
          <span>Duration :</span>
          <span class="">${productsFromMongo[i].duration}</span></br>
          <h6 class="description">${productsFromMongo[i].description}</h6>
          </div>`;

        }

        },//success
        error:function(){
          console.log('error: cannot call api');
        }//error

      });//ajax
    });//viewProduct button

});//document.ready
