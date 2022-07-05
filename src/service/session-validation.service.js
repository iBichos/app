import path from 'path';

const __dirname = path.resolve();

export function isCustomer(request, response, next) {
  if (request.session.isCustomer)
    return next();

}

export function isMerchant(request, response, next) {
  if (request.session.isMerchant)
    return next();
}

export function isAdmin(request, response, next) {
  if (request.session.isAdmin)
    return next();
}

export function isSignedIn(request, response, next) {
  if(request.session.isSignedIn)
    return next();
  else
    response.sendFile(path.join(__dirname+ '/public/403.html'));
}