"use client"

import { useState, useEffect } from "react"
import {
  ContactInfo,
  DEFAULT_CONTACTS,
  cleanPhoneNumber,
  buildWhatsAppUrl,
  fetchContactData,
} from "@/lib/contact"

// Cache in-memory untuk mencegah duplicate network fetch dari banyak komponen di halaman yang sama
const contactCache = new Map<string, ContactInfo>()
const inFlightPromises = new Map<string, Promise<ContactInfo | null>>()

export function useContact(locale: string = "id") {
  const [contact, setContact] = useState<ContactInfo>(() => {
    return (
      contactCache.get(locale) || {
        contact1: DEFAULT_CONTACTS.contact1,
        contact2: DEFAULT_CONTACTS.contact2,
        contact: locale.startsWith("zh")
          ? DEFAULT_CONTACTS.contact2
          : DEFAULT_CONTACTS.contact1,
        wechat_qr: null,
      }
    )
  })

  useEffect(() => {
    let isMounted = true

    // Jika sudah ada dalam cache, langsung gunakan
    if (contactCache.has(locale)) {
      setContact(contactCache.get(locale)!)
    }

    // Ambil atau gunakan request yang sedang berjalan
    let promise = inFlightPromises.get(locale)
    if (!promise) {
      promise = fetchContactData(locale)
        .then((data) => {
          if (data) {
            contactCache.set(locale, data)
          }
          return data
        })
        .finally(() => {
          inFlightPromises.delete(locale)
        })
      inFlightPromises.set(locale, promise)
    }

    promise.then((data) => {
      if (isMounted && data) {
        setContact(data)
      }
    })

    return () => {
      isMounted = false
    }
  }, [locale])

  const rawContact1 = contact.contact1 || DEFAULT_CONTACTS.contact1
  const rawContact2 = contact.contact2 || DEFAULT_CONTACTS.contact2
  const rawSelectedContact =
    contact.contact || (locale.startsWith("zh") ? rawContact2 : rawContact1)

  const contact1 = cleanPhoneNumber(rawContact1)
  const contact2 = cleanPhoneNumber(rawContact2)
  const selectedContact = cleanPhoneNumber(rawSelectedContact)

  // URL QR Code WeChat (mendukung URL absolut maupun path relatif)
  const wechatQrImageUrl = contact.wechat_qr
    ? contact.wechat_qr.startsWith("http")
      ? contact.wechat_qr
      : `${process.env.NEXT_PUBLIC_API_URL}${contact.wechat_qr}`
    : "/images/wechat-qr.jpeg"

  return {
    contact,
    rawContact1,
    rawContact2,
    contact1,
    contact2,
    selectedContact,
    // Helper untuk Footer
    footerPhone: contact2 || contact1 || DEFAULT_CONTACTS.contact2,
    footerPhoneDisplay: rawContact2 || rawContact1 || DEFAULT_CONTACTS.contact2,
    footerWhatsapp: selectedContact || contact2 || contact1 || DEFAULT_CONTACTS.contact2,
    wechatQrImageUrl,
    getWhatsAppUrl: (phone: string, text?: string) => buildWhatsAppUrl(phone, text),
  }
}
