if (Tone.context.state !== 'running') {
    Tone.context.resume();
};

document.documentElement.addEventListener(
    "mousedown", function(){
      mouse_IsDown = true;
      if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }});


//Oscillators
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

const noiseSynth = new Tone.NoiseSynth({
    "noise": {
        "type": "pink"
        },
    "envelope": {
        "attack": 0.01 ,
        "decay": 0.1 ,
        "sustain": 0.5
        },
    "volume": -64
});

//Effects
    const reverb = new Tone.Freeverb({
        "roomSize": 0.1,
        "wet": 0
    });
    reverb.toMaster();

    const delay = new Tone.PingPongDelay({
        "delayTime": 0,
        "feedback": 0,
        "wet": 0
    });
    delay.connect(reverb);

    const filter = new Tone.Filter({
        "type": "lowpass",
        "frequency": 7000,
        "Q": 0
    });
    filter.connect(delay);

    const distortion = new Tone.BitCrusher({
        "bits": 8,
        "wet": 0
    })
    distortion.connect(filter);

    

const gain = new Tone.Gain(1);
gain.connect(distortion);

synth1.connect(gain);
synth2.connect(gain);
noiseSynth.connect(gain);


//16-Step Sequencer
const rows = document.body.querySelectorAll('.step-sequencer > div'),
    octave = ['C5', 'B4', 'A#4', 'A4', 'G#4', 'G4', 'F#4', 'F4', 'E4', 'D#4', 'D4', 'C#4', 'C4', 'B3', 'A#3', 'A3', 'G#3', 'G3', 'F#3', 'F3', 'E3', 'D#3', 'D3', 'C#3', 'C3', 'B2', 'A#2', 'A2', 'G#2', 'G2', 'F#2', 'F2', 'E2', 'D#2', 'D2', 'C#2', 'C2']
    
let index = 0;

let bpm = 120;
Tone.Transport.scheduleRepeat(repeat, '8n');
const seqStart = document.getElementById("seqStart");
seqStart.addEventListener('click', () => {
    Tone.Transport.toggle();
    if(button2.style.borderColor === "rgb(117, 255, 174)") {
        button2.style.color = "rgb(255, 70, 70)";
        button2.style.borderColor = "rgb(255,70,70)";
    } else {
        button2.style.color = "rgb(117,255,174)";
        button2.style.borderColor = "rgb(117,255,174)";
    };
});

function repeat(time) {
    let step = index % 32;
    
    for(i=0;i<rows.length;i++) {
        let note = octave[i],
        row = rows[i],
        input = row.querySelector(`input:nth-child(${step + 2})`);
        label = row.querySelector(`label:nth-child(${step + 3})`);
        allLabels = document.querySelectorAll('label');
    if (input.checked) {
        synth1.triggerAttackRelease(note, '8n', time),
        synth2.triggerAttackRelease(note, '8n', time),
        noiseSynth.triggerAttackRelease('8n', time),
        filterEnv.triggerAttackRelease('8n'),
        label.className = "step-box-lit";
    }};
    index += 2;
    if (step===30) {
        for (i=0;i<allLabels.length;i++) {
            allLabels[i].className = "step-box";
        };
    };
};


//Modulation
const lfo1 = new Tone.LFO({
    'type': 'sine',
    'min': -3000,
    'max': 3000,
    'frequency': 0.5,
    'amplitude': 0
});
lfo1.start();
lfo1.connect(filter.frequency);

const filterEnv = new Tone.ScaledEnvelope({
    "attack": 0.01,
    "decay": 1,
    "decayCurve": "exponential",
    "sustain": 0.5,
    "release": 0.1,
    "min": 0,
    "max": 1
})
filterEnv.connect(filter.frequency);


//Global envelop controls
const attackSlider = document.getElementById("attackSlider");
attackSlider.addEventListener('input', () => {
    synth1.envelope.attack = attackSlider.value;
    synth2.envelope.attack = attackSlider.value;
    noiseSynth.envelope.attack = attackSlider.value;
});

const decaySlider = document.getElementById("decaySlider");
decaySlider.addEventListener('input', () => {
    synth1.envelope.decay = decaySlider.value;
    synth2.envelope.decay = decaySlider.value;
    noiseSynth.envelope.decay = decaySlider.value;
});

