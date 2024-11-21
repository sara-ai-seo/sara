export type LocationData = {
  location_code: number;
  location_name: string;
  location_code_parent: number | null;
  country_iso_code: string;
  location_type: string;
  available_languages: AvailableLanguage[];
};

export type AvailableLanguage = {
  available_sources: string[];
  language_name: string;
  language_code: string;
  keywords: number;
  serps: number;
};
