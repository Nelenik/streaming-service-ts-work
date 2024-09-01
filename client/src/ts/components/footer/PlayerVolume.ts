import { Component, ComponentOptions } from "core";
import { html } from "helpers";

interface PlayerVolumeOptions extends ComponentOptions {
  onVolume: (e: Event) => void;
  onMute: (e: Event) => void;
}

export class PlayerVolume extends Component<PlayerVolumeOptions> {
  getTemplate(): string {
    return html`
      <div class="player__value">
        <button class="player__mute">
          <svg
            width="12"
            height="14"
            viewBox="0 0 12 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 9.5H1C0.867392 9.5 0.740215 9.44732 0.646447 9.35355C0.552678 9.25979 0.5 9.13261 0.5 9V5C0.5 4.86739 0.552678 4.74021 0.646447 4.64645C0.740215 4.55268 0.867392 4.5 1 4.5H4L8.5 1V13L4 9.5Z"
              stroke="#AAAAAA"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 4.5V9.5"
              stroke="#AAAAAA"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.9124 5.58582C11.0981 5.77153 11.2454 5.99201 11.3459 6.23466C11.4464 6.47731 11.4981 6.73739 11.4981 7.00003C11.4981 7.26267 11.4464 7.52274 11.3459 7.7654C11.2454 8.00805 11.0981 8.22853 10.9124 8.41424"
              stroke="#AAAAAA"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <input
          type="range"
          id="range-value"
          class="player__value-range range"
          min="0"
          max="1"
          step="0.1"
          value="0.3"
        />
      </div>
    `;
  }

  setHandlers(): void {
    this.onVolume();
    this.onMute();
  }

  onVolume() {
    const { onVolume } = this.options;
    const volumeInput = this.element?.querySelector("#range-value");
    if (!(volumeInput instanceof HTMLInputElement)) return;
    this.on("input", volumeInput, onVolume);
  }

  onMute() {
    const { onMute } = this.options;
    const muteBtn = this.element?.querySelector(".player__mute");
    if (!(muteBtn instanceof HTMLElement)) return;
    this.on("click", muteBtn, onMute);
  }
}
