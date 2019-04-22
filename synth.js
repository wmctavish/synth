const synth = new Tone.Synth({
    "oscillator": {
        "type": "sawtooth"
        },
    "envelope": {
        "attack": 0.01,
        "decay": 0.1,
        "sustain": 0.5,
        "release": 1
        }
});

const reverb = new Tone.Reverb({
    "decay": 0.5,
    "wet": 0.5
});
reverb.toMaster();

const filter = new Tone.Filter(500, "lowpass");
filter.connect(reverb);

const gain = new Tone.Gain(0.05);
gain.connect(filter);

synth.connect(gain);

const rows = document.body.querySelectorAll('div > div'),
    notes = ['C4', 'B3', 'A#3', 'A3', 'G#3', 'G3', 'F#3', 'F3', 'E3', 'D#3', 'D3', 'C#3', 'C3'];
let index = 0;

Tone.Transport.scheduleRepeat(repeat, '16n');
Tone.Transport.start();

function repeat(time) {
    let step = index % 16;
    for(i=0;i<rows.length;i++) {
        let note = notes[i],
        row = rows[i],
        input = row.querySelector(`input:nth-child(${step + 1})`);
    if (input.checked) synth.triggerAttackRelease(note, '16n', time);
    }
    index++;
}