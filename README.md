# S Y N T H
Browser synth with step sequencer

## Oscillators
### Osc Type
Using the dropdown selector, choose from a saw, square, triangle, or sine oscillator. The sequence may need to be stopped and re-started forthe change to take effect. Saw and square will give the most harmonic content to shape using the Filter section.

### Osc Level
Sets the volume level of the oscillator with the adjacent slider.

### Osc Detune
There are two separate oscillator 'voices'. Increasing the amount with the adjacent slider will 'detune' one from the other, by increasing the pitch of one oscillator in small amounts. This produces a 'beating' effect, and gives a feeling of movement and fluidity to the sound.

### Noise Level
The oscillator section includes a white noise source which is constantly operating. By default, it is silent. Increase the adjacent slider to turn the volume up on the noise source. By turning the noise level up, and the **Osc Level** down, a noise-only sound source can be achieved.




## Volume Envelope
Each 'step' that is triggered in the synthesizer will trigger what is often referred to as a ADSR envelope, or volume envelope. 'ADSR' refers to the four stages of volume that a snapshot of sound may go through. By modifying the volume envelope, the user may create sounds which slowly rise in volume over longer periods, or make immediate sound and then quickly go silent, and many other shapings in between.

### Attack
'Attack' refers to the initial moment of a sound, starting from silence and rising up to full volume. A short attack time will give the impression of an immediate sound with no delay or increase. Longer attack times will cause the volume to rise more slowly (ie. a volin player slowly applying more pressure to a string with the bow)

### Decay
'Decay' refers to the moments immediately following the end of the Attack phase of a sound, starting full volume, and ending at a volume dictated by the 'Sustain' phase - the behavior of Decay is closely tied to the Sustain setting. A short decay time will bring the volume to a level dictated by the Sustain setting more quickly. Longer decay times will cause the volume to fall to the Sustain level more slowly.

### Sustain
Unlike other three envelope controls 'Sustain' is a _level_ rather than a _time_ control. Any level greater than 0 indicates a sound which will "sustain" entirely until a new note is triggered by the next step in the sequencer. A Sustain level of zero will make a note go silent once the end of the Decay phase is reached. Maximum Sustain will keep the note at maximum volume once the end of the decay phase is reached.

### Release
The 'Release' phase refers to the length of time a note will fade out once a new step in the sequence has been triggered. A Release time of 0 will cause the note volume to immediately drop to silence from the preceding Sustain level. Maximum Release time will cause the note to fade over several seconds. _Note:_ as the synthesizer is monophonic (1 note at a time), the release phase will be cut-off at whatever point it is at once a new note is triggered - the new note will restart the Volume Envelope for it's duration.
