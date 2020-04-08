/**
 * Таймер
 */
Vue.component("countdown-timer", {
  data() {
    return {
      value: null,
      label: "",
      status: "notInit",
    };
  },

  methods: {
    /**
     * Возвращает текущее время
     * @example getCurrentTime() => '14:19:43
     *
     * @returns {string}
     */
    getCurrentTime() {
      const date = new Date();

      return date.toLocaleTimeString();
    },

    /**
     * Генерирует лейбл таймера
     * @example getLabel(1234) => '01:234'
     *
     * @param {number} ms Оставшееся время, мс
     * @returns {string}
     */
    getLabel(ms) {
      const seconds = String(Math.floor(ms / 1000)).padStart(2, "0");
      const milliseconds = String(ms % 1000).padStart(3, "0");

      return `${seconds}:${milliseconds}`;
    },

    /**
     * Устанавтивает таймер
     *
     * @param {number} seconds Время, на которое ставится таймер, сек
     * @param {() => any} callback Функция, вызываемая после окончания таймера
     */
    setTimer(seconds, callback) {
      this.status = "pending";

      const startTime = Date.now();
      const endTime = startTime + seconds * 1000;

      const interval = setInterval(() => {
        const cirrentTime = Date.now();
        const millisecondsLeft = endTime - cirrentTime;

        this.label = this.getLabel(millisecondsLeft);

        if (millisecondsLeft <= 0) {
          clearInterval(interval);
          this.status = "end";
          if (typeof callback === "function") callback(this.getCurrentTime());
        }
      }, 1);
    },

    /**
     * Заменяет лейбл после окончания работы таймера
     * @param {string} time Время завершения таймера
     */
    finishHandler(time) {
      this.label = `Таймер завершен в ${time}`;
    },
  },
});

/**
 * Приложение
 */
const app = new Vue({
  el: "#app",

  data() {
    return {
      /**
       * Таймеры
       */
      timers: [],
    };
  },

  methods: {
    /**
     * Генерирует уникальный идентификатор
     * @returns {string}
     */
    generateUid() {
      return "_" + Math.random().toString(36).substr(2, 9);
    },

    /**
     * Добавляет таймер
     */
    addTimer() {
      this.timers.push({ uid: this.generateUid() });
    },

    /**
     * Удаляет таймер
     * @param {string} uid Идентификатор удаляемого таймера
     */
    removeTimer(uid) {
      this.timers = this.timers.filter((item) => item.uid !== uid);
    },
  },
});
