import { CountriesAvailable, HolyDaysCountry } from '../../models/Country';

export interface StateCountry {
  countriesAVailable: CountriesAvailable[];
  filterCountriesAVailable: CountriesAvailable[];
  holidaysCountry: HolyDaysCountry[];
  countryCode: string;
  countryName: string;
  year: string;
  isLoading: boolean;
}

function state(): StateCountry {
  return {
    countriesAVailable: [],
    filterCountriesAVailable: [],
    holidaysCountry: [],
    countryCode: '',
    countryName: '',
    year: '',
    isLoading: false,
  };
}

export default state;
