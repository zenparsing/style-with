## style-with

```js
import { style, css } from 'style-with';

const sheet = css`
  button {
    border-radius: 3px;
  }
`;

function renderForm() {
  style('app-form').with(sheet);
  // Render some HTML
}
```
