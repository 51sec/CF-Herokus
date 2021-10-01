# CF-Herokus

Heroku free plan is only providing 550 hours usage per month. In this case, multiple Heroku instances can cover the usages for whole month.  

This script is just to let Cloudflare easily proxy to multiple Heroku instances based on odd number days or plural number days. 

Related post: https://blog.51sec.org/2021/04/deploy-onemanager-to-heroku-and-bypass.html

Basically, you will need two Heroku apps.

Then you will use Cloudflare workers to rotate the access to those two apps. 

You can check video at https://youtu.be/aJ0SEUSeDZ4 for how to use Cloudflare workers. 
