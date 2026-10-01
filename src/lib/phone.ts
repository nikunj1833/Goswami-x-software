import { parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js";

export interface NormalizedPhoneResult {
  isValid: boolean;
  e164: string;
  formattedInternational: string;
  country?: CountryCode;
  countryCallingCode?: string;
  nationalNumber?: string;
  error?: string;
}

/**
 * Normalizes an arbitrary phone string into strict E.164 international format.
 * If defaultCountry is provided, parses numbers without international prefix.
 */
export function normalizePhoneNumber(
  rawPhone: string,
  defaultCountry: CountryCode = "IN"
): NormalizedPhoneResult {
  if (!rawPhone || typeof rawPhone !== "string") {
    return {
      isValid: false,
      e164: "",
      formattedInternational: "",
      error: "Phone number is required.",
    };
  }

  const cleaned = rawPhone.trim();
  const phoneNumber = parsePhoneNumberFromString(cleaned, defaultCountry);

  if (!phoneNumber || !phoneNumber.isValid()) {
    return {
      isValid: false,
      e164: "",
      formattedInternational: "",
      error: "Invalid phone number format. Please provide a valid number with country code (e.g. +91 98765 43210).",
    };
  }

  return {
    isValid: true,
    e164: phoneNumber.number, // e.g. "+919876543210"
    formattedInternational: phoneNumber.formatInternational(), // e.g. "+91 98765 43210"
    country: phoneNumber.country,
    countryCallingCode: phoneNumber.countryCallingCode,
    nationalNumber: phoneNumber.nationalNumber,
  };
}
