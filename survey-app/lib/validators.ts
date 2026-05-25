// Client-safe validators (no server-only imports)

export function validateWhatsAppNumber(number: string): boolean {
  // Format: 08xxx (10-13 digits starting with 08)
  const regex = /^08[0-9]{8,11}$/
  return regex.test(number)
}

// Convert local format (08xxx) to international format for WhatsApp API (628xxx)
export function formatWhatsAppNumber(number: string): string {
  if (number.startsWith('0')) {
    return '62' + number.slice(1)
  }
  if (number.startsWith('+62')) {
    return number.slice(1)
  }
  return number
}

export function validatePrices(harga: number, hargaReseller: number): boolean {
  return hargaReseller < harga && harga > 0 && hargaReseller > 0
}

export function validateDiscount(diskon: number): boolean {
  return diskon >= 0 && diskon <= 50
}
