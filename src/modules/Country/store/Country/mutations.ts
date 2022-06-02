import { MutationTree } from 'vuex';
import {
  CountriesAvailable,
  HolyDaysCountry,
  PropsPublicHolidays,
} from '../../models/Country';
import { StateCountry } from './state';

const mutation: MutationTree<StateCountry> = {
  addCountriesAvailable(state: StateCountry, results: CountriesAvailable[]) {
    state.countriesAVailable = results;
  },
  addPublicHolidays(state: StateCountry, results: HolyDaysCountry[]) {
    state.holidaysCountry = results;
  },
  changeCountryCode_Name(
    state: StateCountry,
    { countryCode, countryName }: PropsPublicHolidays
  ) {
    state.countryCode = countryCode;
    state.countryName = countryName;
  },
  toggleLoading(state: StateCountry) {
    state.isLoading = !state.isLoading;
  },
  changeYear(state: StateCountry, value: string) {
    state.year = value;
  },
  togglefilter(state: StateCountry, { value, changeFilter }) {
    changeFilter
      ? (state.filterCountriesAVailable = state.countriesAVailable.filter(
        (Country) => Country.countryCode.includes(value.toUpperCase())
      ))
      : (state.filterCountriesAVailable = state.countriesAVailable.filter(
        (Country) => Country.name.includes(value)
      ));
  },
};

export default mutation;
