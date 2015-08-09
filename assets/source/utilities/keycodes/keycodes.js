const Keycodes = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  ENTER: 13,
  SPACE: 32,

  get ARROWS() {
    return [this.LEFT, this.RIGHT, this.UP, this.DOWN];
  },
  get NEXT() {
    return [this.RIGHT, this.DOWN];
  },
  get PREVIOUS() {
    return [this.LEFT, this.UP];
  },
  get ACTIVATE() {
    return [this.SPACE, this.ENTER];
  }
};

export default Keycodes;
