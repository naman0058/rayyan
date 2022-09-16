var express = require('express');
var router = express.Router();
var pool = require('./pool')


/* GET home page. */
router.get('/', function(req, res, next) {
  var query = `select id , name , logo , description from new_visa;`
  var query1 = `select id , name , logo , description1 from country;`
  var query2 = `select id , name from coaching;`
  var query3 = `select * from review;`
  var query4 = `select id , name , description1 , logo from blogs;`
  pool.query(query+query1+query2+query3+query4,(err,result)=>{
    if(err) throw err;
    else res.render('index',{result})
  })

});  




router.get('/visa/:name',(req,res)=>{
  var query = `select id , name , logo from new_visa;`
  var query1 = `select id , name , logo , description1 from country;`
  var query2 = `select id , name from coaching;`
  var query3 = `select v.countryid , v.logo,
   (select c.name from country c where c.id = v.countryid) as countryname,
   (select c.logo from country c where c.id = v.countryid) as countrylogo,
   (select c.description1 from country c where c.id = v.countryid) as countrydescription,
   (select n.logo from new_visa n where n.id = v.visaid) as visalogo,
   (select n.description from new_visa n where n.id = v.visaid) as visadescription


   from visa v where v.visaid = '${req.query.id}';`
  pool.query(query+query1+query2+query3,(err,result)=>{
    if(err) throw err;
    else res.render('countries',{result,name:req.params.name,visaid:req.query.id})
  })
})



router.get('/visa/:name/:country',(req,res)=>{
  let visaname = req.params.name.replace('-', ' ')
  var query = `select id , name , logo from new_visa;`
  var query1 = `select id , name , logo , description1 from country;`
  var query2 = `select id , name  from coaching;`
  var query3 = `select * from visa where countryid = '${req.query.countryid}' and visaid = '${req.query.visaid}';`
  var query4 = `select * from new_visa where name!= '${visaname}';`
  var query5 = `select * from instructor where countryid = '2';`
  var query6 = `select id , name from coaching;`
  var query7 = `select * from university where countryid = '3';`
  var query8 = `select * from new_visa where id = '${req.query.visaid}';`




  pool.query(query+query1+query2+query3+query4+query5+query6+query7+query8,(err,result)=>{
    if(err) throw err;
    else res.render('visa_details',{result,name:req.params.name,countryname:req.params.country})
    // else res.json(result[5])
  })
})





router.get('/country/:name',(req,res)=>{
  var query = `select id , name , logo , description from new_visa;`
  var query1 = `select id , name , logo , description1 from country;`
  var query2 = `select id , name from coaching;`
  var query3 = `select v.visaid , 
   (select c.name from new_visa c where c.id = v.visaid) as visaname,
   (select c.logo from new_visa c where c.id = v.visaid) as visalogo,
   (select c.description from new_visa c where c.id = v.visaid ) as visadescription,
   (select c.logo from country c where c.id = v.countryid) as countrylogo,
   (select c.description1 from country c where c.id = v.countryid) as countrydescription


   from visa v where v.countryid = '${req.query.id}';`
  pool.query(query+query1+query2+query3,(err,result)=>{
    if(err) throw err;
    
    // else res.json(result[3].visaname)
    else if(result[3][0]){
      res.render('visa1',{result,name:req.params.name,countryid:req.query.id})
    }
    else {
      res.render('novisa',{result,name:req.params.name,countryid:req.query.id})

    }
  })
})





router.get('/country/:country/:name',(req,res)=>{
  let visaname = req.params.name.replace('-', ' ')
  var query = `select id , name , logo from new_visa;`
  var query1 = `select id , name , logo , description1 from country;`
  var query2 = `select id , name  from coaching;`
  var query3 = `select * from visa where countryid = '${req.query.countryid}' and visaid = '${req.query.visaid}';`
  var query4 = `select * from new_visa where name!= '${visaname}';`
  var query5 = `select * from instructor where countryid = '2';`
  var query6 = `select id , name from coaching;`
  var query7 = `select * from university where countryid = '3';`
  var query8 = `select * from new_visa where id = '${req.query.visaid}';`
  





  pool.query(query+query1+query2+query3+query4+query5+query6+query7+query8,(err,result)=>{
    if(err) throw err;
    else res.render('visa_details',{result,name:req.params.name,countryname:req.params.country})
  })
})



