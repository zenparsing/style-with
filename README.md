## style-with

```js
import { style, css } from 'style-with';
import { html } from 'straylight';

const sheet = css`
  button {
    border-radius: 3px;
  }
`;

function renderForm() {
  style('app-form').with(sheet);
  return html`
    <form class='app-form'>
      <input type='text' />
      <input type='submit' value='Submit' />
    </form>
  `;
}
```
