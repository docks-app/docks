var force_repaint;

force_repaint = (node = document) => {
  return node.offsetHeight && node.offsetWidth;
};

export { force_repaint };