// Done

router.get('/contact-us', function(req, res, next) {
  var query = `select id , name , logo from new_visa;`
  var query1 = `select id , name , logo from country;`
  var query2 = `select id , name from coaching;`
  pool.query(query+query1+query2,(err,result)=>{
    if(err) throw err;
    else res.render('contactus',{result})
  })

});

// Done

router.get('/blogs', function(req, res, next) {
  var query = `select id , name , logo from new_visa;`
  var query1 = `select id , name , logo from country;`
  var query2 = `select id , name from coaching;`
  var query3 = `select id , name , description1 , logo from blogs;`

  pool.query(query+query1+query2+query3,(err,result)=>{
    if(err) throw err;
    else res.render('jobs',{result})
  })

});



router.get('/blogs-details', function(req, res, next) {
  var query = `select id , name , logo from new_visa;`
  var query1 = `select id , name , logo from country;`
  var query2 = `select id , name from coaching;`
  var query3 = `select * from blogs where id = '${req.query.id}';`

  pool.query(query+query1+query2+query3,(err,result)=>{
    if(err) throw err;
    else res.render('blogs_details',{result})
  })

});


router.post('/blog-details',(req,res)=>{
  console.log(req.body)
  pool.query(`select * from blogs where id = '${req.body.blogid}'`,(err,result)=>{
    if(err) throw err;
    else res.json(result)
  })
})

// Done


router.get('/countries', function(req, res, next) {
  var query = `select id , name , logo from new_visa;`
  var query1 = `select id , name , logo , description1 from country;`
  var query2 = `select id , name from coaching;`
  pool.query(query+query1+query2,(err,result)=>{
    if(err) throw err;
    else res.render('countries1',{result})
  })

}); 

// Done


router.get('/visa', function(req, res, next) {
  var query = `select id , name , logo , description from new_visa;`
  var query1 = `select id , name , logo from country;`
  var query2 = `select id , name from coaching;`
  pool.query(query+query1+query2,(err,result)=>{
    if(err) throw err;
    else res.render('visa',{result})
  })

});

// Done

router.get('/courses', function(req, res, next) {
  var query = `select id , name , logo from new_visa;`
  var query1 = `select id , name , logo from country;`
  var query2 = `select id , name from coaching;`
  pool.query(query+query1+query2,(err,result)=>{
    if(err) throw err;
    else res.render('courses',{result})
  })

});
// Done 

router.get('/coaching/:name', function(req, res, next) {
  let coachingname = req.params.name.replace('-', ' ')

  var query = `select id , name , logo from new_visa;`
  var query1 = `select id , name , logo from country;`
  var query2 = `select id , name from coaching;`
  var query3 = `select * from coaching where name = '${coachingname}';`
  pool.query(query+query1+query2+query3,(err,result)=>{
    if(err) throw err;
    else res.render('coaching',{result})
  })

});



router.get('/university/:name', function(req, res, next) {
  let university = req.params.name.replace('-', ' ')

  var query = `select id , name , logo from new_visa;`
  var query1 = `select id , name , logo from country;`
  var query2 = `select id , name from coaching;`
  var query3 = `select * from university where name = '${university}';`
  pool.query(query+query1+query2+query3,(err,result)=>{
    if(err) throw err;
    else res.render('university_show',{result})
  })

});


// Done

router.get('/visa_details', function(req, res, next) {
  var query = `select id , name , logo from new_visa;`
  var query1 = `select id , name , logo from country;`
  var query2 = `select id , name from coaching;`
  pool.query(query+query1+query2,(err,result)=>{
    if(err) throw err;
    else res.render('visa_details',{result})
  })

});

