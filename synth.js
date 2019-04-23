const synth1 = new Tone.Synth({
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

const synth2 = new Tone.Synth({
    "oscillator": {
        "type": "sawtooth"
        },
    "envelope": {
        "attack": 0.01,
        "decay": 0.1,
        "sustain": 0.5,
        "release": 1
        },
    "detune": 0
});

//Effects
    const delay = new Tone.FeedbackDelay({
        "delayTime": 0,
         "feedback": 0
    });
    delay.toMaster();

    const reverb = new Tone.Freeverb({
        "roomSize": 0.5,
        "wet": 0.3
    });
    reverb.connect(delay);

    const distortion = new Tone.Distortion({
        "distortion": 0.1,
        "oversample": '4x',
        "wet": 0.1
    })
    distortion.connect(reverb);

    const filter = new Tone.Filter({
        "type": "lowpass",
        "frequency": 9000,
        "Q": 0
    });
    filter.connect(distortion);

    const gain = new Tone.Gain(0.1);
    gain.connect(filter);

    synth1.connect(gain);
    synth2.connect(gain);

//16-Step Sequencer
const rows = document.body.querySelectorAll('div > div'),
    octave = ['C5', 'B4', 'A#4', 'A4', 'G#4', 'G4', 'F#4', 'F4', 'E4', 'D#4', 'D4', 'C#4', 'C4', 'B3', 'A#3', 'A3', 'G#3', 'G3', 'F#3', 'F3', 'E3', 'D#3', 'D3', 'C#3', 'C3', 'B2', 'A#2', 'A2', 'G#2', 'G2', 'F#2', 'F2', 'E2', 'D#2', 'D2', 'C#2', 'C2']
let index = 0;

let bpm = 120;
Tone.Transport.scheduleRepeat(repeat, '8n');
Tone.Transport.start();


function repeat(time) {
    let step = index % 16;
    for(i=0;i<rows.length;i++) {
        let note = octave[i],
        row = rows[i],
        input = row.querySelector(`input:nth-child(${step + 1})`);
    if (input.checked) 
        synth1.triggerAttackRelease(note, '8n', time),
        synth2.triggerAttackRelease(note, '8n', time);
    }
    index++;
};

//Global envelop controls
const attackSlider = document.getElementById("attackSlider");
attackSlider.addEventListener('input', () => {
    synth1.envelope.attack = attackSlider.value;
    synth2.envelope.attack = attackSlider.value;
});

const decaySlider = document.getElementById("decaySlider");
decaySlider.addEventListener('input', () => {
    synth1.envelope.decay = decaySlider.value;
    synth2.envelope.decay = decaySlider.value;
});

const sustainSlider = document.getElementById("sustainSlider");
sustainSlider.addEventListener('input', () => {
    synth1.envelope.susatin = sustainSlider.value;
    synth2.envelope.sustain = sustainSlider.value;
});

const releaseSlider = document.getElementById("releaseSlider");
releaseSlider.addEventListener('input', () => {
    synth1.envelope.release = (releaseSlider.value * 10) / 10;
    synth2.envelope.release = (releaseSlider.value * 10) / 10;
});

//Modulation sources
const filterSlider = document.getElementById("filterSlider");
filterSlider.addEventListener('input', () => {
    filter.frequency.value = filterSlider.value; 
});

const filterQSlider = document.getElementById("filterQSlider");
filterQSlider.addEventListener('input', () => {
    filter.Q.value = filterQSlider.value; 
});

const detuneSlider = document.getElementById("detuneSlider");
detuneSlider.addEventListener('input', () => {
    synth2.detune.value = detuneSlider.value; 
});

const delayTimeSlider = document.getElementById("delayTimeSlider");
delayTimeSlider.addEventListener('input', () => {
    delay.delayTime.value = delayTimeSlider.value; 
});

const delayWetSlider = document.getElementById("delayWetSlider");
delayWetSlider.addEventListener('input', () => {
    delay.feedback.value = delayWetSlider.value; 
});

const reverbSizeSlider = document.getElementById("reverbSizeSlider");
reverbSizeSlider.addEventListener('input', () => {
    reverb.roomSize.value = reverbSizeSlider.value; 
});

const reverbWetSlider = document.getElementById("reverbWetSlider");
reverbWetSlider.addEventListener('input', () => {
    reverb.wet.value = reverbWetSlider.value; 
});

const tempoSlider = document.getElementById("tempoSlider");
tempoSlider.addEventListener('input', () => {
    Tone.Transport.bpm.value = tempoSlider.value; 
});

const distortionSlider = document.getElementById("distortionSlider");
distortionSlider.addEventListener('input', () => {
    distortion.distortion = distortionSlider.value;
});

const distortionWetSlider = document.getElementById("distortionWetSlider");
distortionWetSlider.addEventListener('input', () => {
    distortion.wet.value = distortionWetSlider.value;
});