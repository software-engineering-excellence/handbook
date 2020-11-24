//  Note: it is very important to *not* use string interpolation in this file,
//  because this is a _template_.
exports.handler = (event, context, callback) => {
    // Get request and request headers
    const request = event.Records[0].cf.request;
    const headers = request.headers;

    // Configure authentication
    const authUser = "${username}";
    const authPass = "${password}";
    const defaultPage = "${default_page}";

    // Construct the Basic Auth string
    const authString = 'Basic ' + new Buffer(authUser + ':' + authPass).toString('base64');

    // Require Basic authentication
    if (typeof headers.authorization == 'undefined' || headers.authorization[0].value != authString) {
        const body = 'Unauthorized';
        const response = {
            status: '401',
            statusDescription: 'Unauthorized',
            body: body,
            headers: {
                'www-authenticate': [{key: 'WWW-Authenticate', value:'Basic'}]
            },
        };
        return callback(null, response);
    }

    //  If the request ends in a slash, and we have a default page, append it.
    if (/\/$/.test(request.uri) && defaultPage) {
      //  Update the URI.
      const uri = request.uri.replace(/\/$/, "/"+ defaultPage);
      console.log("Setting default page, transforming URI from '" + request.uri + "' to '" + uri + "'");
      request.uri = uri;
    }
    
    // Continue request processing if authentication passed
    return callback(null, request);
};