// Done


router.get('/country_details', function(req, res, next) {
  var query = `select id , name , logo from new_visa;`
  var query1 = `select id , name , logo from country;`
  var query2 = `select id , name from coaching;`
  pool.query(query+query1+query2,(err,result)=>{
    if(err) throw err;
    else res.render('country_details',{result})
  })

});

// Done


router.get('/about-us', function(req, res, next) {
  var query = `select id , name , logo from new_visa;`
  var query1 = `select id , name , logo from country;`
  var query2 = `select id , name from coaching;`
  pool.query(query+query1+query2,(err,result)=>{
    if(err) throw err;
    else res.render('aboutus',{result})
  })

});

// not editable



router.get('/admin/login',(req,res)=>{
  res.render('admin-login',{msg:''})
})





router.post('/admin/login/verification',(req,res)=>{
  console.log('dshj',req.body)
pool.query(`select * from admin where email = '${req.body.email}' and password ='${req.body.password}'`,(err,result)=>{
  if(err) throw err;
  else if(result[0]){

         req.session.propertyadmin = result[0].id;
         res.redirect('/add-blogs')
  }
  else{
    res.render('admin-login',{msg:'Invalid Credentials'})
  }
})
})



router.get('/logout',(req,res)=>{
  req.session.propertyadmin = null;
  res.redirect('/admin/login')
})


router.get('/admin',(req,res)=>{
  if(req.session.propertyadmin){
   res.redirect('/add-blogs')
  }
  else{
    res.render('admin-login',{msg:'Invalid Credentials'})

  }
  
})



router.get('/event/delete',(req,res)=>{
  pool.query(`delete from enquiry where id = '${req.query.id}'`,(err,result)=>{
    if(err) throw err;
    else res.redirect('/admin');
  })
})




router.get('/partner',(req,res)=>{
  if(req.session.propertyadmin){
    res.render('partner')

  }
  else{
    res.render('admin-login',{msg:'Invalid Credentials'})
  }
})


router.get('/add-event',(req,res)=>{
  if(req.session.propertyadmin){
    res.render('event')

  }
  else{
    res.render('admin-login',{msg:'Invalid Credentials'})
  }
})



router.post('/partner/insert',(req,res)=>{
	let body = req.body
	console.log(req.body)
	pool.query(`insert into partner set ?`,body,(err,result)=>{
		if(err) throw err;
		else res.json({
			status:200
		})
	})
})



router.get('/partner/show',(req,res)=>{
	pool.query(`select * from partner`,(err,result)=>{
		err ? console.log(err) : res.json(result)
	})
})