const sustainSlider = document.getElementById("sustainSlider");
sustainSlider.addEventListener('input', () => {
    synth1.envelope.susatin = sustainSlider.value;
    synth2.envelope.sustain = sustainSlider.value;
    noiseSynth.envelope.sustain = sustainSlider.value;
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

//Oscillator volume
const oscLvlSlider = document.getElementById("oscLvlSlider");
oscLvlSlider.addEventListener('input', () => {
    synth1.volume.value = oscLvlSlider.value;
    synth2.volume.value = oscLvlSlider.value;
});

//Oscillator detune width
const detuneSlider = document.getElementById("detuneSlider");
detuneSlider.addEventListener('input', () => {
    synth2.detune.value = detuneSlider.value; 
});

//Oscillator type switch
const oscType = document.getElementById("oscType");
oscType.addEventListener('change', () => {
    synth1.oscillator.type = oscType.value; 
    synth2.oscillator.type = oscType.value;
});

//Noise level
const noiseLvl = document.getElementById("noiseSlider");
noiseLvl.addEventListener('input', () => {
    noiseSynth.volume.value = noiseLvl.value;
});

//Delay time
const delayTimeSlider = document.getElementById("delayTimeSlider");
delayTimeSlider.addEventListener('input', () => {
    delay.delayTime.value = delayTimeSlider.value; 
});

//Delay feedback
const delayFeedbackSlider = document.getElementById("delayFeedbackSlider");
delayFeedbackSlider.addEventListener('input', () => {
    delay.feedback.value = delayFeedbackSlider.value; 
});

//Delay wet/dry
const delayWetSlider = document.getElementById("delayWetSlider");
delayWetSlider.addEventListener('input', () => {
    delay.wet.value = delayWetSlider.value; 
});

//Reverb room size
const reverbSizeSlider = document.getElementById("reverbSizeSlider");
reverbSizeSlider.addEventListener('input', () => {
    reverb.roomSize.value = reverbSizeSlider.value; 
});

//Reverb wet.dry
const reverbWetSlider = document.getElementById("reverbWetSlider");
reverbWetSlider.addEventListener('input', () => {
    reverb.wet.value = reverbWetSlider.value; 
});

//Tempo slider
const tempoSlider = document.getElementById("tempoSlider");
const tempoDisplay = document.getElementById("tempoDisplay");
tempoSlider.addEventListener('input', () => {
    Tone.Transport.bpm.value = tempoSlider.value; 
    tempoDisplay.innerText = tempoSlider.value;
});

//Bitchrusher bits
const distortionSlider = document.getElementById("distortionSlider");
distortionSlider.addEventListener('input', () => {
    distortion.bits = distortionSlider.value;
});

//Bitcrusher wet/dry
const distortionWetSlider = document.getElementById("distortionWetSlider");
distortionWetSlider.addEventListener('input', () => {
    distortion.wet.value = distortionWetSlider.value;
});

//Filter LFO Rate
const filterLFORateSlider = document.getElementById("filterLFORateSlider");
filterLFORateSlider.addEventListener('input', () => {
    lfo1.frequency.value = filterLFORateSlider.value;
});

//Filter LFO Depth
const filterLFOAmpSlider = document.getElementById("filterLFOAmpSlider");
filterLFOAmpSlider.addEventListener('input', () => {
    lfo1.amplitude.value = filterLFOAmpSlider.value;
});

//Master gain control
const gainSlider = document.getElementById("gainSlider");
gainSlider.addEventListener('input', () => {
    gain.gain.value = gainSlider.value;
});




//Filter Envelope Controls
const filterAttackSlider = document.getElementById("filterAttackSlider");
filterAttackSlider.addEventListener('input', () => {
    filterEnv.attack = filterAttackSlider.value;
});

const filterDecaySlider = document.getElementById("filterDecaySlider");
filterDecaySlider.addEventListener('input', () => {
    filterEnv.decay = filterDecaySlider.value;
});

const filterSustainSlider = document.getElementById("filterSustainSlider");
filterSustainSlider.addEventListener('input', () => {
    filterEnv.sustain = filterSustainSlider.value;
});

const filterReleaseSlider = document.getElementById("filterReleaseSlider");
filterReleaseSlider.addEventListener('input', () => {
    filterEnv.release = (filterReleaseSlider.value * 10) / 10;
});

const filterEnvAmountSlider = document.getElementById("filterEnvAmountSlider");
filterEnvAmountSlider.addEventListener('input', () => {
    filterEnv.max = filterEnvAmountSlider.value;
});




//Light/dark theme toggle
const button2 = document.getElementById("seqStart");
function switchTheme() {
    const bodyBC = document.querySelector("body");
    const button1 = document.getElementById("switch-theme");
    //const bodyTC = document.querySelector()
    if (bodyBC.style.backgroundColor === "white") {
        bodyBC.style.backgroundColor = "rgb(25,25,25)";
        bodyBC.style.color = "white";
        button1.style.backgroundColor = "rgb(25,25,25)";
        button1.style.color = "white";
        button2.style.backgroundColor = "rgb(25,25,25)";
    } else {
        bodyBC.style.backgroundColor = "white";
        bodyBC.style.color = "rgb(25,25,25)";
        button1.style.backgroundColor = "white";
        button1.style.color = "rgb(25,25,25)";
        button2.style.backgroundColor = "white";
    }
};
    