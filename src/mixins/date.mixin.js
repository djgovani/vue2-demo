import moment from "moment";

const dateMixin = {
  methods: {
    changeDateFormat(date, format) {
      return moment(date).format(format);
    },
  },
};

export default dateMixin;
