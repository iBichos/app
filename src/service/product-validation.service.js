export function priceCentsMask(request, response, next) {
    request.body.price_cents = request.body.price_cents.replace('.', '');
    request.body.price_cents = request.body.price_cents.replace(',', '');
    return next();
  }
  