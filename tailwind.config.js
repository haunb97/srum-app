module.exports = {
  theme: {
    extend: {
      backgroundImage: theme => ({
        'hero-pattern': "url('https://image-us.eva.vn/upload/4-2020/images/2020-12-09/ao-quan-cat-di-cho-moi-hot-girl-chi-mac-moi-chiec-tap-de-vao-bep-tro-tai-photo-1-16075016698671928318461-1607518978-755-width600height750.jpg')",
        'back': "url('/src/app/assets/images/backOfTheCard.jpg')",
        'face': "url('/src/app/assets/images/theFaceOfTheCard.jpg')"
      
      })
    },
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
     '50%': '50%',
     '16': '4rem',
    },
    rotate: {
      '180': '180deg',
      '0': '0',
    },
    skew: {
      '180': '180deg',
      '0': '0deg',
    }
  }
}