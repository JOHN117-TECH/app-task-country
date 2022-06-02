import { Module } from 'vuex';
import { StateInterface } from 'src/store';
import state, { StateCountry } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const CountryModule: Module<StateCountry, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default CountryModule;
