export function getScreenWidth() {
  const isMobile = window.innerWidth <= 500;

  if (isMobile) {
    return 170;
  } else {
    return 230;
  }
}

export function getScreenHeight() {
  const isNotTall = window.innerHeight <= 740;

  if (isNotTall) {
    return 15;
  } else {
    return 20;
  }
}
