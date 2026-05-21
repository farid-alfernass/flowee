// Client-safe validators (no server-only imports)

export function validateWhatsAppNumber(number: string): boolean {
  // Format: +62xxx (10-13 digits)
  const regex = /^\+62[0-9]{9,12}$/
  return regex.test(number)
}

export function validatePrices(harga: number, hargaReseller: number): boolean {
  return hargaReseller < harga && harga > 0 && hargaReseller > 0
}

export function validateDiscount(diskon: number): boolean {
  return diskon >= 0 && diskon <= 50
}
