export default position => {
  if (typeof posi === 'object') {
    return posi;
  } else if (typeof posi === 'string') {
    switch (posi) {
      case 'left-top':
        return {
          top: '2vh',
          left: '2vw',
        };
      case 'right-top':
        return {
          top: '2vh',
          right: '2vw',
        };
      case 'left-middle':
        return {
          top: '50vh',
          left: '2vw',
        };
      case 'middle-middle':
        return {
          top: '50vh',
          right: '50vw',
        };
      case 'right-middle':
        return {
          top: '50vh',
          right: '2vw',
        };
      case 'left-bottom':
        return {
          bottom: '2vh',
          left: '2vw',
        };
      case 'middle-bottom':
        return {
          bottom: '2vh',
          left: '50vw',
        };
      case 'right-bottom':
        return {
          bottom: '2vh',
          right: '2vw',
        };
      case 'middle-top':
      default:
        return {
          top: '2vh',
          right: '50vw',
        };
    }
  }
  return {
    top: '2vh',
    right: '50vw',
  };
};