router.get('/partner/delete', (req, res) => {
    const { id } = req.query
    pool.query(`delete from partner where id = ${id}`, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})

router.post('/partner/update', (req, res) => {
    console.log(req.body)
    pool.query(`update partner set ? where id = ?`, [req.body, req.body.id], (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})




router.get('/all-enquiry',(req,res)=>{
  pool.query(`select e.* , 
  (select p.name from partner p where p.id = e.vendorid) as partnername,
  (select e.name from event e where e.id = e.eventid) as eventname
  
  from enquiry e order by id desc`,(err,result)=>{
    if(err) throw err;
    else res.render('show_enquiry',{result:result})
  })
})

// /partner-enquiry


router.get('/partner-enquiry',(req,res)=>{
  pool.query(`select e.* , (select p.name from partner p where p.id = e.vendorid) as partnername,
  (select e.name from event e where e.id = e.eventid) as eventname
  
  from enquiry e
              where vendorid = '${req.query.id}' order by id desc`,(err,result)=>{
    if(err) throw err;
    else res.render('show_enquiry',{result:result})
    // else res.json(result)
  })
})


// router.get('/all-enquiry',(re,res)=>{
//   pool.query(`select e.* , (select p.name from partner p where p.id = e.vendorid) as partnername from enquiry e order by id desc`,(err,result)=>{
//     if(err) throw err;
//     else res.render('show_enquiry',{result:result})
//   })
// })





router.get('/partner/login',(req,res)=>{
  res.render('partner-login',{msg:''})
})



router.post('/partner/login/verification',(req,res)=>{
  console.log('dshj',req.body)
pool.query(`select * from partner where number = '${req.body.number}' and password ='${req.body.password}'`,(err,result)=>{
  if(err) throw err;
  else if(result[0]){

         req.session.partner = result[0].id;
         res.redirect('/enquiry')
  }
  else{
    res.render('partner-login',{msg:'Invalid Credentials'})
  }
})
})




router.get('/enquiry',(req,res)=>{
  console.log(req.session.partner)
  if(req.session.partner){

    
        var query = `select count(id) as counter from enquiry where vendorid = '${req.session.partner}' and date = CURDATE();`
        var query2 = `select count(id) as counter from enquiry where vendorid = '${req.session.partner}' and date = CURDATE();`
        pool.query(query+query2,(err,result)=>{
          if(err) throw err;
          res.render('enquiry',{msg:'',result,eventname:''})

        })

      

  }
  else{
    res.render('partner-login',{msg:'Invalid Credentials'})

  }
})





router.post('/enquiry-submit',(req,res)=>{
  let body = req.body;
  var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;


  body['date'] = today;
  body['time'] = time;
  body['vendorid'] = req.session.partner;


console.log(req.body)

pool.query(`select * from enquiry where number = '${req.body.number}'`,(err,result)=>{
  if(err) throw err;
  else if(result[0]){
    res.json({msg:'Mobile Number Already Exists'})
  }
  else{
   pool.query(`select * from enquiry where email = '${req.body.email}'`,(err,result)=>{
     if(err) throw err;
     else if(result[0]){
      res.json({msg:'Email ID Already Exists'})
     }
     else {
    pool.query(`select * from enquiry where vendorid = '${req.session.partner}' and date = CURDATE() limit 1`,(err,result)=>{
   if(err) throw err;
   else if(result[0]){
     body['eventid'] = result[0].eventid
    pool.query(`insert into enquiry set ?`,body,(err,result)=>{
      if(err) throw err;
      else res.json({msg:'Successfully Submitted'})
      // else res.send('enquiry')
    })
   }
   else{
    pool.query(`insert into enquiry set ?`,body,(err,result)=>{
      if(err) throw err;
      else res.json({msg:'Successfully Submitted'})
      // else res.send('enquiry')
    })
   }

    })
    
     }
   })
  }
})

 
})



router.get('/report',(req,res)=>{
  if(req.session.propertyadmin){
    res.render('report')

  }
  else{
    res.render('admin-login',{msg:'Invalid Credentials'})

  }
})


router.post('/show-reports',(req,res)=>{
  let body = req.body;
  console.log('dd',req.body)
  pool.query(`select e.* , (select p.name from partner p where p.id = e.vendorid) as partnername,
  (select e.name from event e where e.id = e.eventid) as eventname
  
  from enquiry e where e.date between '${req.body.from_date}' and '${req.body.to_date}' order by id desc`,(err,result)=>{
    if(err) throw err;
    else res.json(result)
  })
})




router.post('/event/insert',(req,res)=>{
	let body = req.body
	console.log(req.body)
	pool.query(`insert into event set ?`,body,(err,result)=>{
		if(err) throw err;
		else res.json({
			status:200
		})
	})
})



router.get('/event/show',(req,res)=>{
	pool.query(`select * from event`,(err,result)=>{
		err ? console.log(err) : res.json(result)
	})
})



router.get('/event/delete', (req, res) => {
    const { id } = req.query
    pool.query(`delete from event where id = ${id}`, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})

router.post('/event/update', (req, res) => {
    console.log(req.body)
    pool.query(`update event set ? where id = ?`, [req.body, req.body.id], (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})



router.get('/event-enquiry',(req,res)=>{
  pool.query(`select e.* , 
  (select p.name from partner p where p.id = e.vendorid) as partnername,
  (select e.name from event e where e.id = e.eventid) as eventname
   from enquiry e
              where eventid = '${req.query.id}' order by id desc`,(err,result)=>{
    if(err) throw err;
    else res.render('show_enquiry',{result:result})
    // else res.json(result)
  })
})




router.get('/about',(req,res)=>{
  res.render('about')
})


router.get('/faq',(req,res)=>{
  res.render('faq')
})


router.get('/contact',(req,res)=>{
  res.render('contact')
})



router.post('/subscription-details-insert',(req,res)=>{
  let body = req.body;
  console.log(req.body)
  pool.query(`insert into subscription set ?`,body,(err,result)=>{
    if(err) throw err;
    else res.json({msg:'success'})
  })
})


router.get('/tour-search',(req,res)=>{
  console.log(req.body)
  pool.query(`select * from state where countryid = '${req.query.id}'`,(err,result)=>{
    if(err) throw err;
    // else res.json(result)
    else res.render('state_show',{result})
  })
})


router.get('/details/:name/tour-search',(req,res)=>{
  pool.query(`select t.* , (select c.name from country c where c.id = t.countryid) as countryname from tour t where t.stateid = '${req.params.name}'`,(err,result)=>{
    if(err) throw err;
    else res.render('tour_show',{result})
  })
})



router.post('/migrationdata/insert',(req,res)=>{

  let body = req.body;
  var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;


  body['date'] = today;
  body['time'] = time;
  pool.query(`insert into migration_apply set ?`,body,(err,result)=>{
    if(err) throw err;
    else res.json({msg:'success'})
  })
})




router.get('/all-immigration',(req,res)=>{
  pool.query(`select e.* from migration_apply e order by id desc`,(err,result)=>{
    if(err) throw err;
    else res.render('show_migration',{result:result})
  })
})



router.get('/all-contact',(req,res)=>{
  pool.query(`select e.* , 
  (select c.name from country c where c.id = e.countryid) as countryname,
  (select c.name from new_visa c where c.id = e.visaid) as visaname

   from contact e order by id desc`,(err,result)=>{
    if(err) throw err;
    else res.render('show_contact',{result:result})
  })
})



router.get('/migration/delete',(req,res)=>{
  pool.query(`delete from migration_apply where id = '${req.query.id}'`,(err,result)=>{
    if(err) throw err;
    else res.redirect('/all-immigration');
  })
})


router.post('/contact/insert',(req,res)=>{
	let body = req.body
	console.log(req.body)
  

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;


  body['date'] = today;
  body['time'] = time;

	pool.query(`insert into contact set ?`,body,(err,result)=>{
		if(err) throw err;
		else res.json({
			status:200
		})
	})
})



router.post('/subscribe/insert',(req,res)=>{
	let body = req.body
	console.log(req.body)
  

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;


  body['date'] = today;
  body['time'] = time;
pool.query(`select * from subscribe where email = '${req.body.email}'`,(err,result)=>{
  if(err) throw err;
  else if(result[0]){
res.json({
  status : 500
})
  }
  else{
    pool.query(`insert into subscribe set ?`,body,(err,result)=>{
      if(err) throw err;
      else res.json({
        status:200
      })
    })
  }
})
	
})



router.get('/contact/delete',(req,res)=>{
  pool.query(`delete from contact where id = '${req.query.id}'`,(err,result)=>{
    if(err) throw err;
    else res.redirect('/all-contact');
  })
})



router.get('/all-subscribe',(req,res)=>{
  pool.query(`select e.* from subscribe e order by id desc`,(err,result)=>{
    if(err) throw err;
    else res.render('show_subscribe',{result:result})
  })
})




router.get('/subscribe/delete',(req,res)=>{
  pool.query(`delete from subscribe where id = '${req.query.id}'`,(err,result)=>{
    if(err) throw err;
    else res.redirect('/all-subscribe');
  })
})



module.exports = router;
