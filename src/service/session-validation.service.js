export function isCustomer(request, response, next) {
  if (request.session.isCustomer)
    return next();
}

export function isMerchant(request, response, next) {
  if (request.session.isMerchant)
    return next();
}

export function isSignedIn(request, response, next) {
  if(request.session.isSignedIn)
    return next();
}