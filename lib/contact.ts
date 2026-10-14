export interface ContactInfo {
  contact?: string
  contact1?: string
  contact2?: string
  wechat_qr?: string | null
}

export const DEFAULT_CONTACTS = {
  contact1: "6285173013525",
  contact2: "6289699392924",
  email: "info@keylockindonesia.com",
  address:
    "Jl. Arteri KIIC Rolling Hills Ruko Pacifik Plaza No. 91, Margakaya, Kec. Telukjambe Barat, Karawang, Jawa Barat 41361",
  googleMapsUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3055732178386!2d107.264135374785!3d-6.354474862166041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699d800f0c8e61%3A0x6bf0f30e04f4ef5e!2sPT%20KEY%20LOCK%20INDONESIA!5e0!3m2!1sid!2sid!4v1781268373774!5m2!1sid!2sid",
}

/**
 * Membersihkan dan menstandarkan nomor HP ke format internasional WhatsApp (misal: 628...).
 * Mengubah awalan '0' menjadi '62' dan menghapus simbol selain angka.
 */
export function cleanPhoneNumber(phone?: string | null): string {
  if (!phone) return ""
  let digits = phone.replace(/[^0-9]/g, "")
  if (digits.startsWith("0")) {
    digits = "62" + digits.slice(1)
  }
  return digits
}

/**
 * Menghasilkan URL langsung ke chat WhatsApp dengan pesan opsional.
 */
export function buildWhatsAppUrl(phone?: string | null, message?: string): string {
  const cleaned = cleanPhoneNumber(phone)
  if (!cleaned) return "#"
  if (!message) return `https://wa.me/${cleaned}`
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`
}

/**
 * Mengambil data kontak dari API Laravel backend.
 */
export async function fetchContactData(locale: string = "id"): Promise<ContactInfo | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) return null

  try {
    const res = await fetch(`${apiUrl}/api/contact?locale=${locale}`, {
      cache: "no-store",
    })
    if (res.ok) {
      const json = await res.json()
      if (json.status === "success" && json.data) {
        return json.data
      }
    }
  } catch (error) {
    console.error("Gagal memuat data kontak:", error)
  }
  return null
}
