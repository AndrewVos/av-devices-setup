const DEFAULT_OPTIONS = {
  video: {
    maxHeight: 300,
  },
  soundMeter: { color: '#1aae9f' },
  container: { padding: 8, width: { mobile: '100%', desktop: 400 }, background: 'white' },
  audioTest: { expanded: false, background: '#f7f9fa' },
}

// noinspection JSUnusedLocalSymbols
const AUDIO_INPUT_ADVICE = {
  heading: 'How to make the most of your mic',
  listItems: [
    'Keep the mic still, and as close to your mouth as possible',
    'Hard surfaces reflect sound and make it harder to understand speech. Put\n' +
      '                some cushions / blankets on your desk or around your laptop: really - it\n' +
      '                helps!',
  ],
}

export { DEFAULT_OPTIONS }
