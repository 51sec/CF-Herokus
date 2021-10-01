# CF-Herokus

Heroku free plan is only providing 550 hours usage per month. In this case, multiple Heroku instances can cover the usages for whole month.  

This script is just to let Cloudflare easily proxy to multiple Heroku instances based on odd number days or plural number days. 
  <br/>
  <br/>
  
# Demo Site
This demo site is to list a onedrive content through web page. 
https://myod.51sec.eu.org or https://myod.51sec1.workers.dev

There are two Heroku Apps behind above URL.<br/>
  -https://myod1.herokuapp.com/  <br/>
  -https://myod2.herokuapp.com/

# Related post

 https://blog.51sec.org/2021/04/deploy-onemanager-to-heroku-and-bypass.html
   <br/>
  <br/>

# Steps

## 1. create Multiple Herohu apps
Basically, you will need two Heroku apps.
For example, I created my first one as : https://myod1.herokuapp.com/
and my second one as : https://myod2.herokuapp.com/
Since both apps are used to list files at onedrive, they are basically showing same content. 
  <br/>
  <br/>

## 2. Create a new Cloudflare Worker
Then you will use Cloudflare workers to rotate the access to those two apps using the javascript in this project. 
Create a new worker:
<img src="https://photos.51sec.org/file/test1-51sec/2021/10/chrome_yzM67uvvxi.png" width = 640>
  <br/>
  <br/>
## 3. Paste the code into left script panel,save and deploy
<img src="https://photos.51sec.org/file/test1-51sec/2021/10/chrome_VvF2DtfQ4t.png" width = 640>

  <br/>
  <br/>
  
## 4. Option step: create your own dns record and add a route to your worker.
<img src="https://photos.51sec.org/file/test1-51sec/2021/10/chrome_3gFhRrekzE.png" width = 640>
This is an optional steps. If you do not have your own domain, you can still use subdomain from workers.dev. such as my example one: https://myod.51sec1.workers.dev
If you got your own domain, you can visit your site using your own subdomain:  https://myod.51sec.eu.org
  <br/>
  <br/>
  
# Video
You can check video at https://youtu.be/aJ0SEUSeDZ4 for how to use Cloudflare workers. 

# Code
  <br/>

```

// odd days
const SingleDay = 'abc.herokuapp.com'
// plural days
const DoubleDay = 'xyz.herokuapp.com'
// Using CF to do porxy? true/false
const CFproxy = true

// Heroku only has 550 hours/month for free plan by default. 
// This CloudFlare Workers code can let use different Heroku app based on odd or even number's day. 
// Please change above code for your Heroku's app in either SingleDay or Doubleday parameter. 

addEventListener('fetch', event => {
    let nd = new Date();
    if (nd.getDate()%2) {
        host = SingleDay
    } else {
        host = DoubleDay
    }
    if (!CFproxy) {
        let url=new URL(event.request.url);
        if (url.protocol == 'http:') {
            url.protocol = 'https:'
            response = Response.redirect(url.href);
            event.respondWith( response );
        } else {
            url.hostname=host;
            let request=new Request(url,event.request);
            event.respondWith( fetch(request) )
        }
    } else {
        event.respondWith( fetchAndApply(event.request) );
    }
})

async function fetchAndApply(request) {
    let response = null;
    let url = new URL(request.url);
    if (url.protocol == 'http:') {
        url.protocol = 'https:'
        response = Response.redirect(url.href);
        return response;
    }
    url.host = host;

    let method = request.method;
    let body = request.body;
    let request_headers = request.headers;
    let new_request_headers = new Headers(request_headers);

    new_request_headers.set('Host', url.host);
    new_request_headers.set('Referer', request.url);

    let original_response = await fetch(url.href, {
        method: method,
        body: body,
        headers: new_request_headers
    });

    response = new Response(original_response.body, {
        status: original_response.status,
        headers: original_response.headers
    })

    return response;
}

```
  <br/>
  <br/>
