export interface CountriesAvailable {
  countryCode: string;
  name: string;
}

export interface HolyDaysCountry {
  date: Date;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[];
  launchYear: string;
  types: string[];
}

export interface PropsPublicHolidays {
  countryCode: string;
  year: string;
  countryName: string;
}
