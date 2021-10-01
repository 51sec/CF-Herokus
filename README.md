# CF-Herokus

Heroku free plan is only providing 550 hours usage per month. In this case, multiple Heroku instances can cover the usages for whole month.  

This script is just to let Cloudflare easily proxy to multiple Heroku instances based on odd number days or plural number days. 
  <br/>
  <br/>
  
# Demo Site
This demo site is to list a onedrive content through web page. 
https://myod.51sec.eu.org or https://myod.51sec1.workers.dev

There are two Heroku Apps behind above URL.
  https://myod1.herokuapp.com/
  https://myod2.herokuapp.com/

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
