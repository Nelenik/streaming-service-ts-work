import { Component, ComponentOptions } from "core";
import { html } from "helpers";
import userImg from "img/user.jpg";

interface ProfileOptions extends ComponentOptions {
  username: string;
}

export class Profile extends Component<ProfileOptions> {
  getTemplate(): string {
    const { username } = this.options;
    return html`
      <button class="header__user">
        <img
          class="header__user__img"
          src=${userImg}
          alt="Изображение пользователя"
        />
        <span class="header__user__text">${username}</span>
        <svg
          class="header__user__svg"
          width="6"
          height="11"
          viewBox="0 0 6 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.528636 1.02859C0.788986 0.768245 1.2111 0.768245 1.47145 1.02859L5.47145 5.02859C5.73179 5.28894 5.73179 5.71105 5.47145 5.9714L1.47145 9.9714C1.2111 10.2318 0.788986 10.2318 0.528636 9.9714C0.268287 9.71105 0.268287 9.28894 0.528636 9.02859L4.05723 5.5L0.528636 1.9714C0.268287 1.71105 0.268287 1.28894 0.528636 1.02859Z"
            fill="#FC6D3E"
          />
        </svg>
      </button>
    `;
  }
}
