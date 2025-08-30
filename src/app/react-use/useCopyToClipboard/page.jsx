'use client'

import { useState } from 'react';
import {useCopyToClipboard} from './_hook'

const UseCopyToClipboard = () => {
  const [text, setText] = useState('');
  const [state, copyToClipboard] = useCopyToClipboard();

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button type="button" onClick={() => copyToClipboard(text)}>copy text</button>
      {state?.error
        ? <p>Unable to copy value: {state.error.message}</p>
        : state?.value && <p>Copied {state?.value}</p>}
    </div>
  )
};

export default UseCopyToClipboard