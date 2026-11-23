import { WeddingConfig } from '../types/wedding';

export const weddingData: WeddingConfig = {
  couple: {
    bride: {
      name: 'Nayana',
      fullName: 'Nayana Kalyani',
      parents: 'Bineeb Kumar & Asha V S',
      grandparents: 'Late Cheriyath M. N. Gopalan Nair & Late Smt. T. Chellamma',
      residence: 'Nayanam, Ooruttambalam, Thiruvananthapuram',
      image: '/assets/bride.jpeg',
    },
    groom: {
      name: 'Vishnu',
      fullName: 'Vishnu Pradeep',
      parents: 'Pradeep P & Renjini C S',
      grandparents: 'Late P. S. Vasudevan Pillai & Late K. Kamalakshi Amma',
      residence: 'Sreeshylam, Malayalam, Thiruvananthapuram',
      image: '/assets/groom.jpeg',
    },
    quote: 'Our journey begins with two hearts, two families, and one beautiful promise sacredly bound in traditional Kerala heritage.',
  },

  weddingDate: {
    formatted: 'Friday, 22 January 2027',
    shortDate: '22 January 2027',
    isoDateTime: '2027-01-22T12:09:00+05:30',
    muhurtham: '12:09 PM – 12:31 PM',
    dayOfWeek: 'Friday',
  },

  venue: {
    name: 'AL Saj Convention Centre',
    location: 'Kandala, Kattakkada, Thiruvananthapuram',
    fullAddress: 'AL Saj Convention Centre, Kandala, Kattakkada, Thiruvananthapuram, Kerala',
    mapsUrl: 'https://maps.app.goo.gl/SmRxwKG4VCDnPLASA',
    embedMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.3581372100284!2d77.073292!3d8.4803438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05b1936ae228f1%3A0xff1d55f0f9b6c9d0!2sAl%20SAJ%20Convention%20Centre%20Kattakada!5e1!3m2!1sen!2sin!4v1794737973254!5m2!1sen!2sin',
    qrCodeImage: '/assets/al_saj_loc_qr.png',
  },

  familyWishes: {
    parentsBride: 'V.G. Vijayakumar & Suvarna Vijayakumar',
    parentsGroom: 'Gopakumar & Indu Gopakumar',
    bestWishesFrom: 'VINYA PRADEEP',
    blessingQuote: 'Your presence and blessings are the greatest gifts we could receive.',
  },

  events: [
    {
      id: 'engagement',
      title: 'Traditional Engagement (Nischayam)',
      date: 'Saturday, 24 October 2026',
      time: '05:00 PM onwards',
      venue: 'Vrindavan, Omalloor',
      location: 'Omalloor, Pathanamthitta',
      description: 'An intimate gathering of both families exchanging official rings and ritualistic blessings on the eve of the wedding.',
      iconName: 'ring',
    },
    {
      id: 'wedding-ceremony',
      title: 'Wedding Ceremony (Thalikettu & Muhūrtham)',
      date: 'Sunday, 25 October 2026',
      time: 'Muhūrtham: 11:44 AM – 12:06 PM',
      venue: 'M Convention Centre',
      location: 'Vallikode, Pathanamthitta',
      description: 'The sacred Kerala traditional wedding rituals, tying of the Thali (Mangalsutra), exchange of floral garlands, and traditional Sadya feast.',
      iconName: 'heart',
      isMainEvent: true,
    },
    {
      id: 'reception',
      title: 'Grand Wedding Reception',
      date: 'Sunday, 25 October 2026',
      time: '12:30 PM – 03:30 PM',
      venue: 'M Convention Hall',
      location: 'Vallikode, Pathanamthitta',
      description: 'A grand celebration feast with loved ones, traditional music performance, and warm felicitations for the newlyweds.',
      iconName: 'party',
    },
  ],

  gallery: [
    {
      id: 'img-1330',
      category: 'moments',
      url: '/assets/vishnu/pic-1.jpg',
      aspectRatio: 'landscape',
      caption: 'Where our story quietly began.',
    },
    {
      id: 'img-3890',
      category: 'tradition',
      url: '/assets/vishnu/pic-2.jpg',
      aspectRatio: 'landscape',
      caption: 'A friendship that started unexpectedly.',
    },
    {
      id: 'img-7183',
      category: 'moments',
      url: '/assets/vishnu/pic-3.jpg',
      aspectRatio: 'portrait',
      caption: 'And soon, we started going out.',
    },
    {
      id: 'img-7208',
      category: 'ceremony',
      url: '/assets/vishnu/pic-4.jpg',
      aspectRatio: 'portrait',
      caption: 'Our love for food took us exploring Trivandrum.',
    },
    {
      id: 'img-7594',
      category: 'attire',
      url: '/assets/vishnu/pic-5.jpg',
      aspectRatio: 'portrait',
      caption: 'Somewhere along the way, we grew closer.',
    },
    // {
    //   id: 'img-7604',
    //   category: 'heritage',
    //   url: '/assets/webps/IMG_7604.webp',
    //   aspectRatio: 'landscape',
    //   caption: 'A simple temple visit, just the two of us.',
    // },
    // {
    //   id: 'img-7845',
    //   category: 'couple',
    //   url: '/assets/webps/IMG_7845.webp',
    //   aspectRatio: 'landscape',
    //   caption: 'Back home, we couldn’t stop thinking about each other.',
    // },
    // {
    //   id: 'img-7958',
    //   category: 'celebration',
    //   url: '/assets/webps/IMG_7958.webp',
    //   aspectRatio: 'landscape',
    //   caption: 'So we met again, late that night.',
    // },
    // {
    //   id: 'img-7962',
    //   category: 'ceremony',
    //   url: '/assets/webps/IMG_7962.webp',
    //   aspectRatio: 'landscape',
    //   caption: 'Two hearts, sitting together in our little Zen.',
    // },
    // {
    //   id: 'img-7967',
    //   category: 'rituals',
    //   url: '/assets/webps/IMG_7967.webp',
    //   aspectRatio: 'portrait',
    //   caption: 'Some talks, a forehead kiss, and we chose forever.',
    // },
    // {
    //   id: 'img-7968',
    //   category: 'couple',
    //   url: '/assets/webps/IMG_7968.webp',
    //   aspectRatio: 'landscape',
    //   caption: 'Almost two years of choosing each other.',
    // },
    // {
    //   id: 'img-7969',
    //   category: 'celebration',
    //   url: '/assets/webps/IMG_7969.webp',
    //   aspectRatio: 'landscape',
    //   caption: 'And now, our forever is about to begin.',
    // },
  ],

  initialBlessings: [

  ],

  music: {
    title: 'Kerala Wedding Instrumental Melody',
    artist: 'Traditional Nadaswaram & Thavil',
    src: '/assets/music/vishnu_bro_web_audio.mp3', // High quality fallback MP3 URL
  },

  video: {
    enabled: true,
    src: '', // Optional video asset path if provided later
    poster: '/assets/teaser-card.jpg',
  },
};
