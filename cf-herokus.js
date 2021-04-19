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
