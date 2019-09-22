import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';

// Models
import role from '@/models/role'

export default {
  namespaced: true,
  state: {
    role: {
      ...role
    },
    roles: [],
    count: 0
  },
  mutations: {
    set(state, payload) {
      state.role = payload;
    },
    setAll(state, payload) {
      state.roles = payload;
    },
    setCount(state, payload) {
      state.count = payload;
    }
  },
  actions: {
    async findByPk({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('GET', `/roles/role/${payload.params.id}`)

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
        commit('set', response.data);
      }
    },

    async findOne({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('GET', '/roles/findone', undefined, payload.query);

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
        commit('set', response.data);
      }
    },

    async create({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('POST', '/roles/create', payload.body);

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
        commit('set', response.data);
        this.dispatch("notification/fetch", {
          type: "success",
          message: 'Успешно сохранено!',
          isActive: true
        });
      }
    },

    async update({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('PUT', `/roles/update`, payload.body);

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        commit('set', response.data);
        this.dispatch('preloader/fetch', false);
        this.dispatch("notification/fetch", {
          type: "success",
          message: 'Успешно сохранено!',
          isActive: true
        });
      }
    },

    async remove({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('DELETE', '/roles/remove', payload.body);

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
        this.dispatch('role/clear');
        this.dispatch("notification/fetch", {
          type: "success",
          message: 'Успешно удалено!',
          isActive: true
        });
      }
    },

    async findAll({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('GET', '/roles', undefined, payload.query);

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
        commit('setAll', response.data);
      }
    },

    async count({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('GET', '/roles/count', undefined, payload.query);

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
        commit('setCount', response.data.count);
      }
    },

    set({
      commit
    }, payload) {
      commit('set', payload);
    },

    setAll({
      commit
    }, payload) {
      commit('setAll', payload);
    },

    clear({
      commit
    }) {
      commit('set', {
        ...role
      });
    },

    clearAll({
      commit
    }) {
      commit('setAll', []);
    },
  },
  getters: {
    get(state) {
      return state.role;
    },
    getAll(state) {
      return state.roles;
    },
    getCount(state) {
      return state.count;
    }
  }
};
