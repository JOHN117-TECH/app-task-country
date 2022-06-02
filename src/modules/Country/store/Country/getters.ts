import { GetterTree } from 'vuex';
import { StateInterface } from 'src/store';
import { StateCountry } from './state';

const getters: GetterTree<StateCountry, StateInterface> = {
  getCountriesToUse(context) {
    return context.countriesAVailable;
  },
  getHolidaysCountry(context) {
    return context.holidaysCountry;
  },
  getCountryCode(context) {
    return context.countryCode;
  },
  getCountryName(context) {
    return context.countryName;
  },
  getYear(context) {
    return context.year;
  },
  getLoading(context) {
    return context.isLoading;
  },
  getFilterCountriesAVailable(context) {
    return context.filterCountriesAVailable;
  },
};

export default getters;
