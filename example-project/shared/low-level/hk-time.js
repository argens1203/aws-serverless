const HOUR = 60 * 60 * 1000;

export class HKTime {
  constructor() {
    this.epoch = Date.now() + 8 * HOUR;
  }

  increaseDay(numberOfDays) {
    this.epoch += numberOfDays * 24 * HOUR;
    return this;
  }

  getMonth() {
    return this.getDateObj().getUTCMonth();
  }

  getDate() {
    return this.getDateObj().getUTCDate();
  }

  getDayOfWeek() {
    return this.getDateObj().getUTCDay();
  }

  getHour() {
    return this.getDateObj().getUTCHours();
  }

  getDateString() {
    return this.getDateObj().toISOString().split("T")[0];
  }

  getMinute() {
    return this.getDateObj().getMinutes();
  }

  getDateObj() {
    return new Date(this.epoch);
  }

  static getCurrentHour() {
    return new HKTime().getHour();
  }

  static getCurrentDayOfWeek() {
    return new HKTime().getDayOfWeek();
  }

  static getCurrentDateString() {
    return new HKTime().getDateString();
  }

  static getCurrentMinute() {
    return new HKTime().getMinute();
  }
}