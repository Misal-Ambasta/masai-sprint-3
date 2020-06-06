
// Result = where to show all the result found
var result = document.getElementById('result')

 

function dateDiffInDays(a, b) 
{
  // Discard the time and time-zone information.
  var postedDate = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    //   console.log(postedDate+'posted')
  var currentDate = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((currentDate - postedDate) / (1000 * 60 * 60 * 24));
}


function renderJobs(data)
{
    // All the variables

    var total_jobs = data.length // total jobs found out
    var company
    var company_logo_url
    var created_at
    var title
    var location
    var jobtype
    var company_url

    
    
    var jobs = data[0]
      
    console.log(jobs)

    result.style.marginTop="25px"

    var div_total_job = document.createElement('div') // creatiing div element for total job found
    div_total_job.textContent= total_jobs+" Job Found"
    div_total_job.style.color="gold"
    div_total_job.style.fontSize="22px"

    result.append(div_total_job) // appending total jobs

    var current_date = new Date()

    
    console.log(current_date)
    //loop through object

    for(var i=0; i<total_jobs; i++)
    {
        // all the data stored in respective variables
        company = data[i].company
        title= data[i].title
        company_url=data[i].url
        jobtype=data[i].type
        location = data[i].location
        created_at=data[i].created_at
        company_logo_url = data[i].company_logo
        // console.log(company)

        // Posted Date difference Calculation
        created_at=data[i].created_at
        created_at = new Date(created_at)

        var difference = dateDiffInDays(created_at, current_date);
        console.log(typeof difference )

        var para_title = document.createElement('a')    // a tag for job title
        var div = document.createElement('div')     // data to be render in this box
        var div_inner = document.createElement('div') // inner box for all text 
        var img_div = document.createElement('div') // box for company logo
        var p_Cname = document.createElement('div') // div element for Company name
        var div_jobtype =document.createElement('div')
        var logo_img = document.createElement('img')    //for company logo
        var location_div = document.createElement('div')
        var posted_day_before = document.createElement('div')
        
        // date 
        if(difference!=1)
        {
            posted_day_before.textContent=difference+" days ago Posted"
        }
        else{
            posted_day_before.textContent=difference+" day ago Posted"
        }
        
        posted_day_before.style.color="white"

        div.style.margin="10px"
        div.style.padding="10px"
        div.style.border= "1px solid black"
        result.style.flexDirection="column"

        // a tag for for job title
        para_title.href=company_url
        para_title.textContent=title
        para_title.style.color="cadetblue"
        
        
        //Company name details
        p_Cname.textContent="Company Name : "+company
        p_Cname.style.color="peru"
        p_Cname.style.marginTop="10px"

        //Location of job details
        location_div.textContent=location;
        location_div.style.color="rgb(29, 163, 96)"

        //Jobtype details
        div_jobtype.textContent=jobtype
        div_jobtype.style.color="teal"

        //company logo details
        logo_img.src=company_logo_url
        logo_img.alt="Company logo"
        logo_img.style.color="black"
        img_div.append(logo_img)
        img_div.style.float="left"
        logo_img.style.width="90px"
        
        //style for inner box
        div_inner.style.float="left"
        div_inner.style.width="80%"


        // appending data on inner box which stores all texts
        div_inner.append(para_title,p_Cname,div_jobtype,location_div,posted_day_before)

        // appending inner and logo box
        div.append(div_inner,img_div)

        
        div.style.width="97%"
        div.style.borderRadius="5px"
        
        //appending in result div
       result.append(div)
    }
   
}




function jobSearch()
{   
    result.textContent=""

    // Getting details from input
    var description = document.getElementById('description').value
    var location = document.getElementById('location').value
    var jobtype = document.getElementById('type').value
    
    var xhr =new XMLHttpRequest()

    var gitJob_url = new URL('https://jobs.github.com/positions.json')

    
    // Adding queries in url
    gitJob_url.searchParams.set('description', description)
    gitJob_url.searchParams.set('location', location)


    // if jobtype is true then it's a Full time input from user
    if( jobtype == 'true')
    {   
        gitJob_url.searchParams.set('full_time', true)
    }
        
    
    xhr.open('GET', gitJob_url)
   
    xhr.send()

   
    xhr.onerror = function () {
        alert("Server Error! Please Refresh the page");
      };

    xhr.onload = function(){
        var data =JSON.parse(this.response)
        
        if(xhr.status ==200)
        {
            renderJobs(data)
        }
        else{
            alert("Server Error! Please Refresh the page");
        }
        
    }

}




window.addEventListener('load', function(){
    
    var search = document.getElementById('search')

    search.addEventListener('click', jobSearch)

})