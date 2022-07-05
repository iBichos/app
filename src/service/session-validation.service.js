import path from 'path';

const __dirname = path.resolve();

export function isCustomer(request, response, next) {
  if (request.session.isCustomer)
    return next();
  else
    response.sendFile(path.join(__dirname+ '/public/403.html'));
}

export function isMerchant(request, response, next) {
  if (request.session.isMerchant)
    return next();
  else
    response.sendFile(path.join(__dirname+ '/public/403.html'));
}

export function isAdmin(request, response, next) {
  if (request.session.isAdmin)
    return next();
  else
    response.sendFile(path.join(__dirname+ '/public/403.html'));
}

export function isSignedIn(request, response, next) {
  if(request.session.isSignedIn)
    return next();
  else
    response.sendFile(path.join(__dirname+ '/public/403.html'));
}